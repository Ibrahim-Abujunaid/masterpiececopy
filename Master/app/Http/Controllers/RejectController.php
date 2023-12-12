<?php

namespace App\Http\Controllers;

use App\Models\Reject;
use App\Models\Rent;
use DB;
use Illuminate\Http\Request;

class RejectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $rent=Rent::find($request->id);
        
        $reject=Reject::create([
            'start'=> $rent->start,
            'end'=> $rent->end,
            'user_id'=> $rent->user_id,
            'car_id'=> $rent->car_id
        ]);
        app('App\Http\Controllers\RentController')->destroy($rent);
        return response()->json($reject);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Reject  $reject
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $reject=Reject::where('user_id',$id)
        ->join('cars', 'cars.id', '=', 'rejects.car_id')
        ->join('users', 'users.id', '=', 'cars.owner_id')
        ->join('brands','brands.id','=','cars.brand_id') 
        ->join('locations','locations.id','=','cars.location_id')
        ->select('rejects.id','users.name as landlord','users.phone','rejects.start','rejects.end',
        'cars.gear', 'cars.fuel_type','locations.name as location','cars.img','brands.name as brand',
        DB::raw('CASE WHEN withDriver = 1 THEN "yes" ELSE "no" END as withDriver')
        ,DB::raw('CASE WHEN rejects.end > NOW() THEN "Rejected" ELSE "--" END as status'),)
        ->orderBy("rejects.created_at","desc")->get();
        return response()->json($reject);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Reject  $reject
     * @return \Illuminate\Http\Response
     */
    public function edit(Reject $reject)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Reject  $reject
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Reject $reject)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reject  $reject
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reject $reject)
    {
        $reject->delete();
        return response()->json("deleted");
    }
}
