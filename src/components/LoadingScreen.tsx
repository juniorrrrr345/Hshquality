'use client';

import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('shopSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        if (settings.backgroundImage) {
          setBackgroundImage(settings.backgroundImage);
        }
      }
    } catch (e) {
      console.error('Erreur chargement image:', e);
    }
  }, []);

  return (
    <div className="min-h-screen relative bg-black">
      {/* Image de fond si disponible */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      {/* Overlay noir */}
      <div className="absolute inset-0 bg-black/80"></div>
      
      {/* Contenu */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          {/* Cercle tournant avec image */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            {/* Image dans le cercle */}
            {backgroundImage && (
              <div 
                className="absolute inset-0 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              />
            )}
            {/* Bordure tournante */}
            <div className="absolute inset-0 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
          
          {/* Titre principal */}
          <h1 className="text-6xl sm:text-8xl font-black text-white mb-4 tracking-tight">
            HSHQUALITY
          </h1>
          
          {/* Sous-titre */}
          <p className="text-xl text-white/60 font-light tracking-wider">
            CHARGEMENT
          </p>
          
          {/* Copyright */}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-white/40 text-sm">
              © 2025 JUNIOR × HSHQUALITY
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}