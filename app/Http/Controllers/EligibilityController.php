<?php
namespace App\Http\Controllers;

use App\Models\Student\Student;
use App\Models\exams\Exams;
use App\Models\Attendance\Attendance;
use App\Models\Eligibility\Eligibility;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class EligibilityController extends Controller
{
    public function index(Request $request)
    {
        $selectedExamId = $request->query('exam_id');
        $studentsQuery = Student::with(['user', 'classes']);

        // If an exam is selected, only show students from that exam's class
        if ($selectedExamId) {
            $exam = Exams::find($selectedExamId);
            if ($exam && $exam->class_id) {
                $studentsQuery->whereHas('classes', function($q) use ($exam) {
                    $q->where('classes.id', $exam->class_id);
                });
            }
        }

        $students = $studentsQuery->get()->map(function($student) use ($selectedExamId) {
            // Calculate attendance percentage
            $totalClasses = Attendance::where('student_id', $student->id)->count();
            $presentClasses = Attendance::where('student_id', $student->id)
                ->whereIn('status', ['present', 'Present'])
                ->count();
            
            $percentage = $totalClasses > 0 ? ($presentClasses / $totalClasses) * 100 : 0;
            
            $student->attendance_stats = [
                'total' => $totalClasses,
                'present' => $presentClasses,
                'percentage' => round($percentage, 2)
            ];
            
            // Get eligibility status FOR THE SELECTED EXAM only
            if ($selectedExamId) {
                $student->eligibility = Eligibility::where('student_id', $student->id)
                    ->where('exam_id', $selectedExamId)
                    ->first();
            } else {
                $student->eligibility = null;
            }
                
            return $student;
        });

        $exams = Exams::all();

        return Inertia::render('Eligibility/Index', [
            'students' => $students,
            'exams' => $exams,
            'threshold' => 75, // Default 75%
            'selectedExamId' => $selectedExamId,
        ]);
    }

    public function process(Request $request)
    {
        $request->validate([
            'exam_id' => 'required|exists:exams,id',
            'threshold' => 'required|numeric|min:0|max:100'
        ]);

        $exam = Exams::findOrFail($request->exam_id);
        $students = Student::whereHas('classes', function($q) use ($exam) {
            $q->where('classes.id', $exam->class_id);
        })->get();
        $processedCount = 0;

        foreach ($students as $student) {
            $totalClasses = Attendance::where('student_id', $student->id)->count();
            $presentClasses = Attendance::where('student_id', $student->id)
                ->whereIn('status', ['present', 'Present'])
                ->count();
            
            $percentage = $totalClasses > 0 ? ($presentClasses / $totalClasses) * 100 : 0;
            
            // Check for existing record FOR THIS SPECIFIC EXAM
            $existingCheck = Eligibility::where('student_id', $student->id)
                ->where('exam_id', $request->exam_id)
                ->first();

            $adminOverride = $existingCheck ? $existingCheck->admin_override : false;
            $isEligible = false;
            $reason = '';

            // Logic Flow:
            // 1. Hard Block: Fee Status (Priority 1)
            if ($student->fee_status !== 'paid') {
                $isEligible = false;
                $reason = 'Blocked: Fee Payment Pending';
                $adminOverride = false; // Fee block cannot be overridden easily in this logic
            } 
            // 2. Manual Override (Priority 2)
            else if ($adminOverride) {
                $isEligible = $existingCheck->is_eligible;
                $reason = $isEligible ? 'Manually Allowed by Admin' : 'Manually Blocked by Admin';
            }
            // 3. Attendance Logic with Relaxation (Priority 3)
            else {
                if ($percentage >= 75) {
                    $isEligible = true;
                    $reason = 'Meets attendance requirements';
                } else {
                    // "Attendence short h tw relaxation mily"
                    $isEligible = true;
                    $reason = 'Relaxation: Allowed despite short attendance';
                }
            }

            Eligibility::updateOrCreate(
                ['exam_id' => $request->exam_id, 'student_id' => $student->id],
                [
                    'attendance_percentage' => $percentage,
                    'is_eligible' => $isEligible,
                    'reason' => $reason,
                    'admin_override' => $adminOverride,
                ]
            );
            $processedCount++;
        }

        return redirect()->route('eligibility.index', ['exam_id' => $request->exam_id])
            ->with('success', "Processed eligibility for $processedCount students.");
    }

    public function toggle(Request $request, Eligibility $eligibility)
    {
        $newStatus = !$eligibility->is_eligible;
        
        $eligibility->update([
            'is_eligible' => $newStatus,
            'admin_override' => true,
            'reason' => $newStatus 
                ? 'Manually Allowed by Admin (Override)' 
                : 'Manually Blocked by Admin (Override)',
        ]);

        return redirect()->back()->with('success', 'Eligibility status toggled successfully.');
    }

    public function toggleFee(Request $request, Student $student)
    {
        $currentStatus = $student->fee_status;
        $newStatus = $currentStatus === 'paid' ? 'unpaid' : 'paid';
        
        $student->update([
            'fee_status' => $newStatus,
            'fee_override' => true,
        ]);

        // NEW: Also update/create the eligibility for the current exam context if one is selected
        if ($request->has('exam_id') && $request->exam_id) {
            // Re-calculate attendance stats for accuracy
            $totalClasses = Attendance::where('student_id', $student->id)->count();
            $presentClasses = Attendance::where('student_id', $student->id)
                ->whereIn('status', ['present', 'Present'])
                ->count();
            $percentage = $totalClasses > 0 ? ($presentClasses / $totalClasses) * 100 : 0;

            if ($newStatus === 'unpaid') {
                $isEligible = false;
                $reason = 'Blocked: Fee Payment Pending';
                $adminOverride = false;
            } else {
                // When fee is paid, we check attendance but give relaxation if short
                if ($percentage >= 75) {
                    $isEligible = true;
                    $reason = 'Meets all requirements (Attendance & Fee)';
                } else {
                    $isEligible = true;
                    $reason = 'Relaxation: Allowed despite short attendance';
                }
                $adminOverride = false;
            }

            Eligibility::updateOrCreate(
                ['student_id' => $student->id, 'exam_id' => $request->exam_id],
                [
                    'attendance_percentage' => $percentage,
                    'is_eligible' => $isEligible,
                    'reason' => $reason,
                    'admin_override' => $adminOverride
                ]
            );
        }

        return redirect()->back()->with('success', 'Fee status updated for student.');
    }
}