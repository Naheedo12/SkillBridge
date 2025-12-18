<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

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

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
        Route::put('/profile', [AuthController::class, 'updateProfile']);
    });

    Route::middleware('user')->group(function () {
        // routes user 
    });

    // Routes admin
    Route::middleware('admin')->prefix('admin')->group(function () {
        // Gestion des utilisateurs
        Route::get('/users', [App\Http\Controllers\UserController::class, 'index']);
        Route::get('/users/{user}', [App\Http\Controllers\UserController::class, 'show']);
        Route::put('/users/{user}', [App\Http\Controllers\UserController::class, 'update']);
        Route::delete('/users/{user}', [App\Http\Controllers\UserController::class, 'destroy']);
        Route::get('/users-stats', [App\Http\Controllers\UserController::class, 'stats']);
    });
});
