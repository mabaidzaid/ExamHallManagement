<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'name'         => 'super_admin',
                'display_name' => 'Super Admin',
                'description'  => 'Full access to everything',
                'guard_name'   => 'web',
            ],
            [
                'name'         => 'admin',
                'display_name' => 'Admin',
                'description'  => 'Manage users, exams, rooms',
                'guard_name'   => 'web',
            ],
            [
                'name'         => 'staff',
                'display_name' => 'Staff',
                'description'  => 'Limited access — no teacher evaluation',
                'guard_name'   => 'web',
            ],
            [
                'name'         => 'teacher',
                'display_name' => 'Teacher',
                'description'  => 'View slip, attendance, own exams',
                'guard_name'   => 'web',
            ],
            [
                'name'         => 'student',
                'display_name' => 'Student',
                'description'  => 'View hall ticket slip only',
                'guard_name'   => 'web',
            ],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['name' => $role['name'], 'guard_name' => $role['guard_name']],
                $role
            );
        }
    }
}