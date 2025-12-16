<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    use HasFactory;

    protected $fillable = [
        'commentaire',
        'note',
        'date',
        'echange_id',
        'evaluateur_id',
        'evalue_id',
    ];

    protected $casts = [
        'note' => 'integer',
        'date' => 'date',
    ];

    // Relations

    /**
     * L'échange concerné par l'évaluation
     */
    public function echange()
    {
        return $this->belongsTo(Echange::class);
    }

    /**
     * L'évaluateur (celui qui donne l'évaluation)
     */
    public function evaluateur()
    {
        return $this->belongsTo(User::class, 'evaluateur_id');
    }

    /**
     * L'évalué (celui qui reçoit l'évaluation)
     */
    public function evalue()
    {
        return $this->belongsTo(User::class, 'evalue_id');
    }
}