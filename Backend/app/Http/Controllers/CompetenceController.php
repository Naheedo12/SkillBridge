<?php

namespace App\Http\Controllers;

use App\Models\Competence;
use App\Http\Requests\CompetenceStoreRequest;
use App\Http\Requests\CompetenceUpdateRequest;
use Illuminate\Http\Request;
use Cloudinary\Cloudinary;

class CompetenceController extends Controller
{
    private Cloudinary $cloudinary;

    public function __construct()
    {
        $this->cloudinary = new Cloudinary(env('CLOUDINARY_URL'));
    }

    public function index(Request $request)
    {
        $query = Competence::with('user:id,nom,prenom,email');

        if ($request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('titre', 'like', '%' . $search . '%')
                  ->orWhere('description', 'like', '%' . $search . '%')
                  ->orWhere('categorie', 'like', '%' . $search . '%');
            });
        }

        if ($request->categorie) {
            $query->where('categorie', $request->categorie);
        }

        $competences = $query->latest()->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $competences
        ]);
    }

    public function store(CompetenceStoreRequest $request)
    {
        try {
            $data = $request->validated();
            $data['user_id'] = auth()->id();
            $data['disponibilite'] = $request->disponibilite ?? true;

            if ($request->hasFile('image')) {
                $image = $this->cloudinary->uploadApi()->upload(
                    $request->file('image')->getRealPath(),
                    ['folder' => 'competences']
                );

                $data['image_url'] = $image['secure_url'];
                $data['image_public_id'] = $image['public_id'];
            }

            $competence = Competence::create($data);
            $competence->load('user:id,nom,prenom,email');

            return response()->json([
                'success' => true,
                'message' => 'Compétence créée avec succès',
                'data' => $competence
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de la compétence',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Competence $competence)
    {
        $competence->load('user:id,nom,prenom,email');

        return response()->json([
            'success' => true,
            'data' => $competence
        ]);
    }

    public function update(CompetenceUpdateRequest $request, Competence $competence)
    {
        try {
            if (!auth()->user()->can('update', $competence)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Vous n\'êtes pas autorisé à modifier cette compétence'
                ], 403);
            }

            $data = $request->validated();

            if ($request->hasFile('image')) {
                // Supprimer l'ancienne image
                if ($competence->image_public_id) {
                    $this->cloudinary->uploadApi()->destroy($competence->image_public_id);
                }

                $image = $this->cloudinary->uploadApi()->upload(
                    $request->file('image')->getRealPath(),
                    ['folder' => 'competences']
                );

                $data['image_url'] = $image['secure_url'];
                $data['image_public_id'] = $image['public_id'];
            }

            $competence->update($data);
            $competence->load('user:id,nom,prenom,email');

            return response()->json([
                'success' => true,
                'message' => 'Compétence modifiée avec succès',
                'data' => $competence
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la modification de la compétence',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Competence $competence)
    {
        try {
            if (!auth()->user()->can('delete', $competence)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Vous n\'êtes pas autorisé à supprimer cette compétence'
                ], 403);
            }

            if ($competence->image_public_id) {
                $this->cloudinary->uploadApi()->destroy($competence->image_public_id);
            }

            $competence->delete();

            return response()->json([
                'success' => true,
                'message' => 'Compétence supprimée avec succès'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression de la compétence',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function popular()
    {
        $competences = Competence::with('user:id,nom,prenom,email')
            ->where('disponibilite', true)
            ->latest()
            ->take(3)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $competences
        ]);
    }

    public function myCompetences()
    {
        $competences = Competence::where('user_id', auth()->id())
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $competences
        ]);
    }
}