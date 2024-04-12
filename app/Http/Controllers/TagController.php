<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TagController extends Controller
{
    public function layout(){
        return view('Backend.Layout');
    }

    public function addPage(){
        return view('Backend.Layout');
    }
}
