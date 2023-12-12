<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RejectController;
use App\Http\Controllers\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\admin\CarController as CarAllController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\RentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/signup', [AuthController::class, 'sign_up']);
Route::post('login', [AuthController::class,'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::resource('cars', CarController::class);
Route::resource('allcars', CarAllController::class);
Route::resource('brands', BrandController::class);
Route::resource('locations', LocationController::class);
Route::resource('drivers', DriverController::class);
Route::resource('reviews', ReviewController::class);
Route::resource('rents', RentController::class);
Route::resource('users', UserController::class);
Route::resource('comments', CommentController::class);
Route::resource('rejects', RejectController::class);
Route::resource('supscribe', EmailController::class);

Route::get('count',[HomeController::class,'index']);
Route::get('Avg/{id}',[ReviewController::class,'average']);