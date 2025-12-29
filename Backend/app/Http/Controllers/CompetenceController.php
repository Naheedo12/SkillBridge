<?php

namespace App\Http\Controllers;

use App\Models\Competence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CompetenceController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Competence::with('user:id,nom,prenom,photo')
                ->orderByDesc('created_at');

            // Recherche
            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('titre', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%")
                      ->orWhere('categorie', 'like', "%{$search}%");
                });
            }

            // Catégorie
            if ($request->filled('category') && $request->category !== 'Toutes catégories') {
                $query->where('categorie', $request->category);
            }

            // Niveau
            if ($request->filled('level') && $request->level !== 'Tous niveaux') {
                $levelMap = [
                    'Débutant' => 'debutant',
                    'Intermédiaire' => 'intermediaire',
                    'Avancé' => 'avance',
                    'Expert' => 'expert',
                ];

                $level = $levelMap[$request->level] ?? $request->level;
                $query->where('niveau', $level);
            }

            // Disponibilité
            if ($request->has('disponible')) {
                $query->where('disponibilite', (bool) $request->disponible);
            }

            $perPage = (int) $request->get('per_page', 9);
            $competences = $query->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $competences,
            ], 200);

        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des compétences',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        $competence = Competence::with('user:id,nom,prenom,photo,bio')->find($id);

        if (!$competence) {
            return response()->json([
                'success' => false,
                'message' => 'Compétence non trouvée',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $competence,
        ], 200);
    }

    public function store(Request $request)
    {
        try {
            // Validation directe
            $validator = Validator::make($request->all(), [
                'titre' => 'required|string|max:255',
                'description' => 'required|string',
                'categorie' => 'required|string|in:Programmation,Design,Musique,Cuisine,Art,Sport,Sciences,Bricolage,Jardinage,Informatique',
                'niveau' => 'required|string|in:debutant,intermediaire,avance',
                'disponibilite' => 'boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Erreur de validation',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $data = $validator->validated();
            $data['user_id'] = Auth::id();
            $data['image'] = $this->getImageByCategory($data['categorie'] ?? null);

            $competence = Competence::create($data);
            $competence->load('user:id,nom,prenom,photo');

            return response()->json([
                'success' => true,
                'data' => $competence,
            ], 201);

        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de la compétence',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $competence = Competence::findOrFail($id);

            if (!Auth::check() ||
                (!Auth::user()->isAdministrateur() && $competence->user_id !== Auth::id())
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'Action non autorisée',
                ], 403);
            }

            // Validation directe
            $validator = Validator::make($request->all(), [
                'titre' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|required|string',
                'categorie' => 'sometimes|required|string|in:Programmation,Design,Musique,Cuisine,Art,Sport,Sciences,Bricolage,Jardinage,Informatique',
                'niveau' => 'sometimes|required|string|in:debutant,intermediaire,avance',
                'disponibilite' => 'sometimes|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Erreur de validation',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $data = $validator->validated();

            if (isset($data['categorie']) && $data['categorie'] !== $competence->categorie) {
                $data['image'] = $this->getImageByCategory($data['categorie']);
            }

            $competence->update($data);
            $competence->load('user:id,nom,prenom,photo');

            return response()->json([
                'success' => true,
                'data' => $competence,
            ], 200);

        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la modification de la compétence',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $competence = Competence::findOrFail($id);

        if (!Auth::check() ||
            (!Auth::user()->isAdministrateur() && $competence->user_id !== Auth::id())
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Action non autorisée',
            ], 403);
        }

        $competence->delete();

        return response()->json([
            'success' => true,
            'message' => 'Compétence supprimée avec succès',
        ], 200);
    }

    public function getCategoriesStats()
    {
        $stats = Competence::select('categorie', DB::raw('COUNT(*) as count'))
            ->groupBy('categorie')
            ->orderByDesc('count')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $stats,
        ], 200);
    }

    public function getRecentCompetences($limit = 3)
    {
        $competences = Competence::with('user:id,nom,prenom,photo')
            ->latest()
            ->limit((int) $limit)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $competences,
        ], 200);
    }

    public function mesCompetences()
    {
        try {
            $competences = Competence::where('user_id', Auth::id())
                ->with('user:id,nom,prenom,photo')
                ->latest()
                ->get();

            return response()->json([
                'success' => true,
                'data' => $competences,
            ], 200);
            
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération de vos compétences',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    private function getImageByCategory($categorie)
    {
        $images = [
            'Programmation' => 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
            'Design' => 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
            'Musique' => 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1',
            'Cuisine' => 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136',
            'Art' => 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0',
            'Sport' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
            'Sciences' => 'https://images.unsplash.com/photo-1532094349884-543bc11b234d',
            'Bricolage' => 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189',
            'Jardinage' => 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b',
            'Informatique' => 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a',
        ];

        return $images[$categorie]
            ?? 'https://images.unsplash.com/photo-1633356122544-f134324a6cee';
    }
}