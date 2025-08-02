'use client';

import { useState, useEffect } from 'react';

interface PageData {
  title: string;
  content: string;
  updatedAt?: Date;
}

// Cache en mémoire pour éviter les rechargements
const pageCache = new Map<string, PageData>();

export function usePageContent(slug: string, initialContent?: string) {
  const [content, setContent] = useState<string>(initialContent || pageCache.get(slug)?.content || '');
  const [title, setTitle] = useState<string>(pageCache.get(slug)?.title || '');
  const [isLoading, setIsLoading] = useState(!initialContent && !pageCache.has(slug));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si on a déjà le contenu en cache et qu'il est récent (moins de 5 minutes), on l'utilise
    const cached = pageCache.get(slug);
    if (cached && cached.updatedAt) {
      const cacheAge = Date.now() - new Date(cached.updatedAt).getTime();
      if (cacheAge < 5 * 60 * 1000) { // 5 minutes
        setContent(cached.content);
        setTitle(cached.title);
        setIsLoading(false);
        return;
      }
    }

    // Sinon, on charge depuis l'API
    const loadContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`/api/pages/${slug}`, {
          headers: {
            'Cache-Control': 'no-cache',
          }
        });
        
        if (!response.ok) {
          throw new Error('Erreur de chargement');
        }
        
        const data = await response.json();
        
        // Mettre à jour le cache
        pageCache.set(slug, {
          title: data.title || '',
          content: data.content || '',
          updatedAt: data.updatedAt
        });
        
        setContent(data.content || '');
        setTitle(data.title || '');
      } catch (err) {
        console.error('Erreur chargement page:', err);
        setError('Impossible de charger le contenu');
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [slug]);

  // Fonction pour invalider le cache
  const invalidateCache = () => {
    pageCache.delete(slug);
  };

  return { content, title, isLoading, error, invalidateCache };
}

// Fonction pour précharger les pages
export async function preloadPages(slugs: string[]) {
  const promises = slugs.map(async (slug) => {
    if (!pageCache.has(slug)) {
      try {
        const response = await fetch(`/api/pages/${slug}`);
        if (response.ok) {
          const data = await response.json();
          pageCache.set(slug, {
            title: data.title || '',
            content: data.content || '',
            updatedAt: data.updatedAt
          });
        }
      } catch (error) {
        console.error(`Erreur préchargement ${slug}:`, error);
      }
    }
  });

  await Promise.all(promises);
}

// Fonction pour mettre à jour le cache après une sauvegarde
export function updatePageCache(slug: string, content: string, title?: string) {
  const cached = pageCache.get(slug) || { title: '', content: '' };
  pageCache.set(slug, {
    ...cached,
    content,
    title: title || cached.title,
    updatedAt: new Date()
  });
}