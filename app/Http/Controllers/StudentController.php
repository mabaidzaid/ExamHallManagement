<?php
namespace App\Http\Controllers;

use App\Models\Student\Student;
use App\Models\User;
use App\Models\Classes\Classes;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class StudentController extends Controller
{
    public function fetchByClass(Request $request)
    {
        $classId = $request->query('class_id');
        
        // Fetch students who belong to this class
        $students = Student::whereHas('classes', function($query) use ($classId) {
            $query->where('classes.id', $classId);
        })
        ->with('user')
        ->get();

        return response()->json([
            'debug_class_id' => $classId,
            'data' => $students,
            'count' => $students->count()
        ]);
    }

    public function index()
    {
        $students = Student::with(['user', 'classes'])
            ->latest()->paginate(10);
        return Inertia::render('Students/Index', ['students' => $students]);
    }

    public function create()
    {
        $classes = Classes::where('is_active', true)->get();
        return Inertia::render('Students/Create', ['classes' => $classes]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name'       => 'required|string|max:255',
            'last_name'        => 'required|string|max:255',
            'email'            => 'required|email|unique:users',
            'password'         => 'required|min:8',
            'admission_number' => 'required|unique:students',
            'class_id'         => 'required|exists:classes,id',
            'gender'           => 'nullable|in:male,female,other',
            'date_of_birth'    => 'nullable|date',
            'phone'            => 'nullable|string',
            'address'          => 'nullable|string',
            'city'             => 'nullable|string',
            'state'            => 'nullable|string',
            'country'          => 'nullable|string',
            'admission_date'   => 'nullable|date',
            'cnic'             => 'nullable|string',
            'profile_picture'  => 'nullable|image|max:2048',
        ]);

        return DB::transaction(function () use ($request) {
            $user = User::create([
                'name'     => $request->first_name . ' ' . $request->last_name,
                'email'    => $request->email,
                'password' => bcrypt($request->password),
                'role'     => 'student',
            ]);

            $user->assignRole('student');

            $profile_picture = null;
            if ($request->hasFile('profile_picture')) {
                // Upload to Cloudinary via Facade
                $result = Cloudinary::upload($request->file('profile_picture')->getRealPath(), ['folder' => 'students']);
                $profile_picture = $result->getSecurePath();
            }

            $student = Student::create([
                'user_id'          => $user->id,
                'first_name'       => $request->first_name,
                'last_name'        => $request->last_name,
                'phone'            => $request->phone,
                'address'          => $request->address,
                'city'             => $request->city,
                'state'            => $request->state,
                'country'          => $request->country,
                'gender'           => $request->gender,
                'date_of_birth'    => $request->date_of_birth,
                'admission_number' => $request->admission_number,
                'admission_date'   => $request->admission_date,
                'cnic'             => $request->cnic,
                'status'           => 'active',
                'profile_picture'  => $profile_picture,
            ]);

            if ($request->class_id) {
                $student->classes()->attach($request->class_id);
            }

            return redirect()->route('students.index')
                ->with('success', 'Student added successfully');
        });
    }

    public function show(Student $student)
    {
        $student->load(['user', 'classes']);
        return Inertia::render('Students/Show', ['student' => $student]);
    }

    public function edit(Student $student)
    {
        $student->load(['user', 'classes']);
        $classes = Classes::where('is_active', true)->get();
        return Inertia::render('Students/Edit', [
            'student' => $student,
            'classes' => $classes,
        ]);
    }

    public function update(Request $request, Student $student)
    {
        $request->validate([
            'first_name'       => 'required|string|max:255',
            'last_name'        => 'required|string|max:255',
            'email'            => 'required|email|unique:users,email,' . $student->user_id,
            'admission_number' => 'required|unique:students,admission_number,' . $student->id,
            'class_id'         => 'required|exists:classes,id',
            'gender'           => 'nullable|in:male,female,other',
            'date_of_birth'    => 'nullable|date',
            'profile_picture'  => 'nullable|image|max:2048',
        ]);

        return DB::transaction(function () use ($request, $student) {
            $student->user->update([
                'name'  => $request->first_name . ' ' . $request->last_name,
                'email' => $request->email,
            ]);

            $data = $request->only(
                'first_name', 'last_name', 'phone', 'address', 'city', 'state', 'country', 
                'gender', 'date_of_birth', 'admission_number', 
                'admission_date', 'cnic'
            );

            if ($request->hasFile('profile_picture')) {
                // Upload to Cloudinary via Facade
                $result = Cloudinary::upload($request->file('profile_picture')->getRealPath(), ['folder' => 'students']);
                $data['profile_picture'] = $result->getSecurePath();
            }

            $student->update($data);

            if ($request->class_id) {
                $student->classes()->sync([$request->class_id]);
            }

            return redirect()->route('students.index')
                ->with('success', 'Student updated successfully');
        });
    }

    public function destroy(Student $student)
    {
        if ($student->profile_picture) {
            Storage::disk('public')->delete($student->profile_picture);
        }
        DB::transaction(function () use ($student) {
            $user = $student->user;
            $student->classes()->detach();
            $student->forceDelete();
            if ($user) {
                $user->delete();
            }
        });

        return redirect()->route('students.index')
            ->with('success', 'Student and associated User account deleted successfully');
    }

    public function toggleStatus(Student $student)
    {
        $newStatus = $student->status === 'active' ? 'inactive' : 'active';
        $student->update(['status' => $newStatus]);

        if ($student->user) {
            $student->user->update(['is_active' => $newStatus === 'active']);
        }

        return redirect()->back()
            ->with('success', 'Student status updated successfully');
    }
}