<?php
namespace App\Http\Controllers;

use App\Models\exams\Exams;
use App\Models\Seat_Allocation\Seat_Allocation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportController extends Controller
{
    public function index()
    {
        // 1. Dashboard Context Stats
        $stats = [
            'totalExams'      => Exams::count(),
            'todayExams'      => Exams::whereDate('exam_date', today())->count(),
            'totalStudents'   => \App\Models\Student\Student::count(),
            'overallAttendance' => \App\Models\Attendance\Attendance::count() > 0 
                                   ? round((\App\Models\Attendance\Attendance::whereIn('status', ['present', 'Present'])->count() / \App\Models\Attendance\Attendance::count()) * 100, 1)
                                   : 0
        ];

        // 2. Today's Exams detailed list
        $todaysExams = Exams::with(['subject', 'class', 'seatAllocations'])
            ->whereDate('exam_date', today())
            ->get()
            ->map(function($exam) {
                return [
                    'id' => $exam->id,
                    'title' => $exam->title,
                    'subject' => $exam->subject->name,
                    'class' => $exam->class->name,
                    'start_time' => $exam->start_time,
                    'end_time' => $exam->end_time,
                    'student_count' => $exam->seatAllocations->count(),
                ];
            });

        // 3. Recent Exam Activity
        $recentExams = Exams::with(['subject'])->latest()->take(5)->get();

        return Inertia::render('Reports/Index', [
            'stats'       => $stats,
            'todaysExams' => $todaysExams,
            'recentExams' => $recentExams,
        ]);
    }

    public function examReport(Request $request)
    {
        $exams = Exams::with(['subject', 'class'])->latest()->get();
        $selected = null;

        if ($request->exam_id) {
            $selected = Exams::with([
                'subject', 'class',
                'seatAllocations.student.user',
                'eligibilityChecks.student.user'
            ])->find($request->exam_id);
        }

        return Inertia::render('Reports/ExamReport', [
            'exams'    => $exams,
            'selected' => $selected,
        ]);
    }

    public function seatingReport(Request $request)
    {
        $exams = Exams::all();
        $allocations = [];

        if ($request->exam_id) {
            $allocations = Seat_Allocation::where('exam_id', $request->exam_id)
                ->with(['student.user', 'room'])
                ->orderBy('room_id')
                ->orderBy('seat_number')
                ->get();
        }

        return Inertia::render('Reports/SeatingReport', [
            'exams'       => $exams,
            'allocations' => $allocations,
        ]);
    }
    public function downloadExamReport(Request $request)
    {
        $request->validate(['exam_id' => 'required|exists:exams,id']);

        $exam = Exams::with([
            'subject', 'class',
            'eligibilityChecks.student.user'
        ])->find($request->exam_id);

        $pdf = Pdf::loadView('pdf.exam_report', ['exam' => $exam]);
        
        return $pdf->download('Exam-Report-' . $exam->id . '.pdf');
    }
    public function downloadSeatingReport(Request $request)
    {
        $request->validate(['exam_id' => 'required|exists:exams,id']);

        $exam = Exams::find($request->exam_id);
        $allocations = Seat_Allocation::where('exam_id', $request->exam_id)
            ->with(['student.user', 'room'])
            ->orderBy('room_id')
            ->orderBy('seat_number')
            ->get();

        $grouped = $allocations->groupBy(function($item) {
            return $item->room->name ?? 'Unassigned';
        });

        $pdf = Pdf::loadView('pdf.seating_report', [
            'exam' => $exam,
            'grouped' => $grouped
        ]);
        
        return $pdf->download('Seating-Plan-' . $exam->id . '.pdf');
    }
    public function mailLogs()
    {
        $logPath = storage_path('logs/laravel.log');
        $mails = [];

        if (file_exists($logPath)) {
            $content = file_get_contents($logPath);
            $blocks = explode('Message-ID:', $content);
            array_shift($blocks);

            foreach (array_reverse($blocks) as $block) {
                preg_match('/To: (.*)/', $block, $to);
                preg_match('/Subject: (.*)/', $block, $subject);
                preg_match('/Date: (.*)/', $block, $date);
                
                $mails[] = [
                    'to'      => $to[1] ?? 'Unknown',
                    'subject' => $subject[1] ?? 'No Subject',
                    'date'    => $date[1] ?? 'TBD',
                    'preview' => substr(strip_tags($block), 0, 150) . '...'
                ];
                
                if(count($mails) > 20) break;
            }
        }

        return Inertia::render('Reports/MailLogs', [
            'mails' => $mails
        ]);
    }
}