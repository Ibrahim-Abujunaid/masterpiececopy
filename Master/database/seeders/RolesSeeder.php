<?php
//in command: php artisan db:seed --class=RolesSeeder
namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // DB::table('roles')->truncate();

        // $roles = [
        //     ['name' => 'admin'],
        //     ['name' => 'rentee'],
        //     ['name' => 'renter'],
        // ];

        // DB::table('roles')->insert($roles);

        Role::create([
            "name"=> "admin",]);
        
        Role::create([
            "name"=> "landlord",]);

        Role::create([
            "name"=> "renter",]);
            
    }
}
