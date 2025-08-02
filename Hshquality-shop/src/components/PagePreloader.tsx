'use client';

import { useEffect } from 'react';
import { preloadPages } from '@/hooks/usePageContent';

export default function PagePreloader() {
  useEffect(() => {
    // Précharger les pages après un court délai pour ne pas bloquer le chargement initial
    const timer = setTimeout(() => {
      preloadPages(['info', 'contact', 'social']);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}