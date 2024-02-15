<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Backend\DashboardController;

Route::get('/',function(){
    return view('Backend.layout');
})->name('admin.login');

Route::get('/register',function(){
    return view('Backend.Layout');
})->middleware('RegistrationGuard');


Route::middleware('auth:sanctum')->group(function(){
    Route::get('/checkAuth',function(){
        return Response()->json([
            'status'        => 200,
            'authorization' => true
        ]);
    });

    Route::prefix('dashboard')->group(function(){
        Route::name('dashboard.')->group(function(){
            Route::get('/',[DashboardController::class, 'dashboard'])->name('dashboard');
        });
    });
});