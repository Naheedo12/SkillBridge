<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CompetenceFactory extends Factory
{
    public function definition(): array
    {
        $categories = ['Programmation', 'Musique', 'Cuisine', 'Sport', 'Langues', 'Art', 'Bricolage', 'Jardinage', 'Design', 'Business', 'Sciences'];
        $niveaux = ['debutant', 'intermediaire', 'avance'];
        
        // Images par catégorie
        $imagesByCategory = [
            'Programmation' => [
                'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
            ],
            'Musique' => [
                'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop',
            ],
            'Cuisine' => [
                'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1556909114-4f5e73f39e80?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
            ],
            'Sport' => [
                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
            ],
            'Langues' => [
                'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
            ],
            'Art' => [
                'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop',
            ],
            'Design' => [
                'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=300&fit=crop',
            ],
            'Business' => [
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop',
            ],
            'Sciences' => [
                'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
            ],
        ];
        
        $selectedCategory = $this->faker->randomElement($categories);
        $defaultImages = [
            'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
        ];
        
        return [
            'titre' => $this->faker->sentence(3),
            'categorie' => $selectedCategory,
            'niveau' => $this->faker->randomElement($niveaux),
            'description' => $this->faker->paragraph(5),
            'image' => $this->faker->randomElement($imagesByCategory[$selectedCategory] ?? $defaultImages),
            'disponibilite' => $this->faker->boolean(80), // 80% de chances d'être disponible
            'user_id' => User::factory(),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }

    public function disponible(): static
    {
        return $this->state(fn (array $attributes) => [
            'disponibilite' => true,
        ]);
    }

    public function indisponible(): static
    {
        return $this->state(fn (array $attributes) => [
            'disponibilite' => false,
        ]);
    }

    public function pourCategorie(string $categorie): static
    {
        return $this->state(fn (array $attributes) => [
            'categorie' => $categorie,
        ]);
    }

    public function pourNiveau(string $niveau): static
    {
        return $this->state(fn (array $attributes) => [
            'niveau' => $niveau,
        ]);
    }
}