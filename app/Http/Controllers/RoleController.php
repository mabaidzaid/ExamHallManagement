<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    /**
     * Display a listing of roles.
     */
    public function index()
    {
        $roles = Role::with('permissions')->paginate(10);
        
        return Inertia::render('Roles/Index', [
            'roles' => $roles,
        ]);
    }

    /**
     * Show the form for creating a new role.
     */
    public function create()
    {
        $permissions = Permission::all();
        
        return Inertia::render('Roles/Create', [
            'permissions' => $permissions,
        ]);
    }

    /**
     * Store a newly created role in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:roles,name|max:255',
            'description' => 'nullable|string',
            'permissions' => 'nullable|array',
            'permissions.*' => 'integer|exists:permissions,id',
        ]);

        try {
            $role = Role::create([
                'name' => $validated['name'],
                'description' => $validated['description'] ?? null,
            ]);

            if (!empty($validated['permissions'])) {
                $permissions = Permission::whereIn('id', $validated['permissions'])->get();
                $role->syncPermissions($permissions);
            }

            return redirect()->route('roles.index')
                ->with('success', 'Role created successfully with ' . count($validated['permissions'] ?? []) . ' permissions.');
        } catch (\Exception $e) {
            return back()
                ->withInput()
                ->with('error', 'Failed to create role: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified role.
     */
    public function show(Role $role)
    {
        $role->load('permissions');
        
        return Inertia::render('Roles/Show', [
            'role' => $role,
        ]);
    }

    /**
     * Show the form for editing the specified role.
     */
    public function edit(Role $role)
    {
        $role->load('permissions');
        $allPermissions = Permission::all();
        $rolePermissionIds = $role->permissions->pluck('id')->toArray();

        return Inertia::render('Roles/Edit', [
            'role' => $role,
            'permissions' => $allPermissions,
            'selectedPermissions' => $rolePermissionIds,
        ]);
    }

    /**
     * Update the specified role in storage.
     */
    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:roles,name,' . $role->id . '|max:255',
            'description' => 'nullable|string',
            'permissions' => 'nullable|array',
            'permissions.*' => 'integer|exists:permissions,id',
        ]);

        try {
            $role->update([
                'name' => $validated['name'],
                'description' => $validated['description'] ?? null,
            ]);

            if (isset($validated['permissions'])) {
                $permissions = Permission::whereIn('id', $validated['permissions'])->get();
                $role->syncPermissions($permissions);
            }

            return redirect()->route('roles.index')
                ->with('success', 'Role updated successfully with ' . count($validated['permissions'] ?? []) . ' permissions.');
        } catch (\Exception $e) {
            return back()
                ->withInput()
                ->with('error', 'Failed to update role: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified role from storage.
     */
    public function destroy(Role $role)
    {
        try {
            // Prevent deletion of system roles
            if (in_array($role->name, ['admin', 'super-admin', 'user'])) {
                return back()->with('error', 'Cannot delete system role: ' . $role->name);
            }

            // Check if role is assigned to any users
            $usersWithRole = $role->users()->count();
            if ($usersWithRole > 0) {
                return back()->with('error', 'Cannot delete role assigned to ' . $usersWithRole . ' user(s).');
            }

            $role->delete();

            return redirect()->route('roles.index')
                ->with('success', 'Role deleted successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to delete role: ' . $e->getMessage());
        }
    }

    /**
     * Assign permissions to a role.
     */
    public function assignPermissions(Request $request, Role $role)
    {
        $validated = $request->validate([
            'permissions' => 'nullable|array',
            'permissions.*' => 'integer|exists:permissions,id',
        ]);

        try {
            if (isset($validated['permissions'])) {
                $permissions = Permission::whereIn('id', $validated['permissions'])->get();
                $role->syncPermissions($permissions);
            } else {
                $role->syncPermissions([]);
            }

            return redirect()->back()
                ->with('success', 'Permissions updated for role: ' . $role->name);
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to update permissions: ' . $e->getMessage());
        }
    }

    /**
     * Get all permissions for a role.
     */
    public function getPermissions(Role $role)
    {
        $role->load('permissions');
        $allPermissions = Permission::all();

        return response()->json([
            'role' => $role,
            'permissions' => $allPermissions,
            'selectedPermissions' => $role->permissions->pluck('id'),
        ]);
    }

    /**
     * Display all permissions in the system.
     */
    public function permissionsList()
    {
        $permissions = Permission::all();

        return Inertia::render('Roles/PermissionsList', [
            'permissions' => $permissions,
        ]);
    }
}
