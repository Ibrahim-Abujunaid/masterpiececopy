<?php
//in command: php artisan db:seed --class=RolesSeeder
namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        Role::create([
            "name"=> "admin",]);
        
        Role::create([
            "name"=> "landlord",]);

        Role::create([
            "name"=> "renter",]);
            
    }
}
