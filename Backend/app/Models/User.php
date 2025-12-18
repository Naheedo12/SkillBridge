<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'motDePasse',
        'role',
        'solde_credits',
        'photo',
        'bio',
    ];

    protected $hidden = [
        'motDePasse',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'motDePasse' => 'hashed',
        'solde_credits' => 'integer',
    ];

    public function getAuthPassword()
    {
        return $this->motDePasse;
    }

    public function getAuthPasswordName()
    {
        return 'motDePasse';
    }

    // relations
    /**
     * Les compétences proposées par l'utilisateur
     */
    public function competences()
    {
        return $this->hasMany(Competence::class);
    }

    /**
     * Les échanges où l'utilisateur est apprenant
     */
    public function echangesApprenant()
    {
        return $this->hasMany(Echange::class, 'user_apprenant_id');
    }

    /**
     * Les échanges où l'utilisateur est enseignant
     */
    public function echangesEnseignant()
    {
        return $this->hasMany(Echange::class, 'user_enseignant_id');
    }

    /**
     * Tous les échanges de l'utilisateur
     */
    public function echanges()
    {
        return $this->echangesApprenant->merge($this->echangesEnseignant);
    }

    /**
     * Messages envoyés par l'utilisateur
     */
    public function messagesEnvoyes()
    {
        return $this->hasMany(Message::class, 'expediteur_id');
    }

    /**
     * Messages reçus par l'utilisateur
     */
    public function messagesRecus()
    {
        return $this->hasMany(Message::class, 'destinataire_id');
    }

    /**
     * Notifications de l'utilisateur
     */
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    /**
     * Évaluations données par l'utilisateur
     */
    public function evaluationsDonnees()
    {
        return $this->hasMany(Evaluation::class, 'evaluateur_id');
    }

    /**
     * Évaluations reçues par l'utilisateur
     */
    public function evaluationsRecues()
    {
        return $this->hasMany(Evaluation::class, 'evalue_id');
    }

    // methodes

    /**
     * Vérifier si l'utilisateur est administrateur
     */
    public function isAdministrateur()
    {
        return $this->role === 'Administrateur';
    }

    /**
     * Vérifier si l'utilisateur est utilisateur normal
     */
    public function isUtilisateur()
    {
        return $this->role === 'Utilisateur';
    }

    /**
     * Obtenir le nom complet
     */
    public function getNomCompletAttribute()
    {
        return $this->prenom . ' ' . $this->nom;
    }

    /**
     * Vérifier si l'utilisateur a assez de crédits
     */
    public function aAssezDeCredits($montant = 2)
    {
        return $this->solde_credits >= $montant;
    }

    /**
     * Débiter des crédits
     */
    public function debiterCredits($montant = 2)
    {
        if ($this->aAssezDeCredits($montant)) {
            $this->solde_credits -= $montant;
            return $this->save();
        }
        return false;
    }

    /**
     * Créditer des crédits
     */
    public function crediterCredits($montant = 2)
    {
        $this->solde_credits += $montant;
        return $this->save();
    }
}