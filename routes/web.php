<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\ClassesController;
use App\Http\Controllers\ClassStudentController;
use App\Http\Controllers\RoomTypeController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\ExamsController;
use App\Http\Controllers\ExamAllotmentController;
use App\Http\Controllers\SeatAllocationController;
use App\Http\Controllers\HallTicketController;
use App\Http\Controllers\AttendanceController;
use Illuminate\Support\Facades\Artisan;
use App\Http\Controllers\EligibilityController;

Route::get('/run-migrations', function () {
    try {
        Artisan::call('migrate --force');
        return "Migrations successful!";
    } catch (\Exception $e) {
        return "Error: " . $e->getMessage();
    }
});
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SettingController;

// -----------------------------------------------
// Public routes (no authentication required)
// -----------------------------------------------
Route::get('/', function () {
    return redirect('/login');
})->name('home');

// -----------------------------------------------
// All protected routes with authentication
// -----------------------------------------------
Route::middleware('auth')->group(function () {

// -----------------------------------------------
// Dashboard
// -----------------------------------------------
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

// -----------------------------------------------
// Profile
// -----------------------------------------------
Route::get('/profile', [\App\Http\Controllers\ProfileController::class, 'edit'])->name('profile.edit');
Route::patch('/profile', [\App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
Route::delete('/profile', [\App\Http\Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');

// -----------------------------------------------
// User Management
// -----------------------------------------------
Route::prefix('users')->name('users.')->group(function () {
    Route::get('/',                 [UserController::class, 'index'])->name('index');
    Route::get('/create',           [UserController::class, 'create'])->name('create');
    Route::post('/',                [UserController::class, 'store'])->name('store');
    Route::get('/{user}/edit',      [UserController::class, 'edit'])->name('edit');
    Route::put('/{user}',           [UserController::class, 'update'])->name('update');
    Route::delete('/{user}',        [UserController::class, 'destroy'])->name('destroy');
    Route::get('/assign-roles',     [UserController::class, 'assignRoles'])->name('assignRoles');
    Route::post('/assign-roles',    [UserController::class, 'saveRoles'])->name('saveRoles');
});

// -----------------------------------------------
// Role Management
// -----------------------------------------------
Route::prefix('roles')->name('roles.')->group(function () {
    Route::get('/',                           [RoleController::class, 'index'])->name('index');
    Route::get('/create',                     [RoleController::class, 'create'])->name('create');
    Route::post('/',                          [RoleController::class, 'store'])->name('store');
    Route::get('/permissions',                [RoleController::class, 'permissionsList'])->name('permissions');
    Route::get('/{role}',                     [RoleController::class, 'show'])->name('show');
    Route::get('/{role}/edit',                [RoleController::class, 'edit'])->name('edit');
    Route::put('/{role}',                     [RoleController::class, 'update'])->name('update');
    Route::delete('/{role}',                  [RoleController::class, 'destroy'])->name('destroy');
    Route::post('/{role}/assign-permissions',[RoleController::class, 'assignPermissions'])->name('assignPermissions');
    Route::get('/{role}/permissions',        [RoleController::class, 'getPermissions'])->name('getPermissions');
});

// -----------------------------------------------
// Teacher Management
// -----------------------------------------------
Route::prefix('teachers')->name('teachers.')->group(function () {
    Route::get('/',                 [TeacherController::class, 'index'])->name('index');
    Route::get('/create',           [TeacherController::class, 'create'])->name('create');
    Route::post('/',                [TeacherController::class, 'store'])->name('store');
    Route::get('/{teacher}',        [TeacherController::class, 'show'])->name('show');
    Route::get('/{teacher}/edit',   [TeacherController::class, 'edit'])->name('edit');
    Route::put('/{teacher}',        [TeacherController::class, 'update'])->name('update');
    Route::delete('/{teacher}',     [TeacherController::class, 'destroy'])->name('destroy');
    Route::patch('/{teacher}/toggle-status', [TeacherController::class, 'toggleStatus'])->name('toggle-status');
});

// -----------------------------------------------
// Student Management
// -----------------------------------------------
Route::prefix('students')->name('students.')->group(function () {
    Route::get('/',                [StudentController::class, 'index'])->name('index');
    Route::get('/create',          [StudentController::class, 'create'])->name('create');
    Route::post('/',               [StudentController::class, 'store'])->name('store');
    Route::get('/{student}',       [StudentController::class, 'show'])->name('show');
    Route::get('/{student}/edit',  [StudentController::class, 'edit'])->name('edit');
    Route::put('/{student}',       [StudentController::class, 'update'])->name('update');
    Route::delete('/{student}',    [StudentController::class, 'destroy'])->name('destroy');
    Route::patch('/{student}/toggle-status', [StudentController::class, 'toggleStatus'])->name('toggle-status');
    Route::get('/api/fetch',       [StudentController::class, 'fetchByClass'])->name('api.fetch');
});

// -----------------------------------------------
// Subject Management
// -----------------------------------------------
Route::prefix('subjects')->name('subjects.')->group(function () {
    Route::get('/',              [SubjectController::class, 'index'])->name('index');
    Route::get('/create',        [SubjectController::class, 'create'])->name('create');
    Route::post('/',             [SubjectController::class, 'store'])->name('store');
    Route::get('/{subject}/edit', [SubjectController::class, 'edit'])->name('edit');
    Route::put('/{subject}',      [SubjectController::class, 'update'])->name('update');
    Route::delete('/{subject}',   [SubjectController::class, 'destroy'])->name('destroy');
    Route::patch('/{subject}/toggle-status', [SubjectController::class, 'toggleStatus'])->name('toggle-status');
});

// -----------------------------------------------
// Class Management
// -----------------------------------------------
Route::prefix('classes')->name('classes.')->group(function () {
    Route::get('/',            [ClassesController::class, 'index'])->name('index');
    Route::get('/create',      [ClassesController::class, 'create'])->name('create');
    Route::post('/',           [ClassesController::class, 'store'])->name('store');
    Route::get('/{class}/edit', [ClassesController::class, 'edit'])->name('edit');
    Route::put('/{class}',     [ClassesController::class, 'update'])->name('update');
    Route::delete('/{class}',  [ClassesController::class, 'destroy'])->name('destroy');
    Route::patch('/{class}/toggle-status', [ClassesController::class, 'toggleStatus'])->name('toggle-status');
});

// -----------------------------------------------
// Class Student (Assign / Remove student from class)
// -----------------------------------------------
Route::prefix('class-students')->name('class-students.')->group(function () {
    Route::get('/',     [ClassStudentController::class, 'index'])->name('index');
    Route::post('/',    [ClassStudentController::class, 'store'])->name('store');
    Route::delete('/',  [ClassStudentController::class, 'destroy'])->name('destroy');
});

// -----------------------------------------------
// Room Types
// -----------------------------------------------
Route::prefix('room-types')->name('room-types.')->group(function () {
    Route::get('/',               [RoomTypeController::class, 'index'])->name('index');
    Route::post('/',              [RoomTypeController::class, 'store'])->name('store');
    Route::delete('/{roomType}',  [RoomTypeController::class, 'destroy'])->name('destroy');
});

// -----------------------------------------------
// Room Management
// -----------------------------------------------
Route::prefix('rooms')->name('rooms.')->group(function () {
    Route::get('/',          [RoomController::class, 'index'])->name('index');
    Route::get('/create',    [RoomController::class, 'create'])->name('create');
    Route::post('/',         [RoomController::class, 'store'])->name('store');
    Route::get('/{room}',    [RoomController::class, 'show'])->name('show');
    Route::get('/{room}/edit', [RoomController::class, 'edit'])->name('edit');
    Route::put('/{room}',    [RoomController::class, 'update'])->name('update');
    Route::delete('/{room}', [RoomController::class, 'destroy'])->name('destroy');
    Route::patch('/{room}/toggle-status', [RoomController::class, 'toggleStatus'])->name('toggle-status');
});

// -----------------------------------------------
// Exam Management
// -----------------------------------------------
Route::prefix('exams')->name('exams.')->group(function () {
    Route::get('/',                     [ExamsController::class, 'index'])->name('index');
    Route::get('/create',               [ExamsController::class, 'create'])->name('create');
    Route::post('/',                    [ExamsController::class, 'store'])->name('store');
    Route::get('/{exam}',               [ExamsController::class, 'show'])->name('show');
    Route::get('/{exam}/edit',          [ExamsController::class, 'edit'])->name('edit');
    Route::put('/{exam}',               [ExamsController::class, 'update'])->name('update');
    Route::delete('/{exam}',            [ExamsController::class, 'destroy'])->name('destroy');
    Route::post('/{exam}/change-date',  [ExamsController::class, 'changeDate'])->name('changeDate');
});

// -----------------------------------------------
// Exam Allotment
// -----------------------------------------------
Route::prefix('allotments')->name('allotments.')->group(function () {
    Route::get('/',               [ExamAllotmentController::class, 'index'])->name('index');
    Route::post('/',              [ExamAllotmentController::class, 'store'])->name('store');
    Route::put('/{allotment}',    [ExamAllotmentController::class, 'update'])->name('update');
    Route::delete('/{allotment}', [ExamAllotmentController::class, 'destroy'])->name('destroy');
});

// -----------------------------------------------
// Seat Allocation
// -----------------------------------------------
Route::prefix('seat-allocation')->name('seat-allocation.')->group(function () {
    Route::get('/',       [SeatAllocationController::class, 'index'])->name('index');
    Route::get('/auto',   [SeatAllocationController::class, 'view'])->name('view');
    Route::post('/auto',  [SeatAllocationController::class, 'autoAllocate'])->name('auto');
    Route::put('/{seatAllocation}', [SeatAllocationController::class, 'update'])->name('update');
    Route::delete('/{seatAllocation}', [SeatAllocationController::class, 'destroy'])->name('destroy');
});

// -----------------------------------------------
// Hall Tickets
// -----------------------------------------------
Route::prefix('hall-tickets')->name('hall-tickets.')->group(function () {
    Route::get('/',                      [HallTicketController::class, 'index'])->name('index');
    Route::post('/generate',             [HallTicketController::class, 'generate'])->name('generate');
    Route::post('/generate-me',          [HallTicketController::class, 'generateMyTicket'])->name('generate-me');
    Route::get('/{hallTicket}/download', [HallTicketController::class, 'download'])->name('download');
    Route::get('/{hallTicket}/slip',     [HallTicketController::class, 'slip'])->name('slip');
});

// -----------------------------------------------
// Attendance Management
// -----------------------------------------------
Route::prefix('attendance')->name('attendance.')->group(function () {
    Route::get('/',                [AttendanceController::class, 'index'])->name('index');
    Route::get('/mark',            [AttendanceController::class, 'mark'])->name('mark');
    Route::post('/store',          [AttendanceController::class, 'store'])->name('store');
    Route::delete('/{attendance}', [AttendanceController::class, 'destroy'])->name('destroy');
});

// -----------------------------------------------
// Eligibility
// -----------------------------------------------
Route::prefix('eligibility')->name('eligibility.')->group(function () {
    Route::get('/',                         [EligibilityController::class, 'index'])->name('index');
    Route::post('/process',                 [EligibilityController::class, 'process'])->name('process');
    Route::post('/{eligibility}/toggle',    [EligibilityController::class, 'toggle'])->name('toggle');
});

// -----------------------------------------------
// Reports
// -----------------------------------------------
Route::prefix('reports')->name('reports.')->group(function () {
    Route::get('/',        [ReportController::class, 'index'])->name('index');
    Route::get('/exam',    [ReportController::class, 'examReport'])->name('exam');
    Route::get('/exam/download', [ReportController::class, 'downloadExamReport'])->name('exam.download');
    Route::get('/seating', [ReportController::class, 'seatingReport'])->name('seating');
    Route::get('/seating/download', [ReportController::class, 'downloadSeatingReport'])->name('seating.download');
    Route::get('/mail-logs', [ReportController::class, 'mailLogs'])->name('mail-logs');
});

// -----------------------------------------------
// Settings
// -----------------------------------------------
Route::prefix('settings')->name('settings.')->group(function () {
    Route::get('/appearance',  [SettingController::class, 'appearance'])->name('appearance');
    Route::post('/appearance', [SettingController::class, 'saveAppearance'])->name('appearance.save');
    Route::get('/email',       [SettingController::class, 'email'])->name('email');
    Route::post('/email',      [SettingController::class, 'saveEmail'])->name('email.save');
});

}); // End of authenticated routes


// -----------------------------------------------
// End of Routes
// -----------------------------------------------
require __DIR__.'/auth.php';