<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        // user_id = Sara Khan (UserSeeder mein 5th user)
        $userId = DB::table('users')
            ->where('email', 'sara.student@exam.com')
            ->value('id');

        DB::table('students')->updateOrInsert(
            ['user_id' => $userId],
            [
                'first_name'       => 'Sara',
                'last_name'        => 'Khan',
                'phone'            => '03111234567',
                'address'          => 'House 5, Block B, Lahore',
                'city'             => 'Lahore',
                'state'            => 'Punjab',
                'country'          => 'Pakistan',
                'date_of_birth'    => '2002-05-20',
                'gender'           => 'female',
                'admission_number' => 'ADM-2024-001',
                'admission_date'   => '2024-01-10',
                'cnic'             => '35201-1234567-8',
            ]
        );
    }
}