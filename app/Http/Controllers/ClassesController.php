<?php
namespace App\Http\Controllers;

use App\Models\Classes\Classes;
use App\Models\Teacher\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ClassesController extends Controller
{
    public function index()
    {
        $classes = Classes::with('teacher.user')->latest()->paginate(10);
        return Inertia::render('Classes/Index', ['classes' => $classes]);
    }

    public function create()
    {
        $teachers = Teacher::with('user')->whereHas('user', function($q) {
            $q->where('is_active', true);
        })->get();
        return Inertia::render('Classes/Create', ['teachers' => $teachers]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'       => 'required|string|max:255',
            'section'    => 'nullable|string|max:50',
            'teacher_id' => 'nullable|exists:teachers,id',
            'max_students' => 'required|integer|min:1',
            'is_active'  => 'boolean'
        ]);

        Classes::create($request->all());

        return redirect()->route('classes.index')
            ->with('success', 'Class defined successfully');
    }

    public function edit(Classes $class)
    {
        $teachers = Teacher::with('user')->get();
        return Inertia::render('Classes/Edit', [
            'classroom' => $class->load('teacher.user'),
            'teachers' => $teachers
        ]);
    }

    public function update(Request $request, Classes $class)
    {
        $request->validate([
            'name'       => 'required|string|max:255',
            'section'    => 'nullable|string|max:50',
            'teacher_id' => 'nullable|exists:teachers,id',
            'max_students' => 'required|integer|min:1',
            'is_active'  => 'boolean',
        ]);

        $class->update($request->all());

        return redirect()->route('classes.index')
            ->with('success', 'Class updated successfully');
    }

    public function destroy(Classes $class)
    {
        DB::transaction(function() use ($class) {
            // If there are dependencies, handle them here. 
            // For now, permanent removal as requested by the pattern.
            $class->forceDelete();
        });

        return redirect()->route('classes.index')
            ->with('success', 'Class removed permanently');
    }

    public function toggleStatus(Classes $class)
    {
        $class->update([
            'is_active' => !$class->is_active
        ]);

        return redirect()->back()
            ->with('success', 'Class status updated successfully');
    }
}