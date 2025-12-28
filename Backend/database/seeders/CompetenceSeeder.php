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
                'niveau' => 'avance',
                'description' => 'Je peux enseigner les bases et avancées du framework Laravel pour PHP, incluant les modèles, contrôleurs, vues et l\'API.',
                'image' => 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
                'disponibilite' => true,
                'user_id' => $users->first()->id,
            ],
            [
                'titre' => 'Cuisine Italienne Traditionnelle',
                'categorie' => 'Cuisine',
                'niveau' => 'avance',
                'description' => 'Apprenez à préparer des plats italiens authentiques : pasta fresca, risotto, tiramisu. Cours pratiques.',
                'image' => 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
                'disponibilite' => true,
                'user_id' => $users->skip(1)->first()->id,
            ],
            [
                'titre' => 'Guitare Acoustique pour Débutants',
                'categorie' => 'Musique',
                'niveau' => 'intermediaire',
                'description' => 'Cours de guitare pour débutants : accords de base, rythmes simples, premières chansons. Matériel fourni.',
                'image' => 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop',
                'disponibilite' => true,
                'user_id' => $users->skip(2)->first()->id,
            ],
            [
                'titre' => 'Conversation en Anglais',
                'categorie' => 'Langues',
                'niveau' => 'avance',
                'description' => 'Pratiquez votre anglais avec une locutrice native. Discussion sur divers sujets, correction de prononciation.',
                'image' => 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
                'disponibilite' => true,
                'user_id' => $users->skip(3)->first()->id,
            ],
            [
                'titre' => 'Photographie de Portrait',
                'categorie' => 'Art',
                'niveau' => 'intermediaire',
                'description' => 'Apprenez les techniques de portrait : composition, éclairage, post-traitement. Apportez votre appareil photo.',
                'image' => 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&h=300&fit=crop',
                'disponibilite' => true,
                'user_id' => $users->skip(4)->first()->id,
            ],
            [
                'titre' => 'Design UI/UX avec Figma',
                'categorie' => 'Design',
                'niveau' => 'intermediaire',
                'description' => 'Apprenez à créer des interfaces utilisateur modernes avec Figma. De la conception à la livraison.',
                'image' => 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
                'disponibilite' => true,
                'user_id' => $users->skip(5)->first()->id ?? $users->first()->id,
            ],
            [
                'titre' => 'Yoga pour Débutants',
                'categorie' => 'Sport',
                'niveau' => 'debutant',
                'description' => 'Découvrez les bases du yoga : postures, respiration, relaxation. Cours adaptés aux débutants.',
                'image' => 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
                'disponibilite' => true,
                'user_id' => $users->skip(6)->first()->id ?? $users->first()->id,
            ],
            [
                'titre' => 'Marketing Digital Avancé',
                'categorie' => 'Business',
                'niveau' => 'avance',
                'description' => 'Stratégies de marketing digital : SEO, réseaux sociaux, publicité en ligne, analytics.',
                'image' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
                'disponibilite' => true,
                'user_id' => $users->skip(7)->first()->id ?? $users->first()->id,
            ],
            [
                'titre' => 'Mathématiques Appliquées',
                'categorie' => 'Sciences',
                'niveau' => 'intermediaire',
                'description' => 'Cours de mathématiques appliquées : statistiques, probabilités, analyse de données.',
                'image' => 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop',
                'disponibilite' => true,
                'user_id' => $users->skip(8)->first()->id ?? $users->first()->id,
            ],
        ];

        foreach ($predefinedCompetences as $competenceData) {
            Competence::create($competenceData);
        }

        // Créer 15 compétences aléatoires
        Competence::factory()->count(15)->create();

        $this->command->info('✅ 24 compétences créées avec succès!');
        $this->command->info('📊 9 compétences prédéfinies + 15 aléatoires');
    }
}