<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;
    protected $fillable = [
        'img','driver_license','age','user_id','','','','','',];

    public function user(){
        return $this->belongsTo(User::class);
    }

    // public function rents(){
    //     return $this->hasMany(Rent::class);
    // }
}
