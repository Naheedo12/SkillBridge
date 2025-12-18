<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    /**
     * Lister tous les utilisateurs (Admin seulement)
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $perPage = $request->get('per_page', 15);
            $search = $request->get('search');

            $query = User::query();

            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('nom', 'like', "%{$search}%")
                      ->orWhere('prenom', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
                });
            }

            $users = $query->orderBy('created_at', 'desc')->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $users
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des utilisateurs',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Afficher un utilisateur spécifique
     */
    public function show(User $user): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'nom' => $user->nom,
                        'prenom' => $user->prenom,
                        'email' => $user->email,
                        'role' => $user->role,
                        'solde_credits' => $user->solde_credits,
                        'photo' => $user->photo,
                        'bio' => $user->bio,
                        'nom_complet' => $user->prenom . ' ' . $user->nom,
                        'created_at' => $user->created_at,
                        'updated_at' => $user->updated_at,
                    ]
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération de l\'utilisateur',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour un utilisateur (Admin seulement)
     */
    public function update(Request $request, User $user): JsonResponse
    {
        try {
            $request->validate([
                'nom' => 'sometimes|string|max:255',
                'prenom' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|unique:users,email,' . $user->id,
                'role' => 'sometimes|in:Utilisateur,Administrateur',
                'solde_credits' => 'sometimes|integer|min:0',
                'bio' => 'sometimes|string|max:1000',
                'photo' => 'sometimes|string|max:255',
            ]);

            $user->update($request->only([
                'nom', 'prenom', 'email', 'role', 'solde_credits', 'bio', 'photo'
            ]));

            return response()->json([
                'success' => true,
                'message' => 'Utilisateur mis à jour avec succès',
                'data' => [
                    'user' => [
                        'id' => $user->id,
                        'nom' => $user->nom,
                        'prenom' => $user->prenom,
                        'email' => $user->email,
                        'role' => $user->role,
                        'solde_credits' => $user->solde_credits,
                        'photo' => $user->photo,
                        'bio' => $user->bio,
                        'nom_complet' => $user->prenom . ' ' . $user->nom,
                    ]
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour de l\'utilisateur',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer un utilisateur (Admin seulement)
     */
    public function destroy(User $user): JsonResponse
    {
        try {
            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'Utilisateur supprimé avec succès'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression de l\'utilisateur',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Statistiques des utilisateurs (Admin seulement)
     */
    public function stats(): JsonResponse
    {
        try {
            $totalUsers = User::count();
            $totalAdmins = User::where('role', 'Administrateur')->count();
            $totalRegularUsers = User::where('role', 'Utilisateur')->count();
            $recentUsers = User::where('created_at', '>=', now()->subDays(7))->count();

            return response()->json([
                'success' => true,
                'data' => [
                    'total_users' => $totalUsers,
                    'total_admins' => $totalAdmins,
                    'total_regular_users' => $totalRegularUsers,
                    'recent_users' => $recentUsers,
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des statistiques',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}