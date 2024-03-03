<?php

use App\Http\Controllers\Backend\AdminController;
use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::prefix('admin')->group(function(){
    Route::name('admin.')->group(function(){
        Route::post('/register',[AdminController::class, 'register'])->name('register');
        Route::get('/countAdmin',[AdminController::class, 'countAdmin'])->name('countAdmin');
        Route::post('/login',[AdminController::class, 'login'])->name('login');
    });
});


Route::middleware(['auth:sanctum','AdminGuard'])->group(function(){
    Route::prefix('admin')->group(function(){
        Route::get('/checkAdmin',function(){
            return Response()->json([
                'status'        => 200,
                'authorization' => true
            ]);
        });
    });

    Route::prefix('category')->group(function(){
        Route::name('category.')->group(function(){
            Route::post('/store',[CategoryController::class, 'store'])->name('store');
            Route::get('/all',[CategoryController::class, 'all'])->name('all');
        });
    });
});

// Reset Api Route
Route::prefix('auth/reset')->group(function(){
    Route::name('admin.reset')->group(function(){
        Route::post('/send-reset-link',[AdminController::class, 'send_reset_link'])->name('send_reset_link');
        Route::post('/reset-password',[AdminController::class, 'resetPassword'])->name('resetPassword');
        Route::post('/change-password',[AdminController::class, 'changePassword'])->name('changePassword');
    });
});