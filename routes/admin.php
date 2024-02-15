<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;



Route::get('/',function(){
    return view('Backend.layout');
})->name('admin.login');



Route::get('/register',function(){
    return view('Backend.Layout');
})->middleware('RegistrationGuard');
