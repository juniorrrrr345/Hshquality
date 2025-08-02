'use client';

import { useState, useEffect } from 'react';
import { usePageContent } from '@/hooks/usePageContent';

interface SocialLink {
  _id?: string;
  name: string;
  url: string;
  icon: string;
  color: string;
  isActive: boolean;
}

interface SocialPageProps {
  initialContent?: string;
  initialLinks?: SocialLink[];
}

export default function SocialPage({ initialContent, initialLinks }: SocialPageProps) {
  const { content, isLoading: contentLoading } = usePageContent('social', initialContent);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialLinks || []);
  const [linksLoading, setLinksLoading] = useState(!initialLinks);

  useEffect(() => {
    // Charger depuis le cache local d'abord
    const cached = localStorage.getItem('socialLinks');
    if (cached && !initialLinks) {
      try {
        const parsedLinks = JSON.parse(cached);
        setSocialLinks(parsedLinks.filter((link: SocialLink) => link.isActive));
      } catch (e) {
        console.error('Erreur parsing cache:', e);
      }
    }

    // Puis charger depuis l'API
    if (!initialLinks) {
      loadSocialLinks();
    }
  }, [initialLinks]);

  const loadSocialLinks = async () => {
    try {
      const response = await fetch('/api/social-links', {
        headers: { 'Cache-Control': 'no-cache' }
      });
      
      if (response.ok) {
        const data = await response.json();
        const activeLinks = data.filter((link: SocialLink) => link.isActive);
        setSocialLinks(activeLinks);
        
        // Mettre à jour le cache
        localStorage.setItem('socialLinks', JSON.stringify(data));
      }
    } catch (error) {
      console.error('Erreur chargement liens sociaux:', error);
    } finally {
      setLinksLoading(false);
    }
  };

  const parseMarkdown = (text: string) => {
    return text
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl sm:text-2xl font-bold text-white mb-4 mt-8">$1</h2>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
  };

  const isLoading = contentLoading || linksLoading;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Titre de la page */}
      <div className="text-center mb-8">
        <h1 className="shop-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3">
          Réseaux Sociaux
        </h1>
        <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      ) : (
        <>
          {/* Contenu texte */}
          {content && (
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 mb-8 animate-fadeIn">
              <div 
                className="prose prose-lg max-w-none text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
              />
            </div>
          )}

          {/* Liens sociaux */}
          {socialLinks.length > 0 && (
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 animate-fadeIn">
              <h3 className="text-xl font-bold text-white mb-6 text-center">Suivez-nous</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link._id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center space-x-4 border border-white/20 hover:scale-105 transform"
                    style={{
                      borderColor: `${link.color}40`,
                      boxShadow: `0 0 20px ${link.color}20`
                    }}
                  >
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      style={{ backgroundColor: link.color }}
                    />
                    <span className="text-3xl relative z-10">{link.icon}</span>
                    <div className="relative z-10">
                      <span className="font-medium text-lg">{link.name}</span>
                      <p className="text-sm text-gray-300 opacity-80">Cliquez pour visiter</p>
                    </div>
                    <svg className="w-5 h-5 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Message si aucun contenu */}
          {!content && socialLinks.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              <p>Aucun contenu disponible</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}