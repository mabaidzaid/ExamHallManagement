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

            // Default logic: attendance >= 75% means eligible
            $isEligible = $percentage >= 75;
            $reason = $isEligible ? 'Meets attendance requirements' : 'Insufficient attendance (below 75%)';
            $adminOverride = false;

            // KEY FIX: If admin manually allowed a short-attendance student, 
            // RESPECT that override — don't overwrite it on re-processing.
            if ($existingCheck && $existingCheck->admin_override) {
                if ($existingCheck->is_eligible) {
                    // Admin explicitly ALLOWED this student despite short attendance
                    // Keep their override active
                    $isEligible = true;
                    $reason = 'Allowed by Admin Override (Attendance: ' . round($percentage, 2) . '%)';
                    $adminOverride = true;
                } else {
                    // Admin explicitly BLOCKED this student 
                    // Keep them blocked
                    $isEligible = false;
                    $reason = 'Blocked by Admin Override';
                    $adminOverride = true;
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
}