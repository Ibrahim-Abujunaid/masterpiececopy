<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(RolesSeeder::class);
        $this->call([
            RolesSeeder::class,
            BrandSeeder::class,
            LocationSeeder::class,
        ]);
        \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Test Admin',
            'email' => 'admin@example.com',
            'password'=> bcrypt('12345678'),
            'phone'=> '0777777777',
            'role_id'=> 1,
        ]);
    }
}
