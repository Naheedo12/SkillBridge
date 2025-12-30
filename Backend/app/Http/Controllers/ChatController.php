<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Echange;
use App\Models\User;
use App\Models\Competence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    public function getConversations()
    {
        $userId = Auth::id();
        
        $conversations = Message::where('expediteur_id', $userId)
            ->orWhere('destinataire_id', $userId)
            ->with(['expediteur:id,nom,prenom,photo', 'destinataire:id,nom,prenom,photo'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy(function ($message) use ($userId) {
                return $message->expediteur_id == $userId ? $message->destinataire_id : $message->expediteur_id;
            })
            ->map(function ($messages) use ($userId) {
                $lastMessage = $messages->first();
                $otherUser = $lastMessage->expediteur_id == $userId ? $lastMessage->destinataire : $lastMessage->expediteur;
                
                return [
                    'user' => $otherUser,
                    'lastMessage' => $lastMessage->contenu,
                    'lastMessageDate' => $lastMessage->created_at,
                    'unreadCount' => $messages->where('destinataire_id', $userId)->where('lu', false)->count()
                ];
            })
            ->values();

        return response()->json([
            'success' => true,
            'data' => $conversations
        ]);
    }

    public function getMessages($userId)
    {
        $currentUserId = Auth::id();
        
        $messages = Message::where(function ($query) use ($currentUserId, $userId) {
            $query->where('expediteur_id', $currentUserId)->where('destinataire_id', $userId);
        })->orWhere(function ($query) use ($currentUserId, $userId) {
            $query->where('expediteur_id', $userId)->where('destinataire_id', $currentUserId);
        })
        ->with(['expediteur:id,nom,prenom,photo'])
        ->orderBy('created_at', 'asc')
        ->get();

        // Marquer les messages comme lus
        Message::where('expediteur_id', $userId)
            ->where('destinataire_id', $currentUserId)
            ->where('lu', false)
            ->update(['lu' => true]);

        return response()->json([
            'success' => true,
            'data' => $messages
        ]);
    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'destinataire_id' => 'required|exists:users,id',
            'contenu' => 'required|string|max:1000'
        ]);

        $message = Message::create([
            'expediteur_id' => Auth::id(),
            'destinataire_id' => $request->destinataire_id,
            'contenu' => $request->contenu,
            'date' => now(),
            'lu' => false
        ]);

        $message->load('expediteur:id,nom,prenom,photo');

        return response()->json([
            'success' => true,
            'data' => $message
        ]);
    }

    public function createEchange(Request $request)
    {
        try {
            // Vérifier l'authentification
            if (!Auth::check()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Utilisateur non authentifié'
                ], 401);
            }

            // Validation des données
            $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
                'competence_id' => 'required|integer|exists:competences,id',
                'user_enseignant_id' => 'required|integer|exists:users,id'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Données invalides',
                    'errors' => $validator->errors(),
                    'received_data' => $request->all()
                ], 422);
            }

            $apprenant = Auth::user();
            
            // Vérifier que l'utilisateur a assez de crédits
            if ($apprenant->solde_credits < 2) {
                return response()->json([
                    'success' => false,
                    'message' => 'Crédits insuffisants. Vous avez ' . $apprenant->solde_credits . ' crédits, il en faut 2.'
                ], 400);
            }

            // Vérifier que l'utilisateur ne crée pas un échange avec lui-même
            if ($apprenant->id == $request->user_enseignant_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Vous ne pouvez pas créer un échange avec vous-même'
                ], 400);
            }

            // Vérifier qu'il n'y a pas déjà un échange en cours pour cette compétence
            $existingEchange = Echange::where('user_apprenant_id', $apprenant->id)
                ->where('competence_id', $request->competence_id)
                ->where('statut', 'en_attente')
                ->first();

            if ($existingEchange) {
                return response()->json([
                    'success' => false,
                    'message' => 'Vous avez déjà un échange en attente pour cette compétence'
                ], 400);
            }

            // Créer l'échange et déduire les crédits immédiatement
            DB::transaction(function () use ($request, $apprenant, &$echange) {
                $echange = Echange::create([
                    'user_apprenant_id' => $apprenant->id,
                    'user_enseignant_id' => $request->user_enseignant_id,
                    'competence_id' => $request->competence_id,
                    'statut' => 'en_attente',
                    'credits' => 2,
                    'date' => now()->toDateString()
                ]);

                // Déduire les crédits immédiatement lors de la création
                $apprenant->decrement('solde_credits', 2);
            });

            // Charger les relations pour la réponse
            $echange->load(['apprenant:id,nom,prenom', 'enseignant:id,nom,prenom', 'competence:id,titre']);

            return response()->json([
                'success' => true,
                'data' => $echange,
                'message' => 'Échange créé avec succès'
            ]);
            
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de l\'échange',
                'error' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => basename($e->getFile())
            ], 500);
        }
    }

    public function acceptEchange($echangeId)
    {
        $echange = Echange::findOrFail($echangeId);
        
        if ($echange->user_enseignant_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Non autorisé'
            ], 403);
        }

        DB::transaction(function () use ($echange) {
            $echange->update(['statut' => 'accepte']);
            
            // Ajouter les crédits à l'enseignant (les crédits ont déjà été déduits de l'apprenant)
            $echange->enseignant->increment('solde_credits', 2);
        });

        return response()->json([
            'success' => true,
            'message' => 'Échange accepté'
        ]);
    }

    public function refuseEchange($echangeId)
    {
        $echange = Echange::findOrFail($echangeId);
        
        if ($echange->user_enseignant_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Non autorisé'
            ], 403);
        }

        DB::transaction(function () use ($echange) {
            $echange->update(['statut' => 'refuse']);
            
            // Rembourser les crédits à l'apprenant si l'échange est refusé
            $echange->apprenant->increment('solde_credits', 2);
        });

        return response()->json([
            'success' => true,
            'message' => 'Échange refusé'
        ]);
    }

    public function getEchangeStatus($userId)
    {
        $echange = Echange::where(function ($query) use ($userId) {
            $query->where('user_apprenant_id', Auth::id())
                  ->where('user_enseignant_id', $userId);
        })->orWhere(function ($query) use ($userId) {
            $query->where('user_apprenant_id', $userId)
                  ->where('user_enseignant_id', Auth::id());
        })
        ->latest()
        ->first();

        return response()->json([
            'success' => true,
            'data' => $echange
        ]);
    }

    public function getMesAchats()
    {
        $achats = Echange::where('user_apprenant_id', Auth::id())
            ->with(['competence', 'enseignant:id,nom,prenom,photo'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $achats
        ]);
    }

    public function getUnreadMessagesCount()
    {
        try {
            $count = Message::where('destinataire_id', Auth::id())
                ->where('lu', false)
                ->count();

            return response()->json([
                'success' => true,
                'data' => ['count' => $count]
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors du comptage des messages',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}