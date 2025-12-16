<?php

namespace Database\Seeders;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Seeder;

class NotificationSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        
        // Notifications prédéfinies pour démonstration
        $predefinedNotifications = [
            [
                'type' => 'systeme',
                'contenu' => 'Bienvenue sur SkillBridge! Votre compte a été créé avec succès.',
                'date' => now()->subMonths(3),
                'lu' => true,
                'user_id' => $users->first()->id,
            ],
            [
                'type' => 'echange_acceptee',
                'contenu' => 'Votre échange a été accepté!',
                'date' => now()->subMonths(1),
                'lu' => true,
                'user_id' => $users->first()->id,
            ],
            [
                'type' => 'nouveau_message',
                'contenu' => 'Vous avez reçu un nouveau message',
                'date' => now()->subDays(2),
                'lu' => false,
                'user_id' => $users->first()->id,
            ],
            [
                'type' => 'echange_terminee',
                'contenu' => 'Échange terminé! Crédits transférés.',
                'date' => now()->subDays(1),
                'lu' => true,
                'user_id' => $users->skip(1)->first()->id,
            ],
            [
                'type' => 'systeme',
                'contenu' => 'Mise à jour de la plateforme disponible',
                'date' => now()->subWeek(),
                'lu' => false,
                'user_id' => $users->skip(2)->first()->id,
            ],
        ];

        foreach ($predefinedNotifications as $notificationData) {
            Notification::create($notificationData);
        }

        // Créer 15 notifications aléatoires
        Notification::factory()->count(15)->create();

        $this->command->info('✅ Notifications créées avec succès!');
        $this->command->info('📊 5 notifications prédéfinies + 15 aléatoires');
        $this->command->info('🔔 Total notifications: ' . Notification::count());
        
        // Afficher les statistiques
        $nonLues = Notification::where('lu', false)->count();
        $this->command->info("📨 Notifications non lues: {$nonLues}");
    }
}