<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [

            // ── User Management ──────────────────────
            ['name' => 'users.view',        'module' => 'users', 'display_name' => 'View Users', 'guard_name' => 'web'],
            ['name' => 'users.create',      'module' => 'users', 'display_name' => 'Create Users', 'guard_name' => 'web'],
            ['name' => 'users.edit',        'module' => 'users', 'display_name' => 'Edit Users', 'guard_name' => 'web'],
            ['name' => 'users.delete',      'module' => 'users', 'display_name' => 'Delete Users', 'guard_name' => 'web'],
            ['name' => 'users.permissions', 'module' => 'users', 'display_name' => 'Assign Permissions', 'guard_name' => 'web'],

            // ── Teacher Management ────────────────────
            ['name' => 'teachers.view',   'module' => 'teachers', 'display_name' => 'View Teachers', 'guard_name' => 'web'],
            ['name' => 'teachers.create', 'module' => 'teachers', 'display_name' => 'Add Teacher', 'guard_name' => 'web'],
            ['name' => 'teachers.delete', 'module' => 'teachers', 'display_name' => 'Remove Teacher', 'guard_name' => 'web'],

            // ── Student Management ────────────────────
            ['name' => 'students.view',   'module' => 'students', 'display_name' => 'View Students', 'guard_name' => 'web'],
            ['name' => 'students.create', 'module' => 'students', 'display_name' => 'Add Student', 'guard_name' => 'web'],
            ['name' => 'students.edit',   'module' => 'students', 'display_name' => 'Edit Student', 'guard_name' => 'web'],
            ['name' => 'students.delete', 'module' => 'students', 'display_name' => 'Delete Student', 'guard_name' => 'web'],

            // ── Subject Management ────────────────────
            ['name' => 'subjects.view',   'module' => 'subjects', 'display_name' => 'View Subjects', 'guard_name' => 'web'],
            ['name' => 'subjects.create', 'module' => 'subjects', 'display_name' => 'Add Subject', 'guard_name' => 'web'],
            ['name' => 'subjects.delete', 'module' => 'subjects', 'display_name' => 'Remove Subject', 'guard_name' => 'web'],

            // ── Class Management ──────────────────────
            ['name' => 'classes.view',   'module' => 'classes', 'display_name' => 'View Classes', 'guard_name' => 'web'],
            ['name' => 'classes.create', 'module' => 'classes', 'display_name' => 'Add Class', 'guard_name' => 'web'],
            ['name' => 'classes.delete', 'module' => 'classes', 'display_name' => 'Remove Class', 'guard_name' => 'web'],

            // ── Room Management ───────────────────────
            ['name' => 'rooms.view',   'module' => 'rooms', 'display_name' => 'View Rooms', 'guard_name' => 'web'],
            ['name' => 'rooms.create', 'module' => 'rooms', 'display_name' => 'Add Room', 'guard_name' => 'web'],
            ['name' => 'rooms.delete', 'module' => 'rooms', 'display_name' => 'Remove Room', 'guard_name' => 'web'],

            // ── Exam Management ───────────────────────
            ['name' => 'exams.view',        'module' => 'exams', 'display_name' => 'View Exams', 'guard_name' => 'web'],
            ['name' => 'exams.create',      'module' => 'exams', 'display_name' => 'Create Exam', 'guard_name' => 'web'],
            ['name' => 'exams.edit',        'module' => 'exams', 'display_name' => 'Edit Exam', 'guard_name' => 'web'],
            ['name' => 'exams.delete',      'module' => 'exams', 'display_name' => 'Delete Exam', 'guard_name' => 'web'],
            ['name' => 'exams.date_change', 'module' => 'exams', 'display_name' => 'Change Exam Date', 'guard_name' => 'web'],
            ['name' => 'exams.allotment',   'module' => 'exams', 'display_name' => 'Manage Allotment', 'guard_name' => 'web'],

            // ── Seat Allocation ───────────────────────
            ['name' => 'seats.view',     'module' => 'seats', 'display_name' => 'View Seat Allocation', 'guard_name' => 'web'],
            ['name' => 'seats.allocate', 'module' => 'seats', 'display_name' => 'Auto Allocate Seats', 'guard_name' => 'web'],

            // ── Hall Ticket ───────────────────────────
            ['name' => 'hall_ticket.view',     'module' => 'hall_ticket', 'display_name' => 'View Hall Tickets', 'guard_name' => 'web'],
            ['name' => 'hall_ticket.generate', 'module' => 'hall_ticket', 'display_name' => 'Generate Hall Ticket', 'guard_name' => 'web'],
            ['name' => 'hall_ticket.download', 'module' => 'hall_ticket', 'display_name' => 'Download PDF', 'guard_name' => 'web'],
            ['name' => 'hall_ticket.slip',     'module' => 'hall_ticket', 'display_name' => 'View Slip', 'guard_name' => 'web'],

            // ── Attendance ────────────────────────────
            ['name' => 'attendance.view', 'module' => 'attendance', 'display_name' => 'View Attendance', 'guard_name' => 'web'],
            ['name' => 'attendance.mark', 'module' => 'attendance', 'display_name' => 'Mark Attendance', 'guard_name' => 'web'],

            // ── Eligibility ───────────────────────────
            ['name' => 'eligibility.view',  'module' => 'eligibility', 'display_name' => 'View Eligibility', 'guard_name' => 'web'],
            ['name' => 'eligibility.check', 'module' => 'eligibility', 'display_name' => 'Run Eligibility Check', 'guard_name' => 'web'],

            // ── Reports ───────────────────────────────
            ['name' => 'reports.view',    'module' => 'reports', 'display_name' => 'View Reports', 'guard_name' => 'web'],
            ['name' => 'reports.exam',    'module' => 'reports', 'display_name' => 'Exam Report', 'guard_name' => 'web'],
            ['name' => 'reports.seating', 'module' => 'reports', 'display_name' => 'Seating Report', 'guard_name' => 'web'],

            // ── Settings ──────────────────────────────
            ['name' => 'settings.appearance', 'module' => 'settings', 'display_name' => 'Appearance Settings', 'guard_name' => 'web'],
            ['name' => 'settings.email',      'module' => 'settings', 'display_name' => 'Email Settings', 'guard_name' => 'web'],
        ];

        foreach ($permissions as $permission) {
            Permission::updateOrCreate(
                ['name' => $permission['name'], 'guard_name' => $permission['guard_name']],
                $permission
            );
        }
    }
}