<?php
namespace App\Http\Controllers;

use App\Models\exams\Exams;
use App\Models\Subject\Subject;
use App\Models\Classes\Classes;
use App\Models\Room\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamsController extends Controller
{
    public function index()
    {
        $exams = Exams::with(['subject', 'class'])
            ->latest()->paginate(10);
        return Inertia::render('Exams/Index', ['exams' => $exams]);
    }

    public function create()
    {
        return Inertia::render('Exams/Create', [
            'subjects' => Subject::where('is_active', true)->get(),
            'classes'  => Classes::where('is_active', true)->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'      => 'required|string',
            'subject_id' => 'required|exists:subjects,id',
            'class_id'   => 'required|exists:classes,id',
            'exam_date'  => 'required|date',
            'start_time' => 'required',
            'end_time'   => 'required|after:start_time',
        ]);

        Exams::create($request->only(
            'title','subject_id','class_id',
            'exam_date','start_time','end_time','remarks'
        ));

        return redirect()->route('exams.index')
            ->with('success', 'Exam created successfully');
    }

    public function show(Exams $exam)
    {
        $exam->load([
            'subject', 
            'class', 
            'allotments.room',
            'seatAllocations.student.user'
        ]);

        // Group allocations by room_id for display
        $roomAllocations = $exam->seatAllocations->groupBy('room_id');

        return Inertia::render('Exams/Show', [
            'exam' => $exam,
            'allocationStats' => $roomAllocations
        ]);
    }

    public function edit(Exams $exam)
    {
        return Inertia::render('Exams/Edit', [
            'exam' => $exam->load(['subject', 'class']),
            'subjects' => Subject::where('is_active', true)->get(),
            'classes'  => Classes::where('is_active', true)->get(),
        ]);
    }

    public function update(Request $request, Exams $exam)
    {
        $request->validate([
            'title'      => 'required|string',
            'subject_id' => 'required|exists:subjects,id',
            'class_id'   => 'required|exists:classes,id',
            'exam_date'  => 'required|date',
            'start_time' => 'required',
            'end_time'   => 'required|after:start_time',
            'status'     => 'nullable|string',
            'remarks'    => 'nullable|string',
        ]);

        $exam->update($request->only(
            'title','subject_id','class_id','exam_date',
            'start_time','end_time','status','remarks'
        ));
        return redirect()->route('exams.index')
            ->with('success', 'Exam updated successfully');
    }

    public function destroy(Exams $exam)
    {
        $exam->delete();
        return redirect()->route('exams.index')
            ->with('success', 'Exam deleted');
    }

    public function changeDate(Request $request, Exams $exam)
    {
        $request->validate(['exam_date' => 'required|date']);
        $exam->update([
            'exam_date' => $request->exam_date,
            'status'    => 'postponed',
        ]);
        return redirect()->back()->with('success', 'Exam date changed');
    }
}