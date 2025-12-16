<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('echanges', function (Blueprint $table) {
            $table->id();
            $table->enum('statut', ['En attente', 'Acceptée', 'Terminée'])->default('En attente'); 
            $table->integer('credits')->default(2);
            $table->date('date'); 
            $table->foreignId('user_apprenant_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('user_enseignant_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('competence_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('echanges');
    }
};
