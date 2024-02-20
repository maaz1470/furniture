<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Backend\PasswordResetController;
use Illuminate\Auth\Events\PasswordReset;

Route::prefix('auth')->group(function(){
    Route::get('/login',function(){
        return view('Backend.layout');
    })->name('admin.login');
    
    Route::get('/register',function(){
        return view('Backend.Layout');
    })->middleware('RegistrationGuard');
});


Route::prefix('auth')->group(function(){
    Route::name('admin.reset.')->group(function(){
        Route::get('/reset-password',[PasswordResetController::class, 'forgate_page'])->name('forgate_page');
        Route::get('/reset-password/{token}',[PasswordResetController::class, 'token'])->name('token');
    });
});


Route::middleware(['auth:sanctum','AdminGuard'])->group(function(){
    Route::prefix('dashboard')->group(function(){
        Route::name('dashboard.')->group(function(){
            Route::get('/',[DashboardController::class, 'dashboard'])->name('index');
        });
    });
    Route::get('hello',function(){
        return 'hello Something';
    });
});