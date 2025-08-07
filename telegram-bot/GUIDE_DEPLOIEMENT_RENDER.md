# 🚀 Guide de Déploiement sur Render - Bot Telegram LANATION

## 📋 Prérequis

1. **Compte Render** : https://render.com
2. **Token Bot Telegram** : Obtenu depuis @BotFather
3. **MongoDB Atlas** : Base de données cloud (gratuite)
4. **Votre ID Telegram** : Pour l'administration

## 🔧 Variables d'Environnement Requises

### 1. **BOT_TOKEN** (Obligatoire)
- **Description** : Token de votre bot Telegram
- **Où l'obtenir** : 
  1. Ouvrez Telegram et cherchez @BotFather
  2. Tapez `/newbot` ou utilisez un bot existant
  3. Copiez le token fourni
- **Format** : `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`

### 2. **ADMIN_ID** (Obligatoire)
- **Description** : Votre ID Telegram pour accéder au panel admin
- **Comment l'obtenir** :
  1. Démarrez votre bot avec `/start`
  2. Tapez `/id`
  3. Copiez l'ID affiché
- **Format** : `123456789`

### 3. **MONGODB_URI** (Obligatoire)
- **Description** : URI de connexion MongoDB
- **Comment l'obtenir** :
  1. Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  2. Créez un cluster gratuit
  3. Créez un utilisateur database
  4. Obtenez la connection string
- **Format** : `mongodb+srv://username:password@cluster.mongodb.net/botdb?retryWrites=true&w=majority`

### 4. **PORT** (Optionnel)
- **Description** : Port du serveur HTTP
- **Valeur par défaut** : `3000`
- **Note** : Render configure automatiquement cette variable

## 📦 Déploiement sur Render

### Étape 1 : Préparer le repository

1. Assurez-vous que tous les fichiers sont sur GitHub
2. Vérifiez la présence de :
   - `package.json`
   - `bot.js`
   - `config.js`
   - `keyboards.js`
   - `models.js`

### Étape 2 : Créer un nouveau service

1. Connectez-vous à [Render](https://render.com)
2. Cliquez sur **"New +"** → **"Web Service"**
3. Connectez votre repository GitHub
4. Sélectionnez le repository contenant le bot

### Étape 3 : Configuration du service

**Build Command** :
```bash
npm install
```

**Start Command** :
```bash
node bot.js
```

**Environment** : `Node`

**Plan** : `Free` (suffisant pour commencer)

### Étape 4 : Ajouter les variables d'environnement

Dans la section **"Environment"** de Render :

1. Cliquez sur **"Add Environment Variable"**
2. Ajoutez chaque variable :

| Variable | Valeur |
|----------|---------|
| `BOT_TOKEN` | Votre token bot |
| `ADMIN_ID` | Votre ID Telegram |
| `MONGODB_URI` | Votre URI MongoDB |

### Étape 5 : Déployer

1. Cliquez sur **"Create Web Service"**
2. Attendez que le build se termine
3. Vérifiez les logs pour confirmer :
   - ✅ Bot démarré avec succès
   - ✅ Connecté à MongoDB
   - ✅ Configuration chargée

## 🔍 Vérification du déploiement

### 1. Vérifier les logs Render
```
✅ Bot démarré avec succès
✅ Connecté à MongoDB
✅ Configuration chargée depuis MongoDB
✅ X utilisateurs chargés
🔄 Serveur HTTP démarré sur le port 3000
```

### 2. Tester le bot sur Telegram
1. Ouvrez votre bot sur Telegram
2. Tapez `/start` - Devrait afficher le menu
3. Tapez `/admin` - Devrait afficher le panel admin (si vous êtes admin)

## 🛠️ Commandes disponibles

### Pour tous les utilisateurs :
- `/start` - Menu principal avec réseaux sociaux
- `/id` - Obtenir son ID Telegram

### Pour les administrateurs :
- `/admin` - Panel d'administration complet

## 📊 Fonctionnalités du panel admin

1. **📝 Modifier le message d'accueil**
2. **🖼️ Modifier la photo d'accueil**
3. **📱 Modifier la mini application**
4. **🌐 Gérer les réseaux sociaux**
5. **ℹ️ Modifier les informations**
6. **📢 Envoyer un message à tous**
7. **👥 Gérer les administrateurs**
8. **📊 Statistiques du bot**

## ⚠️ Dépannage

### Le bot ne démarre pas
- Vérifiez que `BOT_TOKEN` est correct
- Vérifiez les logs dans Render

### Erreur MongoDB
- Vérifiez que `MONGODB_URI` est correct
- Ajoutez votre IP dans MongoDB Atlas (0.0.0.0/0 pour tout autoriser)

### Pas d'accès admin
- Vérifiez que `ADMIN_ID` correspond à votre ID
- Utilisez `/id` pour vérifier votre ID

## 🔄 Mise à jour du bot

1. Poussez les changements sur GitHub
2. Render redéploiera automatiquement
3. Vérifiez les logs après le redéploiement

## 💡 Conseils

- **Sécurité** : Ne partagez jamais vos tokens
- **MongoDB** : Utilisez un nom de base de données unique
- **Logs** : Consultez régulièrement les logs Render
- **Backup** : MongoDB Atlas fait des backups automatiques

## 📞 Support

En cas de problème :
1. Vérifiez les logs dans Render
2. Consultez la documentation MongoDB Atlas
3. Vérifiez la documentation Telegram Bot API

---

✨ **Votre bot est maintenant prêt !** Profitez de toutes les fonctionnalités pour gérer votre communauté ou votre boutique.