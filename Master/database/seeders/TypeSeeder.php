<?php
//php artisan db:seed --class=TypeSeeder
namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Type;

class TypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Type::create([
            'name' => 'Sedan',
            'seats' => 5,
            'doors' => 4,
        ]);

        Type::create([
            'name' => 'SUV',
            'seats' => 5,
            'doors' => 5,
        ]);

        Type::create([
            'name' => 'Truck',
            'seats' => 3,
            'doors' => 2,
        ]);

        Type::create([
            'name' => 'Van',
            'seats' => 8,
            'doors' => 3,
        ]);

        Type::create([
            'name' => 'Motorcycle',
            'seats' => 2,
            'doors' => 0,
        ]);
    }
}
