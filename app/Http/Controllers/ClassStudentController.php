<?php
namespace App\Http\Controllers;

use App\Models\Classes\Classes;
use App\Models\Student\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassStudentController extends Controller
{
    // View all students of a class
    public function index(Request $request)
    {
        $classes  = Classes::with('teacher.user')->get();
        $students = [];

        if ($request->class_id) {
            $students = Classes::find($request->class_id)
                ->students()
                ->with('user')
                ->paginate(10);
        }

        return Inertia::render('Classes/Students', [
            'classes'  => $classes,
            'students' => $students,
            'selected_class_id' => $request->class_id,
        ]);
    }

    // Assign student to class
    public function store(Request $request)
    {
        $request->validate([
            'class_id'   => 'required|exists:classes,id',
            'student_id' => 'required|exists:students,id',
        ]);

        $class   = Classes::findOrFail($request->class_id);
        $already = $class->students()->where('student_id', $request->student_id)->exists();

        if ($already) {
            return redirect()->back()->with('error', 'Student already in this class');
        }

        $class->students()->attach($request->student_id);

        return redirect()->back()->with('success', 'Student assigned to class');
    }

    // Remove student from class
    public function destroy(Request $request)
    {
        $request->validate([
            'class_id'   => 'required|exists:classes,id',
            'student_id' => 'required|exists:students,id',
        ]);

        $class = Classes::findOrFail($request->class_id);
        $class->students()->detach($request->student_id);

        return redirect()->back()->with('success', 'Student removed from class');
    }
}