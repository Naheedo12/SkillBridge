## 💡 Description du Projet : SkillBridge

SkillBridge est une application web full-stack destinée à faciliter l’échange de compétences entre utilisateurs sans aucune transaction monétaire.  
Chaque membre peut partager une compétence qu’il maîtrise (comme la guitare, la programmation ou les langues) et, en parallèle, rechercher d’autres talents proposés par la communauté.  
Le fonctionnement repose sur un système de crédits permettant d’assurer des échanges équilibrés, fiables et transparents entre les utilisateurs.
Cette plateforme favorise le partage, l’apprentissage et la collaboration entre des personnes ayant des compétences variées.

## 🎯 Objectifs du Projet

- 🌱 **Créer un espace d’apprentissage collaboratif**, accessible à tous et sans utilisation d’argent réel.  
- 🔄 **Proposer un système d’échanges équitables basé sur des crédits**, garantissant des interactions justes entre les utilisateurs.  
- 🧭 **Offrir une expérience utilisateur fluide, intuitive, responsive et totalement sécurisée**, adaptée à tous les appareils.  
- 📊 **Mettre à disposition un tableau de bord complet**, regroupant les crédits, l’historique des échanges, les messages et les compétences publiées.  
- 🛠️ **Permettre aux administrateurs de gérer efficacement la plateforme** : utilisateurs, compétences, échanges et état global du système.

## 👥 Public Cible

- Étudiants souhaitant échanger des connaissances de manière accessible.
- Professionnels voulant enseigner ou apprendre de nouvelles compétences.
- Passionnés dans divers domaines (musique, langues, informatique, sport, art…).
- Toute personne souhaitant apprendre ou partager son expertise gratuitement.

## 🧱 Architecture Technique
--> **🔧 Backend — Laravel**<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Framework Laravel (PHP)<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ORM Eloquent pour la gestion de la base de données<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Authentification sécurisée via Laravel Sanctum<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Gestion des rôles et permissions avec Laratrust<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Architecture REST pour l’API<br>

--> **🎨 Frontend — React**<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- React.js en Single Page Application<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Gestion d’état via Redux Toolkit<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Interfaces construites avec Tailwind CSS<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Consommation de l’API via Axios<br>

--> **🗄️ Base de données**<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- MySQL<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Modélisation relationnelle adaptée à la gestion des compétences, profils, échanges et messages<br>

--> **🐳 Déploiement & DevOps**<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Conteneurisation complète via Docker (backend, frontend, base de données)<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Intégration continue via GitHub Actions<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Déploiement sur Render, Railway, Netlify ou Vercel<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Utilisation d’un repository GitHub pour la gestion du code source et du versionnement<br>

## ✨ Fonctionnalités Détailées<br>
--> **👤 Gestion des utilisateurs**<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Création de compte, connexion, mise à jour du profil<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Rôles définis : utilisateur, administrateur<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Système de permissions basé sur Laratrust<br>

--> **📚 Gestion des compétences**<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Publication d’une compétence avec description et catégories<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Exploration des compétences publiées par la communauté<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Filtres et recherche avancée<br>

--> **🔁 Système d’échanges avec crédits**<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Chaque utilisateur possède un solde de crédits<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Acceptation et demande d’échanges entre membres<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Mise à jour automatique du solde après chaque échange<br>

--> **💬 Chat en temps réel**<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Système de messagerie permettant la communication entre utilisateurs<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Notifications lors de nouveaux messages ou demandes d’échange<br>

--> **📊 Tableau de bord utilisateur**<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Suivi des crédits<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Historique des échanges<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Activité récente<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Statistiques personnelles<br>

--> **🛠 Interface d’administration**<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Gestion des utilisateurs<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Gestion des compétences<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Modération des échanges<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Accès aux statistiques globales<br>

## 🧩 Conception & Documentation

Le projet comprend plusieurs livrables essentiels pour garantir une structure robuste et professionnelle.

--> **📐 UML :**

1. Diagramme des cas d’utilisation
2. Diagramme de classes

--> **🎨 Maquettage : Design complet réalisé sur Figma**

--> **📘 Documentation API**

1. Documentation détaillée de l’ensemble des routes de l’API
2. Structure des réponses
   
--> **🗂 Cahier des charges**

1. Contexte général
2. Analyse du besoin
3. Objectifs du projet
4. Fonctionnalités
5. Architecture logicielle

--> **🗓️ Planification du projet avec Jira**

1. Organisation et gestion des tâches via Jira
2. Répartition par sprints
3. Suivi du développement

## **📦 Deliverables (Liens)**

1. Cahier des charges :
[![Google Docs](https://img.shields.io/badge/📋_Cahier_des_Charges-View-blue?style=for-the-badge&logo=googledocs)](https://docs.google.com/document/d/1GJmJlgPByMii3xBBhvE7MmQdXmkawIPvA5mkfWOSg3Q/edit?tab=t.0#heading=h.3knb4dh0h6rk)
2. Planification avec Jira :
3. Diagrammes UML :
   - Diagramme des cas d’utilisation :
   - Diagramme de classes :
4. Maquettes Figma :
5. Documentation API :
6. Application déployée :

## 👥 Équipe

**Salma ELQADI** — Développeuse Fullstack / Chef de Projet<br>
**Salma Harda** — Superviseure Académique








