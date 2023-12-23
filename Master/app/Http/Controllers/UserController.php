<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Car;
use Illuminate\Http\Request;
use Hash;
use File;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $r = $request->role_id;
    
        if (!empty($r)) {
            $users = User::where("role_id", $r)
                ->select('id','name', 'img', 'users.phone', 'users.email')
                ->get();
        } else {
            $users = User::where('role_id', '!=', 1)
                ->join('roles', 'roles.id', '=', 'users.role_id')
                ->select('users.id','users.name', 'users.img', 'roles.name as role', 'users.phone', 'users.email')
                ->get();
        }
    
        // Convert users with car count to an array for JSON response
        $response = [];
        foreach ($users as $user) {
            $cars = Car::where('owner_id',$user->id)->count();
            $response[] = [
                'id'=> $user->id,
                'name' => $user->name,
                'img' => $user->img,
                'phone' => $user->phone,
                'email' => $user->email,
                'car_count' => $cars,
            ];
        }
    
        return response()->json($response);
    }
    /**
     * Show the form for creating the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        abort(404);
    }

    /**
     * Store the newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = User::create($request->all());
        return response()->json($user);
    }

    /**
     * Display the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {        
        $user=User::join('roles','roles.id','=','users.role_id')
        ->select('users.name','users.img','roles.name as role','users.phone','users.email')
        ->where('users.id',$id)->get();
        return response()->json($user);
    }

    /**
     * Show the form for editing the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function edit()
    {
        //
    }

    /**
     * Update the resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request , $id)
    {
        $user = User::findOrFail($id);
        
        if ($request-> has('email')&&$user->email!=$request->email){
            $data=$request->validate([ 
                'email' => 'required|string|unique:users,email|email',
            ]);
            $user->email = $data['email'];
        }
        
        if ($request->has('old_password')) {
        $password = $request->input('old_password');
        if ($user && Hash::check($password, $user->password)){
            if ($request->has('password')) {
                $user->password= bcrypt($request->password);
                $Message="pass updated successfully";
            }else{
                $Message="you didn't provide anew pass";
            }
        }else{
          $Message="the provided pass isn't correct";  
        }}else{
            $Message="updated";
        }

        if ($request->hasFile('img')) {
            $image = $request->file('img');
            $extintion= $image->getClientOriginalExtension();
            $imagename = time().'.'.$extintion;
            $request->img->move(public_path('user'), $imagename);
            $old_image_path = public_path('user/'.$user->img);
            if (File::exists($old_image_path)) {
                File::delete($old_image_path);
            }
            $user->img = $imagename;
        }
        
        if ($request-> has('phone')){
            $user->phone=$request->phone;
        }
        
        if ($request-> has('name')){
            $user->name=$request->name;
        }
        $user->update();
        return response()->json($Message);
    }

    /**
     * Remove the resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json("user deleted");
    }
}
