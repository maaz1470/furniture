<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Backend\PasswordResetController;
use App\Http\Controllers\CategoryController;
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

    Route::prefix('category')->group(function(){
        Route::name('category.')->group(function(){
            Route::get('/',[\App\Http\Controllers\CategoryController::class, 'category'])->name('page');
            Route::get('/add',[CategoryController::class, 'add'])->name('add');
            Route::get('/edit/{id}',[CategoryController::class, 'editCategory'])->name('edit');
        });
    });

    Route::get('hello',function(){
        return view('Backend.Layout');
    });
});
