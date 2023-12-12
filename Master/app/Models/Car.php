<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;
    protected $fillable = [
        "owner_id","img","car_license","description","price_day",
        "model","withDriver","availability","location_id",
        "status","fuel_type","brand_id","gear",];

    public function type(){
        return $this->belongsTo(Type::class);
    }
    public function owner(){
        return $this->belongsTo(User::class);
    }
    public function brand(){
        return $this->belongsTo(Brand::class);
    }

    public function rents(){
        return $this->hasMany(Rent::class);
    }
    public function location(){
        return $this->belongsTo(Location::class);
    }
    public function comments(){
        return $this->hasMany(Comment::class);
    }
}
