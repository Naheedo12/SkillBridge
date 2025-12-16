<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nom' => $this->faker->lastName(),
            'prenom' => $this->faker->firstName(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'motDePasse' => Hash::make('Password123!'), // Mot de passe par défaut
            'role' => 'Utilisateur',
            'solde_credits' => $this->faker->numberBetween(0, 50),
            'photo' => $this->faker->imageUrl(200, 200, 'people'),
            'bio' => $this->faker->paragraph(3),
            'remember_token' => Str::random(10),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }

    public function administrateur(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'Administrateur',
            'solde_credits' => 100,
        ]);
    }

    public function avecCreditMinimum(): static
    {
        return $this->state(fn (array $attributes) => [
            'solde_credits' => $this->faker->numberBetween(10, 100),
        ]);
    }

    public function avecPeuDeCredits(): static
    {
        return $this->state(fn (array $attributes) => [
            'solde_credits' => $this->faker->numberBetween(0, 5),
        ]);
    }

    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}