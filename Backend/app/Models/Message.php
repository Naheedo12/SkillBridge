<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'contenu',
        'date',
        'expediteur_id',
        'destinataire_id',
        'lu',
    ];

    protected $casts = [
        'lu' => 'boolean',
        'date' => 'date',
    ];

    // Relations

    /**
     * L'expéditeur du message
     */
    public function expediteur()
    {
        return $this->belongsTo(User::class, 'expediteur_id');
    }

    /**
     * Le destinataire du message
     */
    public function destinataire()
    {
        return $this->belongsTo(User::class, 'destinataire_id');
    }
}