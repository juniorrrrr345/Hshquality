#!/bin/bash
# Script de démarrage pour Render

echo "📍 Répertoire actuel : $(pwd)"
echo "📂 Contenu du répertoire :"
ls -la

# Démarrer le bot
echo "🚀 Démarrage du bot Telegram..."
node bot.js