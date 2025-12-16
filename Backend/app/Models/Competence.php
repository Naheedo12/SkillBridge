<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competence extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'categorie',
        'niveau',
        'description',
        'disponibilite',
        'user_id',
    ];

    protected $casts = [
        'disponibilite' => 'boolean',
    ];

    // relations

    /**
     * L'utilisateur qui propose la compétence
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Les échanges concernant cette compétence
     */
    public function echanges()
    {
        return $this->hasMany(Echange::class);
    }
}