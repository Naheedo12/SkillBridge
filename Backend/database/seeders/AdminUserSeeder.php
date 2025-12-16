<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        // Créer l'administrateur principal
        $admin = User::create([
            'nom' => 'Elqadi',
            'prenom' => 'Salma',
            'email' => 'salma@skillbridge.com',
            'email_verified_at' => now(),
            'motDePasse' => Hash::make('salmasalma'),
            'role' => 'Administrateur',
            'solde_credits' => 1000,
            'photo' => 'https://ui-avatars.com/api/?name=Admin+SkillBridge&background=4F46E5&color=fff&size=200',
            'bio' => 'Administrateur principal de la plateforme SkillBridge. Je suis là pour assurer le bon fonctionnement de la communauté et aider les utilisateurs.',
            'created_at' => now()->subYear(),
            'updated_at' => now(),
        ]);

        // Créer 10 utilisateurs normaux
        User::factory()->count(10)->create();

        $this->command->info('✅ Administrateur créé avec succès!');
        $this->command->info('👑 Admin principal: salma@skillbridge.com / ');
        $this->command->info('👥 10 utilisateurs normaux créés!');
    }
}