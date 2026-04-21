<?php
namespace App\Http\Controllers;

use App\Models\Seat_Allocation\Seat_Allocation;
use App\Models\exams\exams as Exams;
use App\Models\Student\Student;
use App\Models\exam_allotment\exam_allotment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeatAllocationController extends Controller
{
    public function index()
    {
        $exams = Exams::all();
        $allocations = Seat_Allocation::with(['student.user', 'room', 'exam'])
            ->latest()->paginate(10);
        return Inertia::render('SeatAllocation/Index', [
            'allocations' => $allocations,
            'exams'       => $exams,
        ]);
    }

    public function autoAllocate(Request $request)
    {
        $request->validate(['exam_id' => 'required|exists:exams,id']);

        $exam      = Exams::findOrFail($request->exam_id);
        $allotments = exam_allotment::where('exam_id', $exam->id)
            ->with('room')->get();
        $students  = $exam->class->students()->with(['eligibility' => function($q) use ($exam) {
            $q->where('exam_id', $exam->id);
        }])->get();

        if ($allotments->isEmpty()) {
            return redirect()->back()->with('error', 'No rooms assigned to this exam. Please add allotments first.');
        }

        $seatNumber = 1;
        $allotmentIndex = 0;
        $currentAllotment = $allotments[$allotmentIndex];
        $seatsUsed = 0;
        $allocatedCount = 0;
        $skippedCount = 0;
        foreach ($students as $student) {
            // 1. LIVE ATTENDANCE SECURITY GUARD
            $totalClasses = \App\Models\Attendance\Attendance::where('student_id', $student->id)->count();
            $presentClasses = \App\Models\Attendance\Attendance::where('student_id', $student->id)
                ->where('status', 'Present')
                ->count();
            
            $livePercentage = $totalClasses > 0 ? ($presentClasses / $totalClasses) * 100 : 0;
            
            // Supreme Security: Check if admin manually blocked them
            $globalBlock = \App\Models\Eligibility\Eligibility::where('student_id', $student->id)
                ->where('is_eligible', false)
                ->exists();
            
            // BLOCK if: Live percentage is < 75 OR manually blacklisted
            if ($livePercentage < 75 || $globalBlock) {
                $skippedCount++;
                continue;
            }

            // 2. ROOM SHIFTING & SMART OVERFLOW LOGIC
            // If current room is full, find the next one
            if ($seatsUsed >= $currentAllotment->total_seats) {
                $allotmentIndex++;
                
                if (isset($allotments[$allotmentIndex])) {
                    $currentAllotment = $allotments[$allotmentIndex];
                    $seatsUsed = 0;
                    $seatNumber = 1;
                } else {
                    // SMART FALLBACK: Find any other room in the building with space
                    $usedRoomIds = $allotments->pluck('room_id')->toArray();
                    $fallbackRoom = \App\Models\Room\Room::whereNotIn('id', $usedRoomIds)
                        ->where('is_active', true)
                        ->where('capacity', '>', 0)
                        ->first();

                    if ($fallbackRoom) {
                        $currentAllotment = (object)[
                            'room_id' => $fallbackRoom->id,
                            'total_seats' => $fallbackRoom->capacity,
                            'room' => $fallbackRoom
                        ];
                        $seatsUsed = 0;
                        $seatNumber = 1;
                        $allotments->push($currentAllotment);
                    } else {
                        break; // No space left in the entire building
                    }
                }
            }

            // 3. SEAT ASSIGNMENT
            Seat_Allocation::updateOrCreate(
                ['exam_id' => $exam->id, 'student_id' => $student->id],
                [
                    'room_id'     => $currentAllotment->room_id,
                    'seat_number' => 'S-' . $seatNumber,
                    'status'      => $allotmentIndex > 0 ? 'shifted' : 'allocated',
                ]
            );

            $seatNumber++;
            $seatsUsed++;
            $allocatedCount++;
        }

        $message = "Allocated $allocatedCount students.";
        if ($skippedCount > 0) {
            $message .= " CRITICAL: $skippedCount students were BLOCKED due to Short Attendance/Manual Restriction.";
        }
        if ($allocatedCount < (count($students) - $skippedCount)) {
            $remaining = count($students) - $skippedCount - $allocatedCount;
            $message .= " (Room capacity reached: $remaining eligible students were not assigned).";
        }

        return redirect()->route('seat-allocation.index')
            ->with($skippedCount > 0 ? 'error' : 'success', $message);
    }

    public function view()
    {
        $exams = Exams::all();
        return Inertia::render('SeatAllocation/Auto', ['exams' => $exams]);
    }

    public function update(Request $request, Seat_Allocation $seatAllocation)
    {
        $request->validate([
            'room_id'     => 'required|exists:rooms,id',
            'seat_number' => 'required|string',
            'status'      => 'required|in:allocated,shifted,absent',
        ]);

        // Security Check: Ensure student is still eligible
        $eligibility = $seatAllocation->student->eligibility()
            ->where('exam_id', $seatAllocation->exam_id)
            ->first();

        if ($eligibility && !$eligibility->is_eligible) {
            return redirect()->back()->with('error', 'Illegal Update: Student "' . $seatAllocation->student->user->name . '" is currently blocked due to Short Attendance.');
        }

        $seatAllocation->update($request->only('room_id', 'seat_number', 'status'));

        return redirect()->back()->with('success', 'Seat assignment updated manually.');
    }

    public function destroy(Seat_Allocation $seatAllocation)
    {
        $seatAllocation->delete();
        return redirect()->back()->with('success', 'Student removed from seating plan.');
    }
}