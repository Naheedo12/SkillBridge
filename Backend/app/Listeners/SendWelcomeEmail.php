<?php

namespace App\Listeners;

use App\Events\UserRegistered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SendWelcomeEmail
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserRegistered $event): void
    {
        try {
            $user = $event->user;

            // Configuration Mailtrap forcée (même approche que ContactController)
            config([
                'mail.default' => 'smtp',
                'mail.mailers.smtp.transport' => 'smtp',
                'mail.mailers.smtp.host' => 'sandbox.smtp.mailtrap.io',
                'mail.mailers.smtp.port' => 2525,
                'mail.mailers.smtp.username' => 'ee1f429728bc1d',
                'mail.mailers.smtp.password' => '12e38c1f6e63c3',
                'mail.mailers.smtp.encryption' => 'tls',
                'mail.from.address' => 'welcome@skillbridge.com',
                'mail.from.name' => 'SkillBridge Team'
            ]);

            // Message de bienvenue simple mais élégant
            $message = "🎉 Bienvenue sur SkillBridge, {$user->prenom} !\n\n";
            $message .= "Nous sommes ravis de vous accueillir dans notre communauté d'échange de compétences.\n\n";
            $message .= "🎁 Votre cadeau de bienvenue :\n";
            $message .= "• 10 crédits gratuits ont été ajoutés à votre compte\n\n";
            $message .= "🚀 Prêt à commencer ?\n";
            $message .= "• Publiez vos compétences et partagez votre savoir\n";
            $message .= "• Découvrez les compétences d'autres membres\n";
            $message .= "• Proposez des échanges et apprenez de nouvelles choses\n";
            $message .= "• Gagnez des crédits en aidant la communauté\n\n";
            $message .= "💡 Conseil : Complétez votre profil avec une photo et une bio pour attirer plus d'échanges !\n\n";
            $message .= "Découvrez SkillBridge : http://localhost:3000\n\n";
            $message .= "L'équipe SkillBridge";

            // Envoyer l'email avec Mail::raw (approche fiable)
            Mail::raw($message, function ($mail) use ($user) {
                $mail->to($user->email, $user->prenom . ' ' . $user->nom)
                     ->subject('🎉 Bienvenue sur SkillBridge !');
            });

            Log::info('Email de bienvenue envoyé à: ' . $user->email);

        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'envoi de l\'email de bienvenue: ' . $e->getMessage());
        }
    }
}