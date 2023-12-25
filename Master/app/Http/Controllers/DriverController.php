<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use Illuminate\Http\Request;

class DriverController extends Controller
{
   //show all driver
    public function index()
    {
        $drivers = Driver::join('users', 'users.id', '=', 'drivers.user_id') 
        ->select('users.name','drivers.img','drivers.driver_license','drivers.age','users.phone')
        ->get();
        return response()->json($drivers);
    }

    public function store(Request $request)
    {
        $userId = $request->user_id;
        
        $driverData = request()->all();

        if ($request->hasFile('img')) {
            $image = $request->file('img');
            $extintion = $image->getClientOriginalExtension();
            $imagename = time() . '.' . $extintion;
            $request->img->move(public_path('driver/img'), $imagename);
            $driverData['img'] = $imagename;
        }
        
        if ($request->hasFile('driver_license')) {
            $license = $request->file('driver_license');
            $extintion= $license->getClientOriginalExtension();
            $imagename = time().'.'.$extintion;
            $request->driver_license->move(public_path('driver/license'), $imagename);
            $driverData['driver_license'] = $imagename;
        }
        Driver::updateOrCreate(
            ['user_id' => $userId],
            $driverData
        );
        return response()->json($driverData);
    }

   //one car
    public function show($id)
    {
        $driver = Driver::join('users', 'users.id', '=', 'drivers.user_id') 
        ->select('users.name','drivers.img','drivers.age','users.phone')
        ->where('user_id',$id)->get();
        return response()->json($driver);
    }

   
    public function update(Request $request, Driver $driver)
    {
        if ($request->hasFile('img')) {
            $image = $request->file('img');
            $extintion= $image->getClientOriginalExtension();
            $imagename = time().'.'.$extintion;
            $request->img->move(public_path('driver/img'), $imagename);
            $driver->img = $imagename;
        }
        if ($request->hasFile('driver_license')) {
            $license = $request->file('driver_license');
            $extintion= $license->getClientOriginalExtension();
            $imagename = time().'.'.$extintion;
            $request->driver_license->move(public_path('car/license'), $imagename);
            $driver->driver_license = $imagename;
        }
        $driver->update($request->all());
        return response()->json($driver);
    }

    public function destroy(Driver $driver)
    {
        $driver->delete();
        return response()->json(['successfully deleted'],200);
    }
}
