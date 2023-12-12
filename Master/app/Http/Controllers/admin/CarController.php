<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Car;
use DB;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query= Car::query();
        if ($request->status) {
            $query->where('status', $request->status);
        }
        $cars = $query->join('users', 'users.id', '=', 'cars.owner_id')
        ->join('locations','locations.id','=','cars.location_id')
        ->join('brands','brands.id','=','cars.brand_id')
        ->select('cars.id','users.name','locations.name as location',
        'cars.img','brands.name as brand','cars.car_license','cars.gear','cars.fuel_type','cars.status','cars.price_day'
        ,DB::raw('CASE WHEN withDriver = 1 THEN "yes" ELSE "no" END as withDriver'),
        DB::raw('CASE WHEN availability = 1 THEN "fa-check" ELSE "fa-x" END as availability'))
        ->orderBy("cars.created_at","desc")->get();
        // $cars = Car::all();->paginate(10)
        return response()->json($cars);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $cars=Car::where("owner_id",$id)
        ->join('locations','locations.id','=','cars.location_id')
        ->join('brands','brands.id','=','cars.brand_id')
        ->select('cars.id','cars.img','locations.name as location','cars.description','cars.model','cars.price_day',
        'cars.status','brands.name as brand','cars.model','cars.gear','cars.fuel_type','cars.availability',
        DB::raw('CASE WHEN withDriver = 1 THEN "yes" ELSE "no" END as withDriver'))
        ->get();
        return response()->json($cars);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $car= Car::find($id);
        $car->update([ 
           $car->status= $request->status ? $request->status :"Reject"
        ]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
