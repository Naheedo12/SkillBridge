<?php

namespace App\Http\Controllers;

use App\Models\Competence;
use App\Http\Requests\StoreCompetenceRequest;
use App\Http\Requests\UpdateCompetenceRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class CompetenceController extends Controller
{
    /**
     * Afficher toutes les compétences avec filtres et pagination
     */
    public function index(Request $request)
    {
        try {
            \Log::info('=== DÉBUT REQUÊTE COMPÉTENCES ===');
            \Log::info('Paramètres reçus:', $request->all());
            
            $query = Competence::with('user:id,nom,prenom,photo')
                ->orderBy('created_at', 'desc');

            // Filtrage par recherche
            if ($request->has('search') && !empty($request->search)) {
                $searchTerm = $request->search;
                \Log::info('Filtrage par recherche: ' . $searchTerm);
                $query->where(function($q) use ($searchTerm) {
                    $q->where('titre', 'like', '%' . $searchTerm . '%')
                      ->orWhere('description', 'like', '%' . $searchTerm . '%')
                      ->orWhere('categorie', 'like', '%' . $searchTerm . '%');
                });
            }

            // Filtrage par catégorie
            if ($request->has('category') && !empty($request->category) && $request->category !== 'Toutes catégories') {
                \Log::info('Filtrage par catégorie: ' . $request->category);
                $query->where('categorie', $request->category);
            }

            // Filtrage par niveau
            if ($request->has('level') && !empty($request->level) && $request->level !== 'Tous niveaux') {
                \Log::info('Filtrage par niveau: ' . $request->level);
                
                // Mapper les niveaux français vers les valeurs de la base de données
                $levelMap = [
                    'Débutant' => 'debutant',
                    'Intermédiaire' => 'intermediaire',
                    'Avancé' => 'avance',
                    'Expert' => 'expert'
                ];
                
                $level = $levelMap[$request->level] ?? $request->level;
                \Log::info('Niveau mappé: ' . $level);
                $query->where('niveau', $level);
            }

            // Filtrage par disponibilité (optionnel)
            if ($request->has('disponible')) {
                \Log::info('Filtrage par disponibilité: ' . $request->boolean('disponible'));
                $query->where('disponibilite', $request->boolean('disponible'));
            }

            \Log::info('SQL généré: ' . $query->toSql());
            \Log::info('Bindings: ', $query->getBindings());

            // Pagination
            $perPage = $request->get('per_page', 9); // 9 par défaut pour 3x3 grid
            $competences = $query->paginate($perPage);

            \Log::info('Nombre de compétences trouvées: ' . $competences->total());

            return response()->json([
                'success' => true,
                'data' => $competences,
                'message' => 'Compétences récupérées avec succès'
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Erreur dans index:', ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des compétences',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Afficher une compétence spécifique
     */
    public function show($id)
    {
        try {
            $competence = Competence::with('user:id,nom,prenom,photo,bio')
                ->find($id);

            if (!$competence) {
                return response()->json([
                    'success' => false,
                    'message' => 'Compétence non trouvée'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $competence,
                'message' => 'Compétence récupérée avec succès'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération de la compétence',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Créer une nouvelle compétence
     */
    public function store(StoreCompetenceRequest $request)
    {
        try {
            \Log::info('Début création compétence', ['user_id' => Auth::id()]);
            \Log::info('Données reçues', $request->all());
            
            $data = $request->validated();
            $data['user_id'] = Auth::id();

            \Log::info('Données validées', $data);

            // Upload image vers Cloudinary si présente et si Cloudinary est configuré
            if ($request->hasFile('image')) {
                \Log::info('Image détectée, tentative upload vers Cloudinary');
                
                try {
                    // Vérifier si Cloudinary est configuré
                    if (config('cloudinary.cloud_url')) {
                        $uploadedFileUrl = Cloudinary::upload($request->file('image')->getRealPath(), [
                            'folder' => 'competences',
                            'transformation' => [
                                'width' => 800,
                                'height' => 600,
                                'crop' => 'fill',
                                'quality' => 'auto'
                            ]
                        ])->getSecurePath();
                        
                        $data['image'] = $uploadedFileUrl;
                        \Log::info('Image uploadée vers Cloudinary', ['url' => $uploadedFileUrl]);
                    } else {
                        \Log::warning('Cloudinary non configuré, image ignorée');
                        // Ne pas inclure l'image si Cloudinary n'est pas configuré
                        unset($data['image']);
                    }
                } catch (\Exception $cloudinaryError) {
                    \Log::error('Erreur upload Cloudinary', [
                        'error' => $cloudinaryError->getMessage(),
                        'file' => $cloudinaryError->getFile(),
                        'line' => $cloudinaryError->getLine()
                    ]);
                    
                    // Continuer sans image si Cloudinary échoue
                    unset($data['image']);
                    \Log::info('Création de compétence sans image suite à erreur Cloudinary');
                }
            }

            \Log::info('Création en base de données');
            $competence = Competence::create($data);
            $competence->load('user:id,nom,prenom,photo');

            \Log::info('Compétence créée avec succès', ['id' => $competence->id]);

            return response()->json([
                'success' => true,
                'data' => $competence,
                'message' => 'Compétence créée avec succès'
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Erreur création compétence', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de la compétence',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Modifier une compétence
     */
    public function update(UpdateCompetenceRequest $request, $id)
    {
        try {
            $competence = Competence::findOrFail($id);
            
            // Vérifier les permissions
            if (!Auth::user()->isAdministrateur() && $competence->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Vous n\'avez pas l\'autorisation de modifier cette compétence'
                ], 403);
            }

            $data = $request->validated();

            // Upload nouvelle image vers Cloudinary si présente et si Cloudinary est configuré
            if ($request->hasFile('image')) {
                try {
                    // Vérifier si Cloudinary est configuré
                    if (config('cloudinary.cloud_url')) {
                        $uploadedFileUrl = Cloudinary::upload($request->file('image')->getRealPath(), [
                            'folder' => 'competences',
                            'transformation' => [
                                'width' => 800,
                                'height' => 600,
                                'crop' => 'fill',
                                'quality' => 'auto'
                            ]
                        ])->getSecurePath();
                        
                        $data['image'] = $uploadedFileUrl;
                    } else {
                        // Ne pas inclure l'image si Cloudinary n'est pas configuré
                        unset($data['image']);
                    }
                } catch (\Exception $cloudinaryError) {
                    \Log::error('Erreur upload Cloudinary lors de la modification', [
                        'error' => $cloudinaryError->getMessage()
                    ]);
                    
                    // Continuer sans modifier l'image si Cloudinary échoue
                    unset($data['image']);
                }
            }

            $competence->update($data);
            $competence->load('user:id,nom,prenom,photo');

            return response()->json([
                'success' => true,
                'data' => $competence,
                'message' => 'Compétence modifiée avec succès'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la modification de la compétence',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer une compétence
     */
    public function destroy($id)
    {
        try {
            $competence = Competence::findOrFail($id);
            
            // Vérifier les permissions
            if (!Auth::user()->isAdministrateur() && $competence->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Vous n\'avez pas l\'autorisation de supprimer cette compétence'
                ], 403);
            }

            $competence->delete();

            return response()->json([
                'success' => true,
                'message' => 'Compétence supprimée avec succès'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression de la compétence',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Récupérer les statistiques par catégorie
     */
    public function getCategoriesStats()
    {
        try {
            $stats = Competence::select('categorie', \DB::raw('count(*) as count'))
                ->groupBy('categorie')
                ->orderBy('count', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $stats,
                'message' => 'Statistiques des catégories récupérées avec succès'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des statistiques',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Récupérer les compétences récentes (populaires)
     */
    public function getRecentCompetences($limit = 3)
    {
        try {
            $competences = Competence::with('user:id,nom,prenom,photo')
                ->orderBy('created_at', 'desc')
                ->limit($limit)
                ->get();

            return response()->json([
                'success' => true,
                'data' => $competences,
                'message' => 'Compétences récentes récupérées avec succès'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des compétences récentes',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Afficher les compétences de l'utilisateur connecté
     */
    public function mesCompetences()
    {
        try {
            $competences = Competence::where('user_id', Auth::id())
                ->with('user:id,nom,prenom,photo')
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $competences,
                'message' => 'Vos compétences récupérées avec succès'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération de vos compétences',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}