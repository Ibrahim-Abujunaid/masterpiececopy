<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Rent;
use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(){
        $cars = Car::where('cars.status', 'Accept')->where('cars.availability', 1)->count();
        $carsWithDriver = Car::where('withDriver', 1)->where('cars.status', 'Accept')->where('cars.availability', 1)        ->count();
        $client= Rent::count();

        return response()->json(['Cars'=>$cars,'CarWithDriver'=>$carsWithDriver,'Client'=>$client]) ;
    }
}
