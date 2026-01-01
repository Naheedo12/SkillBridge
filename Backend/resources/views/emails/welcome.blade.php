<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenue sur SkillBridge</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f5f5f5;">
    
    <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #5943EC 0%, #692278 100%); color: white; padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 600;">🎉 Bienvenue sur SkillBridge !</h1>
            <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.9;">Votre aventure d'échange de compétences commence maintenant</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
            
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #5943EC; margin: 0 0 10px 0;">Salut {{ $user->prenom }} ! 👋</h2>
                <p style="color: #666; font-size: 16px; margin: 0;">Nous sommes ravis de vous accueillir dans notre communauté</p>
            </div>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #5943EC;">
                <h3 style="color: #5943EC; margin: 0 0 15px 0;">🎁 Votre cadeau de bienvenue</h3>
                <p style="margin: 0; font-size: 16px; color: #333;">
                    <strong>10 crédits gratuits</strong> ont été ajoutés à votre compte pour commencer vos premiers échanges !
                </p>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h3 style="color: #692278; margin: 0 0 15px 0;">🚀 Prêt à commencer ?</h3>
                <ul style="color: #333; padding-left: 20px;">
                    <li style="margin-bottom: 8px;">Publiez vos compétences et partagez votre savoir</li>
                    <li style="margin-bottom: 8px;">Découvrez les compétences d'autres membres</li>
                    <li style="margin-bottom: 8px;">Proposez des échanges et apprenez de nouvelles choses</li>
                    <li style="margin-bottom: 8px;">Gagnez des crédits en aidant la communauté</li>
                </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="http://localhost:3000" style="display: inline-block; background: linear-gradient(135deg, #5943EC 0%, #692278 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                    🌟 Découvrir SkillBridge
                </a>
            </div>
            
            <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <h4 style="color: #1e40af; margin: 0 0 10px 0;">💡 Conseil de pro</h4>
                <p style="margin: 0; color: #333; font-size: 14px;">
                    Complétez votre profil avec une photo et une bio pour attirer plus d'échanges !
                </p>
            </div>
            
        </div>
        
        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #eee;">
            <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
                Besoin d'aide ? Contactez-nous via le formulaire de contact
            </p>
            <p style="margin: 0; color: #999; font-size: 12px;">
                Cet email a été envoyé automatiquement. Merci de ne pas y répondre.
            </p>
        </div>
        
    </div>
    
</body>
</html>