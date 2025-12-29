<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCompetenceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check(); // Seuls les utilisateurs connectés peuvent créer
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'titre' => 'required|string|max:255',
            'categorie' => 'required|string|max:100',
            'niveau' => 'required|in:debutant,intermediaire,avance',
            'description' => 'required|string|max:1000',
            'disponibilite' => 'sometimes|boolean',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'titre.required' => 'Le titre est obligatoire.',
            'titre.string' => 'Le titre doit être une chaîne de caractères.',
            'titre.max' => 'Le titre ne peut pas dépasser 255 caractères.',
            
            'categorie.required' => 'La catégorie est obligatoire.',
            'categorie.string' => 'La catégorie doit être une chaîne de caractères.',
            'categorie.max' => 'La catégorie ne peut pas dépasser 100 caractères.',
            
            'niveau.required' => 'Le niveau est obligatoire.',
            'niveau.in' => 'Le niveau doit être : débutant, intermédiaire ou avancé.',
            
            'description.required' => 'La description est obligatoire.',
            'description.string' => 'La description doit être une chaîne de caractères.',
            'description.max' => 'La description ne peut pas dépasser 1000 caractères.',
            
            'disponibilite.boolean' => 'La disponibilité doit être vraie ou fausse.',
        ];
    }
}