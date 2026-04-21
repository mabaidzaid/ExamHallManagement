<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeacherSeeder extends Seeder
{
    public function run(): void
    {
        // user_id 4 = Ahmad Ali (UserSeeder mein 4th user)
        $userId = DB::table('users')
            ->where('email', 'ahmad.teacher@exam.com')
            ->value('id');

        DB::table('teachers')->updateOrInsert(
            ['user_id' => $userId],
            [
                'department'     => 'Computer Science',
                'designation'    => 'Lecturer',
                'qualification'  => 'MS Computer Science',
                'experience'     => '5 Years',
                'contact_number' => '03001234567',
                'email'          => 'ahmad.teacher@exam.com',
                'address'        => 'House 12, Street 4, Lahore',
                'city'           => 'Lahore',
                'state'          => 'Punjab',
                'country'        => 'Pakistan',
                'gender'         => 'male',
                'joining_date'   => '2020-01-15',
                'status'         => 'active',
            ]
        );
    }
}