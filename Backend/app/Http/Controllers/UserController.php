<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Afficher tous les utilisateurs (Admin seulement)
     */
    public function index(Request $request): JsonResponse
    {
        try {
            // Vérifier que l'utilisateur est admin
            if (!$request->user()->isAdministrateur()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Accès non autorisé'
                ], 403);
            }

            $users = User::select([
                'id', 'nom', 'prenom', 'email', 'role', 
                'solde_credits', 'bio', 'created_at'
            ])->orderBy('created_at', 'desc')->get();

            return response()->json([
                'success' => true,
                'data' => $users->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'nom' => $user->nom,
                        'prenom' => $user->prenom,
                        'email' => $user->email,
                        'role' => $user->role,
                        'solde_credits' => $user->solde_credits,
                        'bio' => $user->bio,
                        'nom_complet' => $user->prenom . ' ' . $user->nom,
                        'created_at' => $user->created_at,
                    ];
                })
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
    public function show(Request $request, $id): JsonResponse
    {
        try {
            $currentUser = $request->user();
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Utilisateur non trouvé'
                ], 404);
            }

            // Admin peut voir tous les détails, utilisateur normal peut voir les profils publics
            $userData = [
                'id' => $user->id,
                'nom' => $user->nom,
                'prenom' => $user->prenom,
                'email' => $user->email,
                'bio' => $user->bio,
                'nom_complet' => $user->prenom . ' ' . $user->nom,
                'created_at' => $user->created_at,
            ];

            // Ajouter des infos supplémentaires pour l'admin ou le propriétaire du profil
            if ($currentUser->isAdministrateur() || $currentUser->id == $user->id) {
                $userData['role'] = $user->role;
                $userData['solde_credits'] = $user->solde_credits;
            }

            return response()->json([
                'success' => true,
                'data' => $userData
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
     * Créer un nouvel utilisateur (Admin seulement)
     */
    public function store(Request $request): JsonResponse
    {
        try {
            // Vérifier que l'utilisateur est admin
            if (!$request->user()->isAdministrateur()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Accès non autorisé'
                ], 403);
            }

            $request->validate([
                'nom' => 'required|string|max:255',
                'prenom' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'motDePasse' => 'required|string|min:8',
                'role' => 'required|in:Utilisateur,Administrateur',
                'solde_credits' => 'sometimes|integer|min:0',
                'bio' => 'nullable|string|max:1000',
            ]);

            // Nettoyer les données avant création
            $cleanData = [
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
                'motDePasse' => Hash::make($request->motDePasse),
                'role' => $request->role,
                'solde_credits' => $request->solde_credits ?? 10,
                'bio' => $request->bio === '' ? null : $request->bio,
            ];

            $user = User::create($cleanData);

            return response()->json([
                'success' => true,
                'message' => 'Utilisateur créé avec succès',
                'data' => [
                    'id' => $user->id,
                    'nom' => $user->nom,
                    'prenom' => $user->prenom,
                    'email' => $user->email,
                    'role' => $user->role,
                    'solde_credits' => $user->solde_credits,
                    'bio' => $user->bio,
                    'nom_complet' => $user->prenom . ' ' . $user->nom,
                    'created_at' => $user->created_at,
                ]
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de l\'utilisateur',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour un utilisateur
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $currentUser = $request->user();
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Utilisateur non trouvé'
                ], 404);
            }

            // Seul l'admin ou le propriétaire du profil peut modifier
            if (!$currentUser->isAdministrateur() && $currentUser->id != $user->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Accès non autorisé'
                ], 403);
            }

            $rules = [
                'nom' => 'sometimes|string|max:255',
                'prenom' => 'sometimes|string|max:255',
                'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
                'bio' => 'nullable|string|max:1000',
            ];

            // Seul l'admin peut modifier le rôle et les crédits
            if ($currentUser->isAdministrateur()) {
                $rules['role'] = 'sometimes|in:Utilisateur,Administrateur';
                $rules['solde_credits'] = 'sometimes|integer|min:0';
                $rules['motDePasse'] = 'sometimes|string|min:8';
            }

            $request->validate($rules);

            $updateData = $request->only(['nom', 'prenom', 'email']);
            
            // Gérer le champ bio (convertir chaîne vide en null)
            if ($request->has('bio')) {
                $updateData['bio'] = $request->bio === '' ? null : $request->bio;
            }

            // Ajouter les champs admin si autorisé
            if ($currentUser->isAdministrateur()) {
                if ($request->has('role')) {
                    $updateData['role'] = $request->role;
                }
                if ($request->has('solde_credits')) {
                    $updateData['solde_credits'] = $request->solde_credits;
                }
                if ($request->has('motDePasse') && $request->motDePasse !== '') {
                    $updateData['motDePasse'] = Hash::make($request->motDePasse);
                }
            }

            $user->update($updateData);

            return response()->json([
                'success' => true,
                'message' => 'Utilisateur mis à jour avec succès',
                'data' => [
                    'id' => $user->id,
                    'nom' => $user->nom,
                    'prenom' => $user->prenom,
                    'email' => $user->email,
                    'role' => $user->role,
                    'solde_credits' => $user->solde_credits,
                    'bio' => $user->bio,
                    'nom_complet' => $user->prenom . ' ' . $user->nom,
                    'created_at' => $user->created_at,
                ]
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
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
    public function destroy(Request $request, $id): JsonResponse
    {
        try {
            // Vérifier que l'utilisateur est admin
            if (!$request->user()->isAdministrateur()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Accès non autorisé'
                ], 403);
            }

            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Utilisateur non trouvé'
                ], 404);
            }

            // Empêcher la suppression de son propre compte
            if ($request->user()->id == $user->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Vous ne pouvez pas supprimer votre propre compte'
                ], 400);
            }

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
}