<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function category(){
        return view('Backend.Layout');
    }

    public function add(){
        return view('Backend.Layout');
    }
}
