<?php

namespace Database\Seeders;

use App\Models\Competence;
use App\Models\Echange;
use App\Models\User;
use Illuminate\Database\Seeder;

class EchangeSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('role', 'Utilisateur')->get();
        $competences = Competence::all();
        
        // Échanges prédéfinis pour démonstration
        $predefinedEchanges = [
            [
                'statut' => 'Terminée',
                'credits' => 4,
                'date' => now()->subMonths(2),
                'user_apprenant_id' => $users->first()->id,
                'user_enseignant_id' => $users->skip(1)->first()->id,
                'competence_id' => $competences->first()->id,
            ],
            [
                'statut' => 'Terminée',
                'credits' => 3,
                'date' => now()->subMonths(1),
                'user_apprenant_id' => $users->skip(1)->first()->id,
                'user_enseignant_id' => $users->first()->id,
                'competence_id' => $competences->skip(1)->first()->id,
            ],
            [
                'statut' => 'Acceptée',
                'credits' => 2,
                'date' => now()->subWeeks(2),
                'user_apprenant_id' => $users->skip(2)->first()->id,
                'user_enseignant_id' => $users->skip(3)->first()->id,
                'competence_id' => $competences->skip(2)->first()->id,
            ],
            [
                'statut' => 'En attente',
                'credits' => 5,
                'date' => now()->subWeek(),
                'user_apprenant_id' => $users->skip(4)->first()->id,
                'user_enseignant_id' => $users->skip(5)->first()->id,
                'competence_id' => $competences->skip(3)->first()->id,
            ],
            [
                'statut' => 'Acceptée',
                'credits' => 3,
                'date' => now()->subDays(3),
                'user_apprenant_id' => $users->skip(5)->first()->id,
                'user_enseignant_id' => $users->skip(6)->first()->id,
                'competence_id' => $competences->skip(4)->first()->id,
            ],
        ];

        foreach ($predefinedEchanges as $echangeData) {
            Echange::create($echangeData);
        }

        // Créer 10 échanges aléatoires
        Echange::factory()->count(10)->create();

        $this->command->info('✅ 15 échanges créés avec succès!');
        $this->command->info('📊 5 échanges prédéfinis + 10 aléatoires');
        
        // Afficher les statistiques
        $statuts = Echange::select('statut')
            ->selectRaw('COUNT(*) as total')
            ->groupBy('statut')
            ->get();
        
        $this->command->info('📈 Répartition par statut:');
        foreach ($statuts as $statut) {
            $this->command->info("   - {$statut->statut}: {$statut->total} échanges");
        }
    }
}