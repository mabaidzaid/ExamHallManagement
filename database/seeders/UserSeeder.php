<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            // Super Admin
            [
                'name'       => 'Super Admin',
                'email'      => 'superadmin@exam.com',
                'password'   => Hash::make('password123'),
                'role'       => 'super_admin',
                'is_active'  => true,
            ],
            // Admin
            [
                'name'       => 'Admin User',
                'email'      => 'admin@exam.com',
                'password'   => Hash::make('password123'),
                'role'       => 'admin',
                'is_active'  => true,
            ],
            // Staff
            [
                'name'       => 'Staff User',
                'email'      => 'staff@exam.com',
                'password'   => Hash::make('password123'),
                'role'       => 'staff',
                'is_active'  => true,
            ],
            // Teacher user (TeacherSeeder will use this)
            [
                'name'       => 'Ahmad Ali',
                'email'      => 'ahmad.teacher@exam.com',
                'password'   => Hash::make('password123'),
                'role'       => 'teacher',
                'is_active'  => true,
            ],
            // Student user (StudentSeeder will use this)
            [
                'name'       => 'Sara Khan',
                'email'      => 'sara.student@exam.com',
                'password'   => Hash::make('password123'),
                'role'       => 'student',
                'is_active'  => true,
            ],
        ];

        foreach ($users as $user) {
            User::updateOrCreate(
                ['email' => $user['email']],
                $user
            );
        }
    }
}