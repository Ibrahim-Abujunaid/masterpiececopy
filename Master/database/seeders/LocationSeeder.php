<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Location;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Location::create([
            "name"=> "Amman",]);
        Location::create([
            "name"=> "Irbid",]);
        Location::create([
            "name"=> "Zarqa'a",]);
        Location::create([
            "name"=> "Aqaba",]);
        Location::create([
            "name"=> "Salt",]);
    }
}
