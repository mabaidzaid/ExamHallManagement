<?php
namespace App\Http\Controllers;

use App\Models\Student\Student;
use App\Models\exams\exams as Exams;
use App\Models\Attendance\Attendance;
use App\Models\Eligibility\Eligibility;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class EligibilityController extends Controller
{
    public function index()
    {
        $students = Student::with(['user', 'classes'])->get()->map(function($student) {
            // Calculate attendance percentage
            $totalClasses = Attendance::where('student_id', $student->id)->count();
            $presentClasses = Attendance::where('student_id', $student->id)
                ->where('status', 'Present')
                ->count();
            
            $percentage = $totalClasses > 0 ? ($presentClasses / $totalClasses) * 100 : 0;
            
            $student->attendance_stats = [
                'total' => $totalClasses,
                'present' => $presentClasses,
                'percentage' => round($percentage, 2)
            ];
            
            // Get latest eligibility status
            $student->eligibility = Eligibility::where('student_id', $student->id)
                ->latest()
                ->first();
                
            return $student;
        });

        $exams = Exams::all();

        return Inertia::render('Eligibility/Index', [
            'students' => $students,
            'exams' => $exams,
            'threshold' => 75 // Default 75%
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
                ->where('status', 'Present')
                ->count();
            
            $percentage = $totalClasses > 0 ? ($presentClasses / $totalClasses) * 100 : 0;
            
            // Check for existing record to preserve manual override
            $existingCheck = Eligibility::where('student_id', $student->id)
                ->where('exam_id', $request->exam_id)
                ->first();

            // Logic: Attendance is the primary gatekeeper
            $isEligible = $percentage >= 75;
            $reason = $isEligible ? 'Meets attendance requirements' : 'Insufficient attendance (below 75%)';

            // Only respect override if it was a manual APPROVAL for someone with low attendance
            // or if it's a specific administrative case. 
            // For now, let's make it strictly follow the 75% rule as per user request.
            if ($existingCheck && $existingCheck->admin_override) {
                 // If the admin manually changed it, we keep it, 
                 // but if they fall below 75%, we should at least alert or reconsider.
                 // To follow your exact request: "if attendance < 75% it should change"
                 // we will only keep the override if the student is ABOVE 75%.
                 if ($percentage < 75) {
                    $isEligible = false;
                    $reason = 'Insufficient attendance (Self-Correction: Below 75%)';
                 } else {
                    $isEligible = $existingCheck->is_eligible;
                    $reason = $existingCheck->reason;
                 }
            }

            Eligibility::updateOrCreate(
                ['exam_id' => $request->exam_id, 'student_id' => $student->id],
                [
                    'attendance_percentage' => $percentage,
                    'is_eligible' => $isEligible,
                    'reason' => $reason,
                    'admin_override' => $existingCheck ? $existingCheck->admin_override : false
                ]
            );
            $processedCount++;
        }

        return redirect()->back()->with('success', "Processed eligibility for $processedCount students.");
    }

    public function toggle(Request $request, Eligibility $eligibility)
    {
        $eligibility->update([
            'is_eligible' => !$eligibility->is_eligible,
            'reason' => 'Manual Override by Admin'
        ]);

        return redirect()->back()->with('success', 'Eligibility status toggled successfully.');
    }
}