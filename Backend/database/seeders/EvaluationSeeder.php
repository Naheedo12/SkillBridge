<?php

namespace Database\Seeders;

use App\Models\Echange;
use App\Models\Evaluation;
use Illuminate\Database\Seeder;

class EvaluationSeeder extends Seeder
{
    public function run(): void
    {
        $echangesTerminees = Echange::where('statut', 'Terminée')->get();
        
        // Évaluations prédéfinies pour les échanges terminés
        $evaluations = [];
        
        foreach ($echangesTerminees as $echange) {
            $evaluations[] = [
                'commentaire' => 'Excellente expérience! L\'enseignant était très compétent et pédagogue.',
                'note' => 5,
                'date' => $echange->date->addDays(1),
                'echange_id' => $echange->id,
                'evaluateur_id' => $echange->user_apprenant_id,
                'evalue_id' => $echange->user_enseignant_id,
            ];
            
            // Ajouter une évaluation de l'enseignant vers l'apprenant (optionnelle)
            if (rand(0, 1)) {
                $evaluations[] = [
                    'commentaire' => 'Élève motivé et assidu. Un plaisir d\'enseigner!',
                    'note' => 4,
                    'date' => $echange->date->addDays(2),
                    'echange_id' => $echange->id,
                    'evaluateur_id' => $echange->user_enseignant_id,
                    'evalue_id' => $echange->user_apprenant_id,
                ];
            }
        }

        foreach ($evaluations as $evaluationData) {
            Evaluation::create($evaluationData);
        }

        // Créer 5 évaluations aléatoires supplémentaires
        Evaluation::factory()->count(5)->create();

        $this->command->info('✅ Évaluations créées avec succès!');
        $this->command->info('📊 ' . count($evaluations) . ' évaluations prédéfinies + 5 aléatoires');
        $this->command->info('⭐ Total évaluations: ' . Evaluation::count());
        
        // Afficher la moyenne générale
        $moyenne = Evaluation::avg('note');
        $this->command->info("📊 Note moyenne: " . number_format($moyenne, 2) . "/5");
    }
}