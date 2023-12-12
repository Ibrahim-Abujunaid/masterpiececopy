<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;



class AuthController extends Controller
{
    public function sign_up(Request $request){
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'phone'=> 'required',
            'password' => 'required|string',
            'role_id'=> 'required'
        ]);
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'phone'=> $data['phone'],     
            'role_id'=> $data['role_id']
        ]);
        $token = $user->createToken('apiToken')->plainTextToken;

            $res = [
                'user' => $user,
                'token' => $token
            ];
            return response()->json($res, 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
        $user = Auth::user();
        $token = $user->createToken('sanctum-token')->plainTextToken;;

        $res = [
            'user' => $user,
            'token' => $token
        ];
        return response()->json($res, 201);
        } else {
            return response()->json("Your provided credentials do not match in our records.");
           
        }

    }

    public function logout()
    {
        if (auth()->user()) {
            Auth::logout();
            auth()->user()->tokens()->delete();
            return [
                'message' => 'user logged out'
            ];
        } else {
            return [
                'message' => 'User is not logged in'
            ];
        }
    }
}
