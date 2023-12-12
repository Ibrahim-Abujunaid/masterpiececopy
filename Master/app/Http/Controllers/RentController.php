<?php

namespace App\Http\Controllers;

use App\Models\Rent;
use App\Models\Car;
use App\Models\User;
use DB;
use Illuminate\Http\Request;
use DateTime;

class RentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rents = Rent::join('cars', 'cars.id', '=', 'rents.car_id')
        ->join('locations','locations.id','=','cars.location_id')
        ->join('brands','brands.id','=','cars.brand_id')
        ->join('users', 'users.id', '=', 'rents.user_id')
        ->select('users.name as renter','rents.start','rents.end','rents.total_price',
        'locations.name as location','cars.img','brands.name as brand','rents.Accept',//'','','','','','','cars.gear',
        DB::raw('(select name from users where id = cars.owner_id) as owner'))->get();
        return response()->json($rents);
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
        // $rent = Rent::all();
        $car=$request->car_id;
        $startDate = $request->start;
        $endDate = $request->end;
    
    $overlappingBookings = Rent::where('car_id', $car)
    ->where(function ($query) use ($startDate, $endDate) {
        $query->where(function ($q) use ($startDate, $endDate) {
            $q->where('start', '>=', $startDate)
                ->where('start', '<', $endDate);
        })->orWhere(function ($q) use ($startDate, $endDate) {
            $q->where('end', '>', $startDate)
                ->where('end', '<=', $endDate);
        })->orWhere(function ($q) use ($startDate, $endDate) {
            $q->where('start', '<=', $startDate)
                ->where('end', '>=', $endDate);
        });
    })->get();
    
    if ($overlappingBookings->isNotEmpty()) {
        return response()->json( ['The selected dates are already booked. Please select different dates.']);
    } else {
        $datetime1=new DateTime($startDate);
        $datetime2=new DateTime($endDate);
        $interval = $datetime1->diff($datetime2);
        $days = $interval->format('%a');
        $oneDayPrice =Car::all()->find($car)->price_day;
        // return response()->json( ['1'=> $oneDayPrice ]);
        $total=($days+1)*$oneDayPrice;
        $rent = new Rent();
        $rent->start= $startDate;
        $rent->end= $endDate;
        $rent->car_id = $car;
        $rent->user_id = $request->user_id;
        $rent->total_price = $total;
        $rent->save();
        return response()->json($rent);
    }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Rent  $rent
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $user=User::find($id);
        
        if ($user->role_id == 2) {
            $rent = Rent::join('cars','cars.id','=','rents.car_id')
            ->join('users', 'users.id', '=', 'rents.user_id')
            ->join('brands','brands.id','=','cars.brand_id')
            ->join('locations','locations.id','=','cars.location_id')
            ->select('rents.id','users.phone','cars.gear', 'cars.fuel_type',
            'locations.name as location','cars.img','brands.name as brand',
            'users.name as renter','rents.start','rents.end','rents.total_price',
            DB::raw('CASE WHEN withDriver = 1 THEN "yes" ELSE "no" END as withDriver'),
            DB::raw('CASE WHEN Accept = 1 THEN "Accepted" ELSE "Pending" END as status'))
            ->where('cars.owner_id',$id)->orderBy("rents.created_at","desc")->get() ;
            // return response()->json(compact('rent'));
        }elseif( $user->role_id == 3) {
            $rent = Rent::where('user_id',$id)
            ->join('cars', 'cars.id', '=', 'rents.car_id')
            ->join('users', 'users.id', '=', 'cars.owner_id')
            ->join('brands','brands.id','=','cars.brand_id') 
            ->join('locations','locations.id','=','cars.location_id')
            ->select('rents.id','users.name as landlord','users.phone','rents.start','rents.end',
            'rents.total_price','cars.gear', 'cars.fuel_type',
            'locations.name as location','cars.img','brands.name as brand',
            DB::raw('CASE WHEN withDriver = 1 THEN "yes" ELSE "no" END as withDriver'),
            DB::raw('CASE WHEN Accept = 1 THEN "Accepted" ELSE "Pending" END as status'))
            ->orderBy("rents.created_at","desc")->get();
        }
        // $rent;
        return response()->json($rent);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Rent  $rent
     * @return \Illuminate\Http\Response
     */
    public function edit(Rent $rent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Rent  $rent
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Rent $rent)
    {
        $rent->update([
            'accept'=>$request->accept
        ]);
        return response()->json($rent);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Rent  $rent
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rent $rent)
    {
        $rent->delete();
        return response()->json('done');
    }
}
