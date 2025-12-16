<?php

namespace Database\Factories;

use App\Models\Echange;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class EvaluationFactory extends Factory
{
    public function definition(): array
    {
        $echange = Echange::factory()->create();
        $evaluateur = $echange->user_apprenant_id;
        $evalue = $echange->user_enseignant_id;
        
        return [
            'commentaire' => $this->faker->paragraph(3),
            'note' => $this->faker->numberBetween(1, 5),
            'date' => $this->faker->dateTimeBetween('-2 months', 'now'),
            'echange_id' => $echange->id,
            'evaluateur_id' => $evaluateur,
            'evalue_id' => $evalue,
            'created_at' => $this->faker->dateTimeBetween('-2 months', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-2 months', 'now'),
        ];
    }

    public function avecBonneNote(): static
    {
        return $this->state(fn (array $attributes) => [
            'note' => $this->faker->numberBetween(4, 5),
            'commentaire' => $this->faker->paragraph(3) . ' Excellente expérience!',
        ]);
    }

    public function avecNoteMoyenne(): static
    {
        return $this->state(fn (array $attributes) => [
            'note' => $this->faker->numberBetween(3, 4),
            'commentaire' => $this->faker->paragraph(3) . ' Bonne expérience globale.',
        ]);
    }

    public function avecMauvaiseNote(): static
    {
        return $this->state(fn (array $attributes) => [
            'note' => $this->faker->numberBetween(1, 2),
            'commentaire' => $this->faker->paragraph(3) . ' Expérience à améliorer.',
        ]);
    }

    public function pourEchange(int $echangeId): static
    {
        $echange = Echange::find($echangeId);
        
        return $this->state(fn (array $attributes) => [
            'echange_id' => $echangeId,
            'evaluateur_id' => $echange->user_apprenant_id,
            'evalue_id' => $echange->user_enseignant_id,
        ]);
    }
}