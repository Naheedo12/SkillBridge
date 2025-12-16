<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('evaluations', function (Blueprint $table) {
            $table->id();
            $table->text('commentaire');
            $table->integer('note')->between(1, 5);
            $table->date('date');
            $table->foreignId('echange_id')->constrained()->onDelete('cascade');
            $table->foreignId('evaluateur_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('evalue_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('evaluations');
    }
};