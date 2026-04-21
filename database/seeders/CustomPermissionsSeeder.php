<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class CustomPermissionsSeeder extends Seeder
{
    public function run()
    {
        $permissions = [
            'view record',
            'download slip',
            'mark attendance',
            'teacher evaluation done or not'
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission, 'web');
        }
    }
}
