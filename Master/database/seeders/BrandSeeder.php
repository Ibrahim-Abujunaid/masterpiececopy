<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Brand;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Brand::create([
            'name' => 'BMW',
        ]);

        Brand::create([
            'name' => 'Mercedes',
        ]);

        Brand::create([
            'name' => 'Ford',
        ]);

        Brand::create([
            'name' => 'Kia',
        ]);

        Brand::create([
            'name' => 'Nissan',
        ]);
    
    }
}
