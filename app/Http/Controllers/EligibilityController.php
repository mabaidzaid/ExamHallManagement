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

        $students = Student::with(['user', 'classes'])->get()->map(function($student) use ($selectedExamId) {
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

        $students = Student::all();
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

            // 1. Initial Attendance Logic
            $isEligible = ($percentage >= 75);
            $reason = $isEligible ? 'Meets attendance requirements' : 'Insufficient attendance (below 75%)';
            $adminOverride = false;

            // 2. Apply Manual Override (if exists)
            if ($existingCheck && $existingCheck->admin_override) {
                $isEligible = $existingCheck->is_eligible;
                $reason = $isEligible ? 'Manually Allowed by Admin' : 'Manually Blocked by Admin';
                $adminOverride = true;
            }

            // 3. FINAL HARD OVERRIDE: Fee Status
            // If fee is unpaid, student is BLOCKED no matter what (even if there was a manual allow)
            if ($student->fee_status !== 'paid') {
                $isEligible = false;
                $reason = 'Blocked: Fee Payment Pending';
                // If it was a manual allow, we strip the override so it follows the fee rule
                if ($adminOverride && $existingCheck->is_eligible) {
                    $adminOverride = false; 
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

        // NEW: Also update the eligibility for the current exam context if one is selected
        if ($request->has('exam_id')) {
            $eligibility = Eligibility::where('student_id', $student->id)
                ->where('exam_id', $request->exam_id)
                ->first();
            
            if ($eligibility) {
                // If marking as unpaid, always block
                if ($newStatus === 'unpaid') {
                    $eligibility->update([
                        'is_eligible' => false,
                        'reason' => 'Blocked: Fee Payment Pending',
                        'admin_override' => false // Strip override to force fee block
                    ]);
                } else {
                    // If marking as paid, we should ideally re-run the sync logic for this student
                    // but for simplicity, we'll just allow it if attendance is okay or if admin manually allows it later.
                    // For now, let's just let the user click "Sync" to restore their previous allow status or auto-calculate.
                }
            }
        }

        return redirect()->back()->with('success', 'Fee status updated for student.');
    }
}