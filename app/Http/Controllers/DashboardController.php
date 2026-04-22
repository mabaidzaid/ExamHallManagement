<?php
namespace App\Http\Controllers;

use App\Models\Student\Student;
use App\Models\Teacher\Teacher;
use App\Models\exams\Exams;
use App\Models\Room\Room;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $role = $user->role ?? 'student';

        $stats = [];
        $todays_exams = Exams::with(['subject', 'class'])
            ->whereDate('exam_date', today())
            ->orderBy('start_time')
            ->get();

        $upcoming_exams = Exams::with(['subject', 'class'])
            ->whereDate('exam_date', '>', today())
            ->orderBy('exam_date')
            ->orderBy('start_time')
            ->limit(5)
            ->get();

        $pending_audits = Exams::whereDoesntHave('eligibilityChecks')->count();

        if (in_array($role, ['super_admin', 'admin', 'staff'])) {
            $stats = [
                'total_students' => Student::count(),
                'total_teachers' => Teacher::count(),
                'total_rooms'    => Room::count(),
                'todays_exams'   => $todays_exams->count(),
                'pending_audits' => $pending_audits,
            ];
        } elseif ($role === 'teacher') {
            $stats = [
                'total_students' => Student::count(),
                'todays_exams'   => $todays_exams->count(),
                'pending_audits' => $pending_audits,
                'marked_today'   => 0, // Placeholder for daily attendance
            ];
        } else {
            // Student
            $stats = [
                'todays_exams'   => $todays_exams->count(),
                'pending_audits' => $pending_audits,
            ];
        }

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'todays_exams' => $todays_exams,
            'upcoming_exams' => $upcoming_exams,
            'today' => today()->format('M d'),
        ]);
    }
}