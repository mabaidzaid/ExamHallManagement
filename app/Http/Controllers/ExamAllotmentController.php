<?php
namespace App\Http\Controllers;

use App\Models\exam_allotment\exam_allotment;
use App\Models\exams\exams as Exams;
use App\Models\Room\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamAllotmentController extends Controller
{
    public function index()
    {
        $allotments = exam_allotment::with(['exam', 'room'])->latest()->paginate(10);
        $exams = Exams::all();
        $rooms = Room::where('is_active', true)->get();
        return Inertia::render('Exams/Allotment', [
            'allotments' => $allotments,
            'exams'      => $exams,
            'rooms'      => $rooms,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'exam_id'      => 'required|exists:exams,id',
            'room_id'      => 'required|exists:rooms,id',
            'total_seats'  => 'required|integer|min:1',
        ]);

        exam_allotment::updateOrCreate(
            ['exam_id' => $request->exam_id, 'room_id' => $request->room_id],
            ['total_seats' => $request->total_seats, 'is_overflow' => $request->is_overflow ?? 0]
        );

        return redirect()->back()->with('success', 'Allotment added');
    }

    public function destroy(exam_allotment $allotment)
    {
        $allotment->delete();
        return redirect()->back()->with('success', 'Allotment removed');
    }
}