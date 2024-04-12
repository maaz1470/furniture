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
    // Authorization check
    Route::prefix('admin')->group(function(){
        Route::get('/checkAdmin',function(){
            return Response()->json([
                'status'        => 200,
                'authorization' => true
            ]);
        });

        Route::get('/logout',[AdminController::class, 'logout'])->name('admin.logout');
    });
    // Category routes here
    Route::prefix('category')->group(function(){
        Route::name('category.')->group(function(){
            Route::post('/store',[CategoryController::class, 'store'])->name('store');
            Route::get('/all',[CategoryController::class, 'parentCategories'])->name('parentCategories');
            Route::get('/edit/{id}',[CategoryController::class, 'edit'])->name('editCategory');
            Route::get('/parent-category',[CategoryController::class, 'parentCategory'])->name('parent-category');
            Route::post('/updateCategory',[CategoryController::class, 'updateCategory'])->name('updateCategory');
            Route::delete('/deleteCategory/{id}',[CategoryController::class, 'deleteCategory'])->name('deleteCategory');
        });
    });
    // Sub Categories Routes Here
    Route::prefix('sub-category')->group(function(){
        Route::name('subcategory.')->group(function(){
            Route::post('/store',[CategoryController::class, 'subCategoryStore'])->name('store');
            Route::get('/all',[CategoryController::class,'allSubCategory'])->name('all');
            Route::get('/sub-edit/{id}',[CategoryController::class, 'editSubCategory'])->name('edit');
            Route::post('/update',[CategoryController::class, 'updateSubCategory'])->name('update');
            Route::delete('/delete/{id}',[CategoryController::class, 'subCategoryDelete'])->name('delete');
            Route::get('/parent-category',[CategoryController::class, 'subParentCategory'])->name('subParentCategory');
        });
    });

    Route::prefix('sub-sub-category')->group(function(){
        Route::name('subsubcategory.')->group(function(){
            Route::get('/all',[CategoryController::class, 'allSubSubCategory'])->name('all');
            Route::post('/store',[CategoryController::class, 'subSubCategoryStore'])->name('store');
            Route::get('/edit/{id}',[CategoryController::class, 'subSubCategoryEdit'])->name('edit');
            Route::post('/update',[CategoryController::class, 'updateSubSubCategory'])->name('update');
            Route::delete('/delete/{id}',[CategoryController::class, 'deleteSubSubCategory'])->name('delete');
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