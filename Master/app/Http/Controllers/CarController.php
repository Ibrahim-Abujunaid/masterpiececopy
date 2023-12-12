<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Rent;
use App\Models\User;
use Illuminate\Http\Request;
use DateTime;
use DateInterval;
use DatePeriod;


class CarController extends Controller
{
  
    public function index(Request $request)
    {
        $query= Car::query();
        
        if ($request->has('gear')) {
            $query->whereIn('gear', $request->gear);
        }
        if ($request->has('fuel_type')) {
            $query->whereIn('cars.fuel_type', $request->fuel_type);
        }
        if ($request->has('locations')) {
            $query->whereIn('cars.location_id', $request->locations);
        }       
        if ($request->has('brands')) {
            $query->whereIn('cars.brand_id', $request->brands);
        }
        if ($request->has('search')) {
            $query->where(function ($query) use ($request) {
            $query->where('users.name', 'LIKE', '%' . $request->search . '%')
            ->orWhere('brands.name','LIKE', '%' . $request->search . '%');
            });
          }
        if (request()->filled('price')) {
            list($min, $max) = explode(",", $request->price);
            if ( !empty($max)) {
            $query->whereBetween("price_day", [$min, $max]);}
            else{
                $max=$query->max("price_day");
                $query->whereBetween("price_day", [$min, $max]);
            }
        }


        $orderBy=$request->order_by;
        switch ($orderBy) {
            case 'low_price':
                $query->orderBy('price_day');
                break;
            case 'high_price':
                $query->orderBy('price_day','desc');
                break;
                
            default:
                $query->orderBy('cars.created_at','desc');
        }

        $cars = $query->join('users', 'users.id', '=', 'cars.owner_id')
        ->join('locations','locations.id','=','cars.location_id')
        ->join('brands','brands.id','=','cars.brand_id')
        ->select('cars.id','users.name','locations.name as location','cars.price_day',
        'cars.img','brands.name as brand','cars.model','cars.gear','cars.fuel_type','cars.withDriver')
        ->where('cars.availability', 1)
        ->where('withDriver', $request->withDriver)
        ->where('cars.status', 'Accept')
        ->get();


        return response()->json($cars);
    }

    public function store(Request $request)
    {
        $c=Car::where('owner_id',$request->owner_id)->where('withDriver', 1)->get();
        $isRentee = User::where('id', $request->owner_id)->first()->role_id;
        
        if ($isRentee != 2) {
            return response()->json(["sorry you are not a rentee you can't add acar"]);
        }elseif ($request->withDriver && $c->count() > 0) {
            return response()->json(["sorry you can't add acar with driver more than once",$c]);  
        }else{
        $car = Car::create($request->all());
        if ($request->hasFile('img')) {
            $image = $request->file('img');
            $extintion= $image->getClientOriginalExtension();
            $imagename = time().'.'.$extintion;
            $request->img->move(public_path('car/img'), $imagename);
            $car->img = $imagename;
        }
        if ($request->hasFile('car_license')) {
            $license = $request->file('car_license');
            $extintion= $license->getClientOriginalExtension();
            $imagename = time().'.'.$extintion;
            $request->car_license->move(public_path('car/license'), $imagename);
            $car->car_license = $imagename;
        }
            $car->update();

        return response()->json(["added",$car]);}
    }

    
    public function show($id)
    {
        $car=Car::where('cars.id',$id)
        ->join('locations','locations.id','=','cars.location_id')
        ->join('brands','brands.id','=','cars.brand_id')
        ->join('users', 'users.id', '=', 'cars.owner_id')
        ->select('cars.id','cars.img','locations.name as location','cars.owner_id'
        ,'users.name','cars.description','cars.model','cars.price_day',
        'brands.name as brand','cars.model','cars.gear','cars.fuel_type')
        ->get();
        $bookedDates = [];
        $rents=Rent::where('car_id',$id)->get();
        foreach ($rents as $rent) {
            
        $startDate = new DateTime($rent->start);
        $endDate = new DateTime($rent->end);
        $endDate->modify('+1 day');
    
        $interval = new DateInterval('P1D'); // 1 day interval
        $dateRange = new DatePeriod($startDate, $interval, $endDate);
    
        // Convert the date range to an array of date strings
        foreach ($dateRange as $date) {
            $bookedDates[] = $date->format('Y-m-d');
        }
    }
        // $rents=Rent::with("review")->where("car_id","=", $car->id)->get();
        return response()->json(compact('car','bookedDates'));
    }

    
  
    public function update(Request $request, Car $car)
    {
        $car->update($request->all());
        if ($request->hasFile('img')) {
            $image = $request->file('img');
            $extintion= $image->getClientOriginalExtension();
            $imagename = time().'.'.$extintion;
            $request->img->move(public_path('car/img'), $imagename);
            $car->img = $imagename;
        }
        if ($request->hasFile('car_license')) {
            $license = $request->file('car_license');
            $extintion= $license->getClientOriginalExtension();
            $imagename = time().'.'.$extintion;
            $request->car_license->move(public_path('car/license'), $imagename);
            $car->car_license = $imagename;
        }
        $car->update();
        return response()->json(["done",$car]);
    }

 
    public function destroy(Car $car)
    {
        $car->delete();
        return response()->json(["deleted"]);
    }
}
