<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    /**
     * Récupérer toutes les notifications de l'utilisateur connecté
     */
    public function index(Request $request)
    {
        $userId = Auth::id();
        
        $query = Notification::where('user_id', $userId)
            ->orderBy('created_at', 'desc');
        
        // Filtrer par statut de lecture si spécifié
        if ($request->has('unread_only') && $request->unread_only) {
            $query->where('lu', false);
        }
        
        $notifications = $query->get();
        
        return response()->json([
            'success' => true,
            'data' => $notifications
        ]);
    }

    /**
     * Compter les notifications non lues
     */
    public function getUnreadCount()
    {
        $userId = Auth::id();
        
        $count = Notification::where('user_id', $userId)
            ->where('lu', false)
            ->count();
        
        return response()->json([
            'success' => true,
            'data' => ['count' => $count]
        ]);
    }

    /**
     * Marquer une notification comme lue
     */
    public function markAsRead($id)
    {
        $userId = Auth::id();
        
        $notification = Notification::where('id', $id)
            ->where('user_id', $userId)
            ->first();
        
        if (!$notification) {
            return response()->json([
                'success' => false,
                'message' => 'Notification non trouvée'
            ], 404);
        }
        
        $notification->update(['lu' => true]);
        
        return response()->json([
            'success' => true,
            'message' => 'Notification marquée comme lue'
        ]);
    }

    /**
     * Marquer toutes les notifications comme lues
     */
    public function markAllAsRead()
    {
        $userId = Auth::id();
        
        Notification::where('user_id', $userId)
            ->where('lu', false)
            ->update(['lu' => true]);
        
        return response()->json([
            'success' => true,
            'message' => 'Toutes les notifications ont été marquées comme lues'
        ]);
    }

    /**
     * Supprimer une notification
     */
    public function delete($id)
    {
        $userId = Auth::id();
        
        $notification = Notification::where('id', $id)
            ->where('user_id', $userId)
            ->first();
        
        if (!$notification) {
            return response()->json([
                'success' => false,
                'message' => 'Notification non trouvée'
            ], 404);
        }
        
        $notification->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Notification supprimée'
        ]);
    }

    /**
     * Créer une nouvelle notification
     */
    public static function createNotification($userId, $type, $contenu)
    {
        return Notification::create([
            'user_id' => $userId,
            'type' => $type,
            'contenu' => $contenu,
            'date' => now(),
            'lu' => false
        ]);
    }
}