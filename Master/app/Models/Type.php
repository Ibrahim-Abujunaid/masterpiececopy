<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    use HasFactory;

    protected $fillable = [
        "name","seats","doors",];

        public function car(){
            return $this->hasMany(Car::class);
        }
}
