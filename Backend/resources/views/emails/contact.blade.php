<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau message de contact - SkillBridge</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f5f5f5;">
    
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #5943EC 0%, #692278 100%); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 600;">📧 Nouveau Message</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">SkillBridge - Plateforme d'échange de compétences</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px;">
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #5943EC;">
                <strong style="color: #5943EC;">👤 Expéditeur</strong><br>
                <span style="font-size: 16px; color: #333;">{{ $prenom }} {{ $nom }}</span>
            </div>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #5943EC;">
                <strong style="color: #5943EC;">📧 Email</strong><br>
                <a href="mailto:{{ $email }}" style="color: #5943EC; text-decoration: none;">{{ $email }}</a>
            </div>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #5943EC;">
                <strong style="color: #5943EC;">📋 Sujet</strong><br>
                <span style="color: #333;">{{ $sujet }}</span>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #692278;">
                <strong style="color: #692278;">💬 Message</strong><br><br>
                <div style="color: #333; white-space: pre-wrap; line-height: 1.6;">{{ $message }}</div>
            </div>
            
        </div>
        
        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
            <p style="margin: 0; color: #666; font-size: 14px;">
                📅 Reçu le {{ date('d/m/Y à H:i') }}
            </p>
            <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">
                Répondez directement à cet email pour contacter {{ $prenom }}
            </p>
        </div>
        
    </div>
    
</body>
</html>