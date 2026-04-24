<?php
namespace App\Http\Controllers;

use App\Models\hall_ticket\hall_ticket;
use App\Models\exams\Exams;
use App\Models\Seat_Allocation\Seat_Allocation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
 
class HallTicketController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $role = $user->role ?? 'student';
        $selectedExamId = $request->query('exam_id');
        
        $exams = Exams::with(['subject', 'class'])->get();
        
        $query = hall_ticket::with([
            'student.user', 
            'student.eligibility' => function($q) use ($selectedExamId) {
                if ($selectedExamId) $q->where('exam_id', $selectedExamId);
            }, 
            'exam.subject', 
            'exam.class', 
            'seatAllocation.room'
        ]);

        if ($selectedExamId) {
            $query->where('exam_id', $selectedExamId);
        }

        if ($role === 'student') {
            $student = $user->student;
            if ($student) {
                $query->where('student_id', $student->id);
            } else {
                $query->where('id', 0);
            }
        }

        $hallTickets = $query->latest()->paginate(10); 
        $assignedExams = [];

        if ($role === 'student' && $user->student) {
            $student = $user->student;
            $assignedExams = Exams::where('class_id', $student->class_id)
                ->whereDoesntHave('hallTickets', function($q) use ($student) {
                    $q->where('student_id', $student->id);
                })
                ->with(['subject', 'class'])
                ->get();
        }
            
        return Inertia::render('HallTickets/Index', [
            'hallTickets' => $hallTickets,
            'exams'       => $exams,
            'assignedExams' => $assignedExams,
            'filters' => $request->only(['exam_id']),
        ]);
    }
 
    public function generate(Request $request)
    {
        $request->validate(['exam_id' => 'required|exists:exams,id']);
 
        $allocations = Seat_Allocation::where('exam_id', $request->exam_id)
            ->with(['student.eligibility' => function($q) use ($request) {
                $q->where('exam_id', $request->exam_id);
            }])->get();
 
        if ($allocations->isEmpty()) {
            return redirect()->back()->with('error', 'No seat allocations found for this exam. Please allocate seats first.');
        }
 
        $generatedCount = 0;
        $blockedCount = 0;

        foreach ($allocations as $allocation) {
            // DYNAMIC ELIGIBILITY CHECK (Fee + Attendance)
            if (!$allocation->student->isEligibleFor($request->exam_id)) {
                $blockedCount++;
                continue;
            }

            hall_ticket::updateOrCreate(
                [
                    'student_id' => $allocation->student_id,
                    'exam_id'    => $request->exam_id,
                ],
                [
                    'seat_allocation_id' => $allocation->id,
                    'ticket_number'      => 'HT-' . date('Ymd') . '-' . $request->exam_id . '-' . str_pad($allocation->student_id, 4, '0', STR_PAD_LEFT),
                    'is_eligible'        => true,
                    'generated_at'       => now(),
                ]
            );
            $generatedCount++;
        }

        return redirect()->route('hall-tickets.index', ['exam_id' => $request->exam_id])
            ->with('success', "Successfully processed hall tickets for this exam. Generated: $generatedCount | Blocked: $blockedCount.");
    }

    public function generateMyTicket(Request $request)
    {
        $request->validate(['exam_id' => 'required|exists:exams,id']);
        $user = auth()->user();
        
        if (!$user->student) {
            return redirect()->back()->with('error', 'Student profile not found.');
        }

        $student = $user->student;

        // 1. Check Seat Allocation
        $allocation = Seat_Allocation::where('exam_id', $request->exam_id)
            ->where('student_id', $student->id)
            ->first();

        if (!$allocation) {
            return redirect()->back()->with('error', 'Seat has not been allocated for this exam yet. Please wait for the admin to assign seats.');
        }

        // 2. DYNAMIC ELIGIBILITY CHECK (Fee + Attendance)
        if (!$student->isEligibleFor($request->exam_id)) {
            return redirect()->back()->with('error', 'Generation Failed: You are blocked due to pending fees or short attendance.');
        }

        // 4. Create Ticket
        $ticket = hall_ticket::updateOrCreate(
            [
                'student_id' => $student->id,
                'exam_id'    => $request->exam_id,
            ],
            [
                'seat_allocation_id' => $allocation->id,
                'ticket_number'      => 'HT-' . date('Ymd') . '-' . $request->exam_id . '-' . str_pad($student->id, 4, '0', STR_PAD_LEFT),
                'is_eligible'        => true,
                'generated_at'       => now(),
            ]
        );

        return redirect()->back()->with('success', 'Hall Ticket generated successfully! You can now download it.');
    }
 
    public function download(hall_ticket $hallTicket)
    {
        $hallTicket->load(['student.user', 'student.eligibility', 'exam']);
        
        // DYNAMIC ELIGIBILITY CHECK (Fee + Attendance)
        if (!$hallTicket->student->isEligibleFor($hallTicket->exam_id)) {
            return redirect()->back()->with('error', 'Access Denied: You are currently blocked from this examination.');
        }

        $allTickets = hall_ticket::where('student_id', $hallTicket->student_id)
            ->with(['exam.subject', 'exam.class', 'seatAllocation.room'])
            ->get();
            
        $pdf = PDF::loadView('pdf.hall_ticket', [
            'ticket' => $hallTicket,
            'allTickets' => $allTickets
        ]);
        
        return $pdf->download('HallTicket-' . $hallTicket->ticket_number . '.pdf');
    }
 
    public function slip(hall_ticket $hallTicket)
    {
        $hallTicket->load(['student.user', 'student.eligibility', 'exam']);

        // DYNAMIC ELIGIBILITY CHECK (Fee + Attendance)
        if (!$hallTicket->student->isEligibleFor($hallTicket->exam_id)) {
            return redirect()->back()->with('error', 'Access Denied: You are currently blocked from this examination.');
        }

        $allTickets = hall_ticket::where('student_id', $hallTicket->student_id)
            ->with(['exam.subject', 'exam.class', 'seatAllocation.room'])
            ->get();

        return Inertia::render('HallTickets/Show', [
            'ticket' => $hallTicket,
            'allTickets' => $allTickets
        ]);
    }
}