<?php
namespace App\Http\Controllers;

use App\Models\Subject\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects = Subject::latest()->paginate(10);
        return Inertia::render('Subjects/Index', ['subjects' => $subjects]);
    }

    public function create()
    {
        return Inertia::render('Subjects/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|unique:subjects,code',
            'description' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        Subject::create($request->all());

        return redirect()->route('subjects.index')
            ->with('success', 'Subject created successfully');
    }

    public function edit(Subject $subject)
    {
        return Inertia::render('Subjects/Edit', ['subject' => $subject]);
    }

    public function update(Request $request, Subject $subject)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|unique:subjects,code,' . $subject->id,
            'description' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $subject->update($request->all());

        return redirect()->route('subjects.index')
            ->with('success', 'Subject updated successfully');
    }

    public function destroy(Subject $subject)
    {
        // Use forceDelete if you want permanent removal, but subjects are less sensitive than user accounts.
        // However, to keep consistency with the "permanent removal" the user expects lately:
        $subject->forceDelete();
        
        return redirect()->route('subjects.index')
            ->with('success', 'Subject removed permanently');
    }

    public function toggleStatus(Subject $subject)
    {
        $subject->update([
            'is_active' => !$subject->is_active
        ]);

        return redirect()->back()
            ->with('success', 'Subject status updated successfully');
    }
}