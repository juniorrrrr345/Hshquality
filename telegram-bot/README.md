# 🤖 Bot Telegram LANATIONDULAIT

Ce dossier contient le bot Telegram configuré pour LANATIONDULAIT.

## 📦 Fichiers

- `bot.js` - Fichier principal du bot
- `config.js` - Configuration MongoDB
- `keyboards.js` - Claviers Telegram
- `models.js` - Modèles de données
- `package.json` - Dépendances

## 🚀 Déploiement sur Render

1. Créez un nouveau service sur Render
2. Pointez vers ce dossier : `telegram-bot`
3. Variables d'environnement :
   - `BOT_TOKEN` : Votre token bot
   - `ADMIN_ID` : Votre ID Telegram
   - `MONGODB_URI` : URI MongoDB

## ⚠️ Important

Ce bot est maintenant dans un dossier séparé pour ne pas interférer avec le déploiement Vercel de la boutique.