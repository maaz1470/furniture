<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;


// $prefix = get_admin_url();


Route::prefix('auth')->group(function () {
    Route::name('auth.')->group(function () {
        Route::get('/login', [AuthController::class, 'login'])->name('login');
    });
});

