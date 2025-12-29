<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCompetenceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check(); // Seuls les utilisateurs connectés peuvent modifier
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'titre' => 'sometimes|string|max:255',
            'categorie' => 'sometimes|string|max:100',
            'niveau' => 'sometimes|in:debutant,intermediaire,avance',
            'description' => 'sometimes|string|max:1000',
            'disponibilite' => 'sometimes|boolean',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'titre.string' => 'Le titre doit être une chaîne de caractères.',
            'titre.max' => 'Le titre ne peut pas dépasser 255 caractères.',
            
            'categorie.string' => 'La catégorie doit être une chaîne de caractères.',
            'categorie.max' => 'La catégorie ne peut pas dépasser 100 caractères.',
            
            'niveau.in' => 'Le niveau doit être : débutant, intermédiaire ou avancé.',
            
            'description.string' => 'La description doit être une chaîne de caractères.',
            'description.max' => 'La description ne peut pas dépasser 1000 caractères.',
            
            'disponibilite.boolean' => 'La disponibilité doit être vraie ou fausse.',
        ];
    }
}
