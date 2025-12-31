<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    /**
     * Envoyer un message de contact par email
     */
    public function sendMessage(Request $request)
    {
        try {
            // Validation des données
            $validator = Validator::make($request->all(), [
                'prenom' => 'required|string|max:255',
                'nom' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'sujet' => 'required|string|max:255',
                'message' => 'required|string|max:2000'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Erreur de validation',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $validator->validated();

            // Formater le sujet
            $sujets = [
                'question-generale' => 'Question générale',
                'probleme-technique' => 'Problème technique',
                'suggestion' => 'Suggestion',
                'autre' => 'Autre'
            ];
            $sujetFormate = $sujets[$data['sujet']] ?? $data['sujet'];

            // Créer le contenu de l'email en texte simple
            $emailContent = "
🔔 NOUVEAU MESSAGE DE CONTACT - SKILLBRIDGE
=============================================

👤 Expéditeur: {$data['prenom']} {$data['nom']}
📧 Email: {$data['email']}
📋 Sujet: {$sujetFormate}
📅 Date: " . now()->format('d/m/Y à H:i:s') . "

💬 Message:
{$data['message']}

=============================================
Vous pouvez répondre directement à cet email.
            ";

            // Configuration Mailtrap directement dans le code
            config([
                'mail.mailers.smtp.host' => 'sandbox.smtp.mailtrap.io',
                'mail.mailers.smtp.port' => 2525,
                'mail.mailers.smtp.username' => 'ee1f429728bc1d',
                'mail.mailers.smtp.password' => '12e38c1f6e63c3',
                'mail.mailers.smtp.encryption' => 'tls',
                'mail.from.address' => 'contact@skillbridge.com',
                'mail.from.name' => 'SkillBridge Contact'
            ]);

            // Envoyer l'email avec Mail::raw (plus fiable)
            Mail::raw($emailContent, function ($message) use ($data) {
                $message->to('elqadi.salma.929@gmail.com')
                        ->subject('🔔 Nouveau message de contact - SkillBridge')
                        ->replyTo($data['email'], $data['prenom'] . ' ' . $data['nom']);
            });

            \Log::info('Email de contact envoyé via Mailtrap pour: ' . $data['prenom'] . ' ' . $data['nom']);

            return response()->json([
                'success' => true,
                'message' => 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.'
            ]);

        } catch (\Exception $e) {
            \Log::error('Erreur lors de l\'envoi de l\'email: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'envoi du message: ' . $e->getMessage(),
                'error' => $e->getMessage()
            ], 500);
        }
    }
}