<?php
namespace App\Http\Controllers;

use App\Models\Teacher\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Cloudinary\Cloudinary;

class TeacherController extends Controller
{
    public function index()
    {
        $teachers = Teacher::with('user')->latest()->paginate(10);
        return Inertia::render('Teachers/Index', ['teachers' => $teachers]);
    }

    public function create()
    {
        return Inertia::render('Teachers/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'           => 'required|string|max:255',
            'email'          => 'required|email:rfc,dns|unique:users',
            'password'       => 'required|min:8',
            'department'     => 'nullable|string',
            'designation'    => 'nullable|string',
            'contact_number' => 'nullable|string',
            'cnic'           => 'nullable|string',
            'gender'         => 'nullable|in:male,female',
            'joining_date'   => 'nullable|date',
            'state'          => 'nullable|string',
            'country'        => 'nullable|string',
            'profile_picture'=> 'nullable|image|max:2048',
            'cv'             => 'nullable|file|mimes:pdf,doc,docx|max:5120',
            'id_card_front'  => 'nullable|image|max:2048',
            'id_card_back'   => 'nullable|image|max:2048',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => bcrypt($request->password),
            'role'     => 'teacher',
        ]);

        $user->assignRole('teacher');

        $paths = [];
        $fileFields = ['profile_picture', 'cv', 'id_card_front', 'id_card_back'];
        $cloudinary = new Cloudinary(env('CLOUDINARY_URL'));
        foreach ($fileFields as $field) {
            if ($request->hasFile($field)) {
                // Upload to Cloudinary via Official SDK
                $result = $cloudinary->uploadApi()->upload($request->file($field)->getRealPath(), [
                    'folder' => 'teachers'
                ]);
                $paths[$field] = $result['secure_url'];
            } else {
                $paths[$field] = null;
            }
        }

        Teacher::create([
            'user_id'        => $user->id,
            'department'     => $request->department,
            'designation'    => $request->designation,
            'qualification'  => $request->qualification,
            'experience'     => $request->experience,
            'contact_number' => $request->contact_number,
            'cnic'           => $request->cnic,
            'email'          => $request->email,
            'address'        => $request->address,
            'city'             => $request->city,
            'state'          => $request->state,
            'country'        => $request->country,
            'gender'         => $request->gender,
            'joining_date'   => $request->joining_date,
            'status'         => 'active',
            'profile_picture'=> $paths['profile_picture'],
            'cv'             => $paths['cv'],
            'id_card_front'  => $paths['id_card_front'],
            'id_card_back'   => $paths['id_card_back'],
        ]);

        return redirect()->route('teachers.index')
            ->with('success', 'Teacher added successfully');
    }

    public function show(Teacher $teacher)
    {
        $teacher->load('user');
        return Inertia::render('Teachers/Show', ['teacher' => $teacher]);
    }

    public function edit(Teacher $teacher)
    {
        return Inertia::render('Teachers/Edit', ['teacher' => $teacher->load('user')]);
    }

    public function update(Request $request, Teacher $teacher)
    {
        $request->validate([
            'name'           => 'required|string|max:255',
            'email'          => 'required|email:rfc,dns|unique:users,email,' . $teacher->user_id,
            'department'     => 'nullable|string',
            'designation'    => 'nullable|string',
            'contact_number' => 'nullable|string',
            'cnic'           => 'nullable|string',
            'gender'         => 'nullable|in:male,female',
            'qualification'  => 'nullable|string',
            'experience'     => 'nullable|string',
            'address'        => 'nullable|string',
            'city'           => 'nullable|string',
            'state'          => 'nullable|string',
            'country'        => 'nullable|string',
            'joining_date'   => 'nullable|date',
            'profile_picture'=> 'nullable|image|max:2048',
            'cv'             => 'nullable|file|mimes:pdf,doc,docx|max:5120',
            'id_card_front'  => 'nullable|image|max:2048',
            'id_card_back'   => 'nullable|image|max:2048',
        ]);

        $teacher->user->update([
            'name'  => $request->name,
            'email' => $request->email,
        ]);

        $data = $request->only(
            'department','designation','qualification','experience',
            'contact_number','cnic','email','address','city','state','country','gender','joining_date'
        );

        $fileFields = ['profile_picture', 'cv', 'id_card_front', 'id_card_back'];
        $cloudinary = new Cloudinary(env('CLOUDINARY_URL'));
        foreach ($fileFields as $field) {
            if ($request->hasFile($field)) {
                // Upload to Cloudinary via Official SDK
                $result = $cloudinary->uploadApi()->upload($request->file($field)->getRealPath(), [
                    'folder' => 'teachers'
                ]);
                $data[$field] = $result['secure_url'];
            }
        }

        $teacher->update($data);

        return redirect()->route('teachers.index')
            ->with('success', 'Teacher updated successfully');
    }

    public function destroy(Teacher $teacher)
    {
        $fields = ['profile_picture', 'cv', 'id_card_front', 'id_card_back'];
        foreach ($fields as $field) {
            if ($teacher->$field) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($teacher->$field);
            }
        }
        
        \Illuminate\Support\Facades\DB::transaction(function () use ($teacher) {
            $user = $teacher->user;
            $teacher->forceDelete();
            if ($user) {
                $user->delete();
            }
        });
        
        return redirect()->route('teachers.index')
            ->with('success', 'Teacher and associated User account removed successfully');
    }

    public function toggleStatus(Teacher $teacher)
    {
        $newStatus = $teacher->status === 'active' ? 'inactive' : 'active';
        $teacher->update(['status' => $newStatus]);

        if ($teacher->user) {
            $teacher->user->update(['is_active' => $newStatus === 'active']);
        }

        return redirect()->back()
            ->with('success', 'Teacher status updated successfully');
    }
}