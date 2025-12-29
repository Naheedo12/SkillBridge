<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CompetenceController;

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

// Routes publiques pour les compétences (consultation)
Route::get('/competences', [CompetenceController::class, 'index']);
Route::get('/competences/{id}', [CompetenceController::class, 'show']);
Route::get('/competences-stats/categories', [CompetenceController::class, 'getCategoriesStats']);
Route::get('/competences-recent/{limit?}', [CompetenceController::class, 'getRecentCompetences']);
Route::get('/admin-stats', [CompetenceController::class, 'getAdminStats']);
Route::get('/admin-activity', [CompetenceController::class, 'getRecentActivity']);
Route::get('/admin-top-competences', [CompetenceController::class, 'getTopCompetences']);

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
        Route::put('/profile', [AuthController::class, 'updateProfile']);
    });

    // Routes pour les utilisateurs
    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index']); 
        Route::post('/', [UserController::class, 'store']); 
        Route::get('/{id}', [UserController::class, 'show']); 
        Route::put('/{id}', [UserController::class, 'update']); 
        Route::delete('/{id}', [UserController::class, 'destroy']); 
    });

    // Routes pour les compétences - définition explicite
    Route::post('/competences', [CompetenceController::class, 'store']);
    Route::get('/competences/mes-competences', [CompetenceController::class, 'mesCompetences']);
    Route::put('/competences/{id}', [CompetenceController::class, 'update']);
    Route::delete('/competences/{id}', [CompetenceController::class, 'destroy']);
});