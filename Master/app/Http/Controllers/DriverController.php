<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use Illuminate\Http\Request;

class DriverController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $drivers = Driver::join('users', 'users.id', '=', 'drivers.user_id') 
        ->select('users.name','drivers.img','drivers.driver_license','drivers.age','users.phone')
        ->get();
        return response()->json($drivers);
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
        // $driver = Driver::create($request->all());
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

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Driver  $driver
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $driver = Driver::join('users', 'users.id', '=', 'drivers.user_id') 
        ->select('users.name','drivers.img','drivers.age','users.phone')
        ->where('user_id',$id)->get();
        return response()->json($driver);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Driver  $driver
     * @return \Illuminate\Http\Response
     */
    public function edit(Driver $driver)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Driver  $driver
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Driver  $driver
     * @return \Illuminate\Http\Response
     */
    public function destroy(Driver $driver)
    {
        $driver->delete();
        return response()->json(['successfully deleted'],200);
    }
}
