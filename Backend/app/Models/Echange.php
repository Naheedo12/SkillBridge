<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Echange extends Model
{
    use HasFactory;

    protected $fillable = [
        'statut',
        'credits',
        'date',
        'user_apprenant_id',
        'user_enseignant_id',
        'competence_id',
    ];

    protected $casts = [
        'credits' => 'integer',
        'date' => 'date',
    ];

    // Relations

    /**
     * L'apprenant (celui qui veut apprendre)
     */
    public function apprenant()
    {
        return $this->belongsTo(User::class, 'user_apprenant_id');
    }

    /**
     * L'enseignant (celui qui enseigne)
     */
    public function enseignant()
    {
        return $this->belongsTo(User::class, 'user_enseignant_id');
    }

    /**
     * La compétence concernée par l'échange
     */
    public function competence()
    {
        return $this->belongsTo(Competence::class);
    }

    /**
     * L'évaluation liée à cet échange
     */
    public function evaluation()
    {
        return $this->hasOne(Evaluation::class);
    }
}