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

// Route de test pour déboguer
Route::get('/test-competences', function() {
    $competences = \App\Models\Competence::with('user:id,nom,prenom,photo')->take(3)->get();
    return response()->json([
        'success' => true,
        'count' => $competences->count(),
        'data' => $competences
    ]);
});

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

    // Routes pour les compétences (création, modification, suppression)
    Route::prefix('competences')->group(function () {
        Route::post('/', [CompetenceController::class, 'store']);
        Route::put('/{id}', [CompetenceController::class, 'update']);
        Route::delete('/{id}', [CompetenceController::class, 'destroy']);
        Route::get('/mes-competences', [CompetenceController::class, 'mesCompetences']);
    });
});