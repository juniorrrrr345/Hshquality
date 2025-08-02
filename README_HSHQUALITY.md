# Boutique Hshquality

## 🚀 Configuration rapide

### 1. Installation des dépendances
```bash
npm install
```

### 2. Configuration des variables d'environnement
Le fichier `.env` a déjà été créé avec vos configurations MongoDB et Cloudinary.

### 3. Lancer le projet en développement
```bash
npm run dev
```

L'application sera accessible sur : http://localhost:3000

## 📋 Configuration Cloudinary Upload Preset

Pour configurer votre Upload Preset sur Cloudinary :

### 1. Connectez-vous à votre compte Cloudinary
- URL : https://console.cloudinary.com/
- Cloud Name : `dxgocjrlf`

### 2. Créer un Upload Preset
1. Allez dans **Settings** (Paramètres) → **Upload**
2. Cliquez sur **"Add upload preset"**
3. Configurez comme suit :

#### Configuration recommandée :
- **Preset name** : `hshquality_products`
- **Signing Mode** : **Unsigned** (pour permettre les uploads depuis le frontend)
- **Folder** : `hshquality/products`

#### Paramètres de transformation :
- **Format** : Auto (webp avec fallback)
- **Quality** : Auto:best
- **Resize mode** : Limit
- **Width** : 1200
- **Height** : 1200

#### Paramètres additionnels :
- ✅ **Overwrite** : Activé
- ✅ **Unique filename** : Activé
- ✅ **Use filename** : Activé
- ✅ **Auto tagging** : 50 (optionnel)
- ✅ **Categorization** : Google tagging (optionnel)

### 3. Sauvegarder le preset
Cliquez sur **"Save"** pour créer le preset.

### 4. Mettre à jour le code (si nécessaire)
Si vous avez choisi un nom différent pour le preset, mettez à jour le fichier :
`/src/components/admin/CloudinaryUploader.tsx`

Recherchez la ligne :
```javascript
upload_preset: 'your_upload_preset_name'
```

Et remplacez par votre nom de preset.

## 🔐 Accès Admin

- URL : http://localhost:3000/admin
- Username : `admin`
- Password : `admin123`

⚠️ **Important** : Changez ces identifiants dans le fichier `.env` avant la mise en production !

## 📦 Déploiement sur Vercel

1. Pushez votre code sur GitHub
2. Connectez votre repository à Vercel
3. Ajoutez les variables d'environnement dans Vercel :
   - `MONGODB_URI`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `NEXTAUTH_SECRET` (générez une clé sécurisée)
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`

## 🛠️ Structure du projet

```
src/
├── app/              # Routes Next.js 14
├── components/       # Composants React
├── lib/             # Utilitaires et configurations
├── models/          # Modèles MongoDB
└── hooks/           # Custom React hooks
```

## 📞 Support

Pour toute question ou problème, référez-vous à la documentation dans le dossier `DUPLICATION_PACKAGE/`.