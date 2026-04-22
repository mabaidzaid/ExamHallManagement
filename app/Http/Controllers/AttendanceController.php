<?php
namespace App\Http\Controllers;

use App\Models\Attendance\Attendance;
use App\Models\Student\Student;
use App\Models\Subject\Subject;
use App\Models\Classes\Classes;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function index()
    {
        $attendances = Attendance::with(['student.user', 'subject'])
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        // Transform for stable date strings
        $attendances->getCollection()->transform(function($att) {
            $att->formatted_date = $att->date->format('d M Y');
            return $att;
        });

        return Inertia::render('Attendance/Index', [
            'attendances' => $attendances,
            'stats' => [
                'total_records' => Attendance::count(),
                'today_count' => Attendance::query()->whereDate('date', Carbon::today())->count()
            ]
        ]);
    }

    public function mark()
    {
        return Inertia::render('Attendance/Mark', [
            'classes'  => Classes::where('is_active', true)->get(),
            'subjects' => Subject::where('is_active', true)->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'subject_id'  => 'required|exists:subjects,id',
            'date'        => 'required|date',
            'attendance'  => 'required|array',
        ]);

        $date = date('Y-m-d', strtotime($request->date));

        foreach ($request->attendance as $studentId => $status) {
            Attendance::updateOrCreate(
                [
                    'student_id' => $studentId,
                    'subject_id' => $request->subject_id,
                    'date'       => $date,
                ],
                [
                    'status'    => strtolower($status),
                    'marked_by' => auth()->id(),
                ]
            );
        }

        return redirect()->route('attendance.index')->with('success', 'Attendance marked successfully');
    }

    public function destroy(Attendance $attendance)
    {
        $attendance->delete();
        return redirect()->back()->with('success', 'Record deleted successfully');
    }
}