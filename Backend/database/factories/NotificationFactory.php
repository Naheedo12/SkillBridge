<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class NotificationFactory extends Factory
{
    public function definition(): array
    {
        $types = [
            'nouveau_message',
            'echange_propose', 
            'echange_acceptee',
            'echange_terminee',
            'echange_refusee',
            'credits_ajoutes',
            'credits_retires',
            'systeme'
        ];
        
        $messages = [
            'nouveau_message' => 'Vous avez reçu un nouveau message',
            'echange_propose' => 'Nouvelle proposition d\'échange reçue',
            'echange_acceptee' => 'Votre échange a été accepté',
            'echange_terminee' => 'Échange terminé avec succès',
            'echange_refusee' => 'Votre proposition d\'échange a été refusée',
            'credits_ajoutes' => 'Crédits ajoutés à votre compte',
            'credits_retires' => 'Crédits retirés de votre compte',
            'systeme' => 'Notification système importante'
        ];
        
        $type = $this->faker->randomElement($types);
        
        return [
            'type' => $type,
            'contenu' => $messages[$type],
            'date' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'lu' => $this->faker->boolean(50), // 50% de chances d'être lu
            'user_id' => User::factory(),
            'created_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
        ];
    }

    public function nonLue(): static
    {
        return $this->state(fn (array $attributes) => [
            'lu' => false,
        ]);
    }

    public function lue(): static
    {
        return $this->state(fn (array $attributes) => [
            'lu' => true,
        ]);
    }

    public function deType(string $type): static
    {
        $messages = [
            'nouveau_message' => 'Vous avez reçu un nouveau message',
            'echange_propose' => 'Nouvelle proposition d\'échange reçue',
            'echange_acceptee' => 'Votre échange a été accepté',
            'echange_terminee' => 'Échange terminé avec succès',
            'echange_refusee' => 'Votre proposition d\'échange a été refusée',
            'credits_ajoutes' => 'Crédits ajoutés à votre compte',
            'credits_retires' => 'Crédits retirés de votre compte',
            'systeme' => 'Notification système importante'
        ];
        
        return $this->state(fn (array $attributes) => [
            'type' => $type,
            'contenu' => $messages[$type] ?? 'Notification',
        ]);
    }

    public function recente(): static
    {
        return $this->state(fn (array $attributes) => [
            'date' => $this->faker->dateTimeBetween('-2 days', 'now'),
            'created_at' => $this->faker->dateTimeBetween('-2 days', 'now'),
        ]);
    }
}