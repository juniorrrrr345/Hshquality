# 🚀 Variables d'Environnement pour Render - Bot @jsjshsheejdbot

## 📋 Copier-Coller Direct pour Render

Voici les **3 variables d'environnement** à configurer dans Render :

### 1. BOT_TOKEN
```
8128299360:AAEWmbRLjkTaQYP17GsiGm5vhQv8AcJLKIY
```

### 2. ADMIN_ID
```
7670522278
```

### 3. MONGODB_URI
```
mongodb+srv://hshquality1:GiNw1wNagCQ5PGya@hshquality.thwctpo.mongodb.net/?retryWrites=true&w=majority&appName=hshquality
```

## 📦 Instructions Rapides pour Render

1. **Allez sur** : https://render.com
2. **Créez** : New+ → Web Service
3. **Connectez** : Votre repository GitHub (Hshquality)
4. **Configuration** :
   - **Build Command** : `npm install`
   - **Start Command** : `node bot.js`
   - **Environment** : Node
   - **Plan** : Free

5. **Variables d'Environnement** (Environment) :
   
   | Key | Value |
   |-----|-------|
   | `BOT_TOKEN` | `8128299360:AAEWmbRLjkTaQYP17GsiGm5vhQv8AcJLKIY` |
   | `ADMIN_ID` | `7670522278` |
   | `MONGODB_URI` | `mongodb+srv://hshquality1:GiNw1wNagCQ5PGya@hshquality.thwctpo.mongodb.net/?retryWrites=true&w=majority&appName=hshquality` |

## ✅ Vérification après déploiement

1. **Dans les logs Render**, vous devriez voir :
   ```
   ✅ Bot démarré avec succès
   ✅ Connecté à MongoDB
   📍 Database: hshquality
   ✅ Configuration chargée depuis MongoDB
   ```

2. **Sur Telegram** :
   - Ouvrez @jsjshsheejdbot
   - Tapez `/start` pour voir le menu
   - Tapez `/admin` pour accéder au panel d'administration

## 🎯 Votre Bot est configuré avec :

- **Bot** : @jsjshsheejdbot
- **Admin** : ID 7670522278 (vous)
- **Database** : hshquality sur MongoDB Atlas
- **Fonctionnalités** : Toutes activées (menu, admin, réseaux sociaux, etc.)

## ⚠️ Important

- **Ne partagez jamais** ces informations
- **Gardez ce fichier** pour référence
- **Supprimez `.env`** avant de push sur GitHub (il est dans .gitignore)

## 🆘 En cas de problème

1. Vérifiez que MongoDB Atlas autorise toutes les IPs (0.0.0.0/0)
2. Vérifiez les logs dans Render
3. Assurez-vous que le bot n'est pas déjà actif ailleurs

---

✨ **Tout est prêt !** Déployez sur Render et votre bot sera opérationnel.