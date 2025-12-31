<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CompetenceController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ContactController;

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

// Route publique pour le contact
Route::post('/contact', [ContactController::class, 'sendMessage']);

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

    // Routes pour le chat
    Route::prefix('chat')->group(function () {
        Route::get('/conversations', [\App\Http\Controllers\ChatController::class, 'getConversations']);
        Route::get('/messages/{userId}', [\App\Http\Controllers\ChatController::class, 'getMessages']);
        Route::post('/send', [\App\Http\Controllers\ChatController::class, 'sendMessage']);
        Route::post('/echange', [\App\Http\Controllers\ChatController::class, 'createEchange']);
        Route::post('/echange/{id}/accept', [\App\Http\Controllers\ChatController::class, 'acceptEchange']);
        Route::post('/echange/{id}/refuse', [\App\Http\Controllers\ChatController::class, 'refuseEchange']);
        Route::get('/echange-status/{userId}', [\App\Http\Controllers\ChatController::class, 'getEchangeStatus']);
        Route::get('/mes-achats', [\App\Http\Controllers\ChatController::class, 'getMesAchats']);
        Route::get('/unread-count', [\App\Http\Controllers\ChatController::class, 'getUnreadMessagesCount']);
    });

    // Routes pour les notifications
    Route::prefix('notifications')->group(function () {
        Route::get('/', [NotificationController::class, 'index']);
        Route::get('/unread-count', [NotificationController::class, 'getUnreadCount']);
        Route::put('/{id}/read', [NotificationController::class, 'markAsRead']);
        Route::put('/mark-all-read', [NotificationController::class, 'markAllAsRead']);
        Route::delete('/{id}', [NotificationController::class, 'delete']);
    });

    Route::post('/competences', [CompetenceController::class, 'store']);
    Route::get('/competences/mes-competences', [CompetenceController::class, 'mesCompetences']);
    Route::put('/competences/{id}', [CompetenceController::class, 'update']);
    Route::delete('/competences/{id}', [CompetenceController::class, 'destroy']);
});