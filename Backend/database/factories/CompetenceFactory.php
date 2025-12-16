<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CompetenceFactory extends Factory
{
    public function definition(): array
    {
        $categories = ['Programmation', 'Musique', 'Cuisine', 'Sport', 'Langues', 'Art', 'Bricolage', 'Jardinage'];
        $niveaux = ['debutant', 'intermediaire', 'avance', 'expert'];
        
        return [
            'titre' => $this->faker->sentence(3),
            'categorie' => $this->faker->randomElement($categories),
            'niveau' => $this->faker->randomElement($niveaux),
            'description' => $this->faker->paragraph(5),
            'disponibilite' => $this->faker->boolean(80), // 80% de chances d'être disponible
            'user_id' => User::factory(),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }

    public function disponible(): static
    {
        return $this->state(fn (array $attributes) => [
            'disponibilite' => true,
        ]);
    }

    public function indisponible(): static
    {
        return $this->state(fn (array $attributes) => [
            'disponibilite' => false,
        ]);
    }

    public function pourCategorie(string $categorie): static
    {
        return $this->state(fn (array $attributes) => [
            'categorie' => $categorie,
        ]);
    }

    public function pourNiveau(string $niveau): static
    {
        return $this->state(fn (array $attributes) => [
            'niveau' => $niveau,
        ]);
    }
}