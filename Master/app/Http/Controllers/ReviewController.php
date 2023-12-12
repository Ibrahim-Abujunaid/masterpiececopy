<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Car;
use App\Models\Rent;
use DB;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
       $reviews = Review::all();
       return response()->json($reviews);
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
        $rent_id = $request->rent_id;
        $rent= Rent::find($rent_id);
        // return response()->json($rent);
        if ($rent->accept==1) {
            $review = Review::updateOrCreate(
                ['rent_id' => $rent_id],
                $request->all());
            return response()->json([$review]);

        }else {
            return response()->json([ 'sorry you only can\'t rate until the landlord accept your rent']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // return response()->json($id);

        $car= Car::where("id", $id)->first();
        // $car= Car::where("id", $request->car_id)->first();
        // $::with("rent");, 'user.*','car.*'
        // $reviews = Review::select('review.*', 'rent.*')
        
            $reviews = Review::join('rents', 'rents.id', '=', 'reviews.rent_id')
                ->join('users', 'users.id', '=', 'rents.user_id')
                ->select('users.name','rents.start','rents.end','reviews.rating','reviews.comment')
                ->where('rents.car_id', $id)->orderBy("reviews.created_at","desc")
                ->get();
        
                // foreach ($reviews as $review) {
                //     $review->user_name ='fff'; // Access user name through relationship
                // },$car
        return response()->json(compact('car','reviews'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function destroy(Review $review)
    {
        $review->delete();
        return response()->json(["deleted"]);
    }
    public function average($id)
    {        
        $review = Review::join('rents', 'rents.id', '=', 'reviews.rent_id')
        ->where('rents.car_id', $id)
        ->select(DB::raw('AVG(reviews.rating) as average_rating'))->get();
        // ->groupBy('rents.car_id')
        return response()->json($review);
    }
}
