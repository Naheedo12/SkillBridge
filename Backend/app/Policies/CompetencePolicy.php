<?php

namespace App\Policies;

use App\Models\Competence;
use App\Models\User;

class CompetencePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; 
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Competence $competence): bool
    {
        return true; 
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true; 
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Competence $competence): bool
    {
        return $user->id === $competence->user_id || $user->role === 'Administrateur';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Competence $competence): bool
    {
        return $user->id === $competence->user_id || $user->role === 'Administrateur';
    }
}