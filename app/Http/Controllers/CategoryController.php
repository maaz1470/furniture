<?php

namespace App\Http\Controllers;

use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function category(){
        return view('Backend.Layout');
    }

    public function add(){
        return view('Backend.Layout');
    }

    public function store(Request $request){
        return Response()->json($request->all());
    }
}
