<?php

namespace Database\Seeders;

use App\Models\Echange;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Seeder;

class MessageSeeder extends Seeder
{
    public function run(): void
    {
        $echanges = Echange::all();
        
        // Messages prédéfinis pour les échanges de démonstration
        foreach ($echanges as $echange) {
            // Créer une conversation pour chaque échange
            $messages = [
                [
                    'contenu' => "Bonjour! Je suis intéressé par votre compétence. Est-ce qu'on peut planifier un premier cours?",
                    'date' => $echange->date,
                    'expediteur_id' => $echange->user_apprenant_id,
                    'destinataire_id' => $echange->user_enseignant_id,
                    'lu' => true,
                ],
                [
                    'contenu' => "Bonjour! Oui avec plaisir. Je suis disponible le weekend prochain. Qu'est-ce qui vous convient?",
                    'date' => $echange->date->addDays(1),
                    'expediteur_id' => $echange->user_enseignant_id,
                    'destinataire_id' => $echange->user_apprenant_id,
                    'lu' => true,
                ],
                [
                    'contenu' => "Samedi après-midi me conviendrait parfaitement. On se donne rendez-vous à 14h?",
                    'date' => $echange->date->addDays(2),
                    'expediteur_id' => $echange->user_apprenant_id,
                    'destinataire_id' => $echange->user_enseignant_id,
                    'lu' => true,
                ],
            ];
            
            foreach ($messages as $messageData) {
                Message::create($messageData);
            }
        }

        // Créer 20 messages aléatoires supplémentaires
        Message::factory()->count(20)->create();

        $this->command->info('✅ Messages créés avec succès!');
        $this->command->info('📊 ' . ($echanges->count() * 3) . ' messages prédéfinis + 20 aléatoires');
        $this->command->info('💬 Total messages: ' . Message::count());
    }
}