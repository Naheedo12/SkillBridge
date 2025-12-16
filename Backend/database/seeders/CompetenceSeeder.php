<?php

namespace Database\Seeders;

use App\Models\Competence;
use App\Models\User;
use Illuminate\Database\Seeder;

class CompetenceSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('role', 'Utilisateur')->get();
        
        // Compétences prédéfinies pour démonstration
        $predefinedCompetences = [
            [
                'titre' => 'Développement Web avec Laravel',
                'categorie' => 'Programmation',
                'niveau' => 'expert',
                'description' => 'Je peux enseigner les bases et avancées du framework Laravel pour PHP, incluant les modèles, contrôleurs, vues et l\'API.',
                'disponibilite' => true,
                'user_id' => $users->first()->id,
            ],
            [
                'titre' => 'Cuisine Italienne Traditionnelle',
                'categorie' => 'Cuisine',
                'niveau' => 'avance',
                'description' => 'Apprenez à préparer des plats italiens authentiques : pasta fresca, risotto, tiramisu. Cours pratiques.',
                'disponibilite' => true,
                'user_id' => $users->skip(1)->first()->id,
            ],
            [
                'titre' => 'Guitare Acoustique pour Débutants',
                'categorie' => 'Musique',
                'niveau' => 'intermediaire',
                'description' => 'Cours de guitare pour débutants : accords de base, rythmes simples, premières chansons. Matériel fourni.',
                'disponibilite' => true,
                'user_id' => $users->skip(2)->first()->id,
            ],
            [
                'titre' => 'Conversation en Anglais',
                'categorie' => 'Langues',
                'niveau' => 'expert',
                'description' => 'Pratiquez votre anglais avec une locutrice native. Discussion sur divers sujets, correction de prononciation.',
                'disponibilite' => true,
                'user_id' => $users->skip(3)->first()->id,
            ],
            [
                'titre' => 'Photographie de Portrait',
                'categorie' => 'Art',
                'niveau' => 'intermediaire',
                'description' => 'Apprenez les techniques de portrait : composition, éclairage, post-traitement. Apportez votre appareil photo.',
                'disponibilite' => true,
                'user_id' => $users->skip(4)->first()->id,
            ],
        ];

        foreach ($predefinedCompetences as $competenceData) {
            Competence::create($competenceData);
        }

        // Créer 15 compétences aléatoires
        Competence::factory()->count(15)->create();

        $this->command->info('✅ 20 compétences créées avec succès!');
        $this->command->info('📊 5 compétences prédéfinies + 15 aléatoires');
    }
}