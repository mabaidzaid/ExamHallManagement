<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with(['student', 'teacher'])->latest()->paginate(10);
        return Inertia::render('Users/Index', ['users' => $users]);
    }

    public function create()
    {
        return Inertia::render('Users/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:8',
            'role'     => 'required|in:admin,staff,teacher,student,super_admin',
        ]);

        $user = User::create([
            'name'      => $request->name,
            'email'     => $request->email,
            'password'  => bcrypt($request->password),
            'role'      => $request->role,
            'is_active' => $request->is_active ?? true,
        ]);

        $user->assignRole($request->role);

        return redirect()->route('users.index')
            ->with('success', 'User created successfully');
    }

    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', ['user' => $user]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role'  => 'required|in:admin,staff,teacher,student,super_admin',
        ]);

        $user->update($request->only('name', 'email', 'role', 'is_active'));
        $user->syncRoles([$request->role]);

        // Sync status and email to Teacher or Student
        $status = $user->is_active ? 'active' : 'inactive';
        if ($user->teacher) {
            $user->teacher->update([
                'status' => $status,
                'email' => $user->email,
            ]);
        }
        if ($user->student) {
            $user->student->update(['status' => $status]);
        }

        return redirect()->route('users.index')
            ->with('success', 'User updated successfully');
    }

    public function destroy(User $user)
    {
        // Prevent deleting yourself
        if (auth()->id() === $user->id) {
            return redirect()->back()->with('error', 'You cannot delete your own account.');
        }

        // Prevent deleting Super Admin
        if ($user->role === 'super_admin') {
            return redirect()->back()->with('error', 'Super Admin accounts cannot be deleted for security reasons.');
        }

        \Illuminate\Support\Facades\DB::transaction(function () use ($user) {
            // Handle related Teacher record (including soft-deleted)
            $teacher = $user->teacher()->withTrashed()->first();
            if ($teacher) {
                $fields = ['profile_picture', 'cv', 'id_card_front', 'id_card_back'];
                foreach ($fields as $field) {
                    if ($teacher->$field) {
                        \Illuminate\Support\Facades\Storage::disk('public')->delete($teacher->$field);
                    }
                }
                $teacher->forceDelete();
            }

            // Handle related Student record (including soft-deleted)
            $student = $user->student()->withTrashed()->first();
            if ($student) {
                if ($student->profile_picture) {
                    \Illuminate\Support\Facades\Storage::disk('public')->delete($student->profile_picture);
                }
                $student->forceDelete();
            }

            $user->delete();
        });

        return redirect()->route('users.index')
            ->with('success', 'User and all associated profile records deleted successfully');
    }

    public function assignRoles()
    {
        $users = User::with(['roles', 'permissions'])->get();
        $roles = \Spatie\Permission\Models\Role::all();
        $permissions = \Spatie\Permission\Models\Permission::all();
        
        return Inertia::render('Roles/AssignRoles', [
            'users' => $users,
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    public function saveRoles(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'roles'   => 'nullable|array',
            'roles.*' => 'exists:roles,id',
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,id',
        ]);

        $user = User::findOrFail($request->user_id);
        
        // Sync Roles
        if (!empty($request->roles)) {
            $roles = \Spatie\Permission\Models\Role::whereIn('id', $request->roles)->get();
            $user->syncRoles($roles);
            // Sync the role column for display consistency
            $user->update(['role' => $roles->first()->name]);
        } else {
            $user->syncRoles([]);
            $user->update(['role' => null]);
        }

        // Sync Direct Permissions
        if (!empty($request->permissions)) {
            $permissions = \Spatie\Permission\Models\Permission::whereIn('id', $request->permissions)->get();
            $user->syncPermissions($permissions);
        } else {
            $user->syncPermissions([]);
        }

        return redirect()->back()->with('success', 'Roles and Permissions assigned successfully');
    }
}