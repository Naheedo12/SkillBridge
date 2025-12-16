<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    public function definition(): array
    {
        $expediteur = User::factory()->create();
        $destinataire = User::factory()->create();
        
        return [
            'contenu' => $this->faker->paragraph(2),
            'date' => $this->faker->dateTimeBetween('-3 months', 'now'),
            'expediteur_id' => $expediteur->id,
            'destinataire_id' => $destinataire->id,
            'lu' => $this->faker->boolean(70), // 70% de chances d'être lu
            'created_at' => $this->faker->dateTimeBetween('-3 months', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-3 months', 'now'),
        ];
    }

    public function nonLu(): static
    {
        return $this->state(fn (array $attributes) => [
            'lu' => false,
        ]);
    }

    public function lu(): static
    {
        return $this->state(fn (array $attributes) => [
            'lu' => true,
        ]);
    }

    public function entreUtilisateurs(int $expediteurId, int $destinataireId): static
    {
        return $this->state(fn (array $attributes) => [
            'expediteur_id' => $expediteurId,
            'destinataire_id' => $destinataireId,
        ]);
    }

    public function recent(): static
    {
        return $this->state(fn (array $attributes) => [
            'date' => $this->faker->dateTimeBetween('-1 week', 'now'),
            'created_at' => $this->faker->dateTimeBetween('-1 week', 'now'),
        ]);
    }
}