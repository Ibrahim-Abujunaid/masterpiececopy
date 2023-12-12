<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rent extends Model
{
    use HasFactory;

    protected $fillable = [
        "start","end","user_id","car_id","total_price","accept","","","","",];

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function car(){
        return $this->belongsTo(Car::class);
    }

    public function review(){
        return $this->hasOne(Review::class);
    }
}
