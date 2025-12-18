<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'motDePasse' => 'required|string|min:8|confirmed',
            'bio' => 'nullable|string|max:1000',
            'photo' => 'nullable|string|max:255',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom est obligatoire.',
            'nom.string' => 'Le nom doit être une chaîne de caractères.',
            'nom.max' => 'Le nom ne peut pas dépasser 255 caractères.',
            
            'prenom.required' => 'Le prénom est obligatoire.',
            'prenom.string' => 'Le prénom doit être une chaîne de caractères.',
            'prenom.max' => 'Le prénom ne peut pas dépasser 255 caractères.',
            
            'email.required' => 'L\'email est obligatoire.',
            'email.email' => 'L\'email doit être une adresse email valide.',
            'email.unique' => 'Cette adresse email est déjà utilisée.',
            'email.max' => 'L\'email ne peut pas dépasser 255 caractères.',
            
            'motDePasse.required' => 'Le mot de passe est obligatoire.',
            'motDePasse.min' => 'Le mot de passe doit contenir au moins 8 caractères.',
            'motDePasse.confirmed' => 'La confirmation du mot de passe ne correspond pas.',
            
            'bio.max' => 'La bio ne peut pas dépasser 1000 caractères.',
            'photo.max' => 'L\'URL de la photo ne peut pas dépasser 255 caractères.',
        ];
    }
}