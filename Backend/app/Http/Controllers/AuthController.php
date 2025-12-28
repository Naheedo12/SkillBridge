<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Inscription d'un nouvel utilisateur
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $user = User::create([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
                'motDePasse' => Hash::make($request->motDePasse),
                'role' => 'Utilisateur',
                'solde_credits' => 10, // Crédits de départ
                'bio' => $request->bio ?? null,
                'photo' => $request->photo ?? null,
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Inscription réussie',
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
                    ],
                    'token' => $token,
                    'token_type' => 'Bearer'
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'inscription',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Connexion d'un utilisateur
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->motDePasse, $user->motDePasse)) {
                throw ValidationException::withMessages([
                    'email' => ['Les identifiants fournis sont incorrects.'],
                ]);
            }

            // Supprimer les anciens tokens
            $user->tokens()->delete();

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Connexion réussie',
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
                    ],
                    'token' => $token,
                    'token_type' => 'Bearer'
                ]
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la connexion',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Déconnexion de l'utilisateur
     */
    public function logout(Request $request): JsonResponse
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'success' => true,
                'message' => 'Déconnexion réussie'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la déconnexion',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtenir les informations de l'utilisateur connecté
     */
    public function me(Request $request): JsonResponse
    {
        try {
            $user = $request->user();

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
                'message' => 'Erreur lors de la récupération du profil',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour le profil de l'utilisateur
     */
    public function updateProfile(Request $request): JsonResponse
    {
        try {
            $user = $request->user();

            $validatedData = $request->validate([
                'nom' => 'sometimes|string|max:255',
                'prenom' => 'sometimes|string|max:255',
                'bio' => 'nullable|string|max:1000',
                'photo' => 'sometimes|string|max:255',
            ]);

            // Nettoyer les données - convertir chaînes vides en null pour bio
            if (isset($validatedData['bio']) && $validatedData['bio'] === '') {
                $validatedData['bio'] = null;
            }

            // Mettre à jour seulement les champs fournis
            $updateData = [];
            if (isset($validatedData['nom'])) {
                $updateData['nom'] = $validatedData['nom'];
            }
            if (isset($validatedData['prenom'])) {
                $updateData['prenom'] = $validatedData['prenom'];
            }
            if (array_key_exists('bio', $validatedData)) {
                $updateData['bio'] = $validatedData['bio'];
            }
            if (isset($validatedData['photo'])) {
                $updateData['photo'] = $validatedData['photo'];
            }

            // Effectuer la mise à jour
            $user->update($updateData);

            // Recharger l'utilisateur depuis la base de données
            $user->refresh();

            return response()->json([
                'success' => true,
                'message' => 'Profil mis à jour avec succès',
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

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour du profil',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}