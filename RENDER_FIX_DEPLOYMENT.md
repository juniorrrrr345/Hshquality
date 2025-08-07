# 🛠️ Correction du Déploiement sur Render

## ❌ Problème actuel
Render cherche le fichier `bot.js` dans `/opt/render/project/src/bot.js` mais le fichier est à la racine.

## ✅ Solutions

### Solution 1 : Utiliser le script de démarrage (Recommandé)

Sur Render, changez la **Start Command** en :
```bash
bash start.sh
```

### Solution 2 : Utiliser le chemin direct

Changez la **Start Command** en :
```bash
cd /opt/render/project/src && node bot.js
```

### Solution 3 : Vérifier le Root Directory

Dans les paramètres de Render :
1. Allez dans **Settings** → **Build & Deploy**
2. Vérifiez le **Root Directory**
3. S'il est défini sur `src`, supprimez-le ou mettez `.`

## 📝 Étapes pour corriger

1. **Connectez-vous à Render**
2. **Allez dans votre service**
3. **Settings** → **Build & Deploy**
4. **Modifiez** :
   - **Root Directory** : Laissez vide ou mettez `.`
   - **Start Command** : `node bot.js`
5. **Save Changes**
6. **Manual Deploy** → **Deploy latest commit**

## 🔍 Vérification

Après redéploiement, vous devriez voir dans les logs :
```
✅ Bot démarré avec succès
✅ Connecté à MongoDB
📍 Database: hshquality
```

## 💡 Alternative : Réorganiser les fichiers

Si les solutions ci-dessus ne fonctionnent pas, nous pouvons déplacer les fichiers du bot dans le dossier `src/` :

```bash
# Commandes pour réorganiser (si nécessaire)
mkdir -p src/bot
mv bot*.js config.js keyboards.js models.js src/bot/
# Puis ajuster la Start Command : node src/bot/bot.js
```

Mais essayez d'abord les solutions 1-3 qui sont plus simples !