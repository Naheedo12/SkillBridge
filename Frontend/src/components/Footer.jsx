import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* À propos */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">À Propos</h3>
            <div className="text-sm text-gray-300 leading-relaxed space-y-2 text-justify">
              <p className="m-0">SkillBridge connecte les personnes pour</p>
              <p className="m-0">échanger leurs compétences sans argent,</p>
              <p className="m-0">grâce à un système de crédits transparent</p>
              <p className="m-0">et équitable.</p>
            </div>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Liens Utiles</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/a-propos" className="text-gray-300 hover:text-white transition-colors">
                  À propos de nous
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/regles" className="text-gray-300 hover:text-white transition-colors">
                  Règles de la communauté
                </Link>
              </li>
            </ul>
          </div>

          {/* Catégories */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Catégories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/categories/informatique" className="text-gray-300 hover:text-white transition-colors">
                  Informatique
                </Link>
              </li>
              <li>
                <Link to="/categories/langues" className="text-gray-300 hover:text-white transition-colors">
                  Langues
                </Link>
              </li>
              <li>
                <Link to="/categories/art" className="text-gray-300 hover:text-white transition-colors">
                  Art & Design
                </Link>
              </li>
              <li>
                <Link to="/categories/musique" className="text-gray-300 hover:text-white transition-colors">
                  Musique
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Restons Connectés</h3>
            <p className="mb-4 text-sm text-gray-300">Suivez-nous sur les réseaux sociaux</p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-gray-300">
          <p>© 2025 SkillBridge. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}