<?php

namespace Database\Factories;

use App\Models\Competence;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class EchangeFactory extends Factory
{
    public function definition(): array
    {
        $statuts = ['En attente', 'Acceptée', 'Terminée'];
        
        return [
            'statut' => $this->faker->randomElement($statuts),
            'credits' => $this->faker->numberBetween(2, 10),
            'date' => $this->faker->dateTimeBetween('-6 months', 'now'),
            'user_apprenant_id' => User::factory(),
            'user_enseignant_id' => User::factory(),
            'competence_id' => Competence::factory(),
            'created_at' => $this->faker->dateTimeBetween('-6 months', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-6 months', 'now'),
        ];
    }

    public function enAttente(): static
    {
        return $this->state(fn (array $attributes) => [
            'statut' => 'En attente',
        ]);
    }

    public function acceptee(): static
    {
        return $this->state(fn (array $attributes) => [
            'statut' => 'Acceptée',
        ]);
    }

    public function terminee(): static
    {
        return $this->state(fn (array $attributes) => [
            'statut' => 'Terminée',
        ]);
    }

    public function avecMontantCredit(int $montant): static
    {
        return $this->state(fn (array $attributes) => [
            'credits' => $montant,
        ]);
    }

    public function pourUtilisateurs(int $apprenantId, int $enseignantId): static
    {
        return $this->state(fn (array $attributes) => [
            'user_apprenant_id' => $apprenantId,
            'user_enseignant_id' => $enseignantId,
        ]);
    }
}