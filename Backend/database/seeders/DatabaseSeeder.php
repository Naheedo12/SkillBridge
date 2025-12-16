<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\CompetenceSeeder;
use Database\Seeders\EchangeSeeder;
use Database\Seeders\MessageSeeder;
use Database\Seeders\NotificationSeeder;
use Database\Seeders\EvaluationSeeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
            CompetenceSeeder::class,
            EchangeSeeder::class,
            MessageSeeder::class,
            NotificationSeeder::class,
            EvaluationSeeder::class,
        ]);
        
        $this->command->info('🎉 Base de données peuplée avec succès!');
        $this->command->info('👥 Total utilisateurs: ' . \App\Models\User::count());
        $this->command->info('💼 Total compétences: ' . \App\Models\Competence::count());
        $this->command->info('🤝 Total échanges: ' . \App\Models\Echange::count());
        $this->command->info('💬 Total messages: ' . \App\Models\Message::count());
        $this->command->info('🔔 Total notifications: ' . \App\Models\Notification::count());
        $this->command->info('⭐ Total évaluations: ' . \App\Models\Evaluation::count());
    }
}