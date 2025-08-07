const mongoose = require('mongoose');
require('dotenv').config();

// Connexion MongoDB avec options améliorées
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
};

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/telegram-bot', mongoOptions)
    .then(() => {
        console.log('✅ Connecté à MongoDB');
        console.log('📍 Database:', mongoose.connection.name);
    })
    .catch(err => {
        console.error('❌ Erreur connexion MongoDB:', err);
        process.exit(1);
    });

// Schéma pour la configuration du bot
const configSchema = new mongoose.Schema({
    botId: { type: String, default: 'main', unique: true, required: true },
    welcomeMessage: { type: String, default: "🤖 Bienvenue {firstname} sur notre bot!\n\nUtilisez les boutons ci-dessous pour naviguer." },
    welcomeImage: { type: String, default: null },
    infoText: { type: String, default: "ℹ️ Informations\n\nCeci est la section d'informations du bot." },
    miniApp: {
        url: { type: String, default: null },
        text: { type: String, default: "🎮 Mini Application" }
    },
    socialNetworks: [{
        name: String,
        url: String,
        emoji: String
    }],
    socialButtonsPerRow: { type: Number, default: 3 },
    lastModified: { type: Date, default: Date.now }
}, { timestamps: true });

const Config = mongoose.model('BotConfig', configSchema);

// Configuration par défaut - LANATIONDULAIT
const defaultConfig = {
    botId: 'main',
    welcomeMessage: "🥛 Bienvenue {firstname} chez LANATIONDULAIT!\n\n" +
                    "🏪 Votre destination privilégiée pour découvrir une sélection unique de produits laitiers de qualité.\n\n" +
                    "✨ Explorez notre boutique et profitez de nos offres exclusives!\n\n" +
                    "Utilisez les boutons ci-dessous pour naviguer.",
    welcomeImage: null,
    infoText: "ℹ️ **À propos de LANATIONDULAIT**\n\n" +
              "🥛 **Notre Mission**\n" +
              "Nous sommes votre destination privilégiée pour découvrir une sélection unique de produits laitiers de qualité supérieure.\n\n" +
              "🌟 **Nos Services**\n" +
              "• Produits laitiers frais et de qualité\n" +
              "• Livraison rapide et sécurisée\n" +
              "• Service client disponible 24/7\n" +
              "• Garantie satisfaction\n\n" +
              "📞 **Contact**\n" +
              "Email: contact@lanationdulait.com\n" +
              "Support: @lanationdulait_support\n\n" +
              "🚚 **Livraison**\n" +
              "Livraison gratuite à partir de 50€ d'achat!\n\n" +
              "_Merci de votre confiance!_ 🙏",
    miniApp: {
        url: "https://lanationdulait.vercel.app",
        text: "🛍️ Visiter la Boutique"
    },
    socialNetworks: [
        { name: "Boutique en ligne", url: "https://lanationdulait.vercel.app", emoji: "🛍️" },
        { name: "Canal Telegram", url: "https://t.me/lanationdulait", emoji: "📢" },
        { name: "Support", url: "https://t.me/lanationdulait_orders", emoji: "💬" },
        { name: "Instagram", url: "https://instagram.com/lanationdulait", emoji: "📷" },
        { name: "Facebook", url: "https://facebook.com/lanationdulait", emoji: "👍" },
        { name: "WhatsApp", url: "https://wa.me/message/LANATION", emoji: "💚" }
    ],
    socialButtonsPerRow: 3
};

// Charger la configuration depuis MongoDB
async function loadConfig() {
    try {
        console.log('📖 Chargement de la configuration...');
        let config = await Config.findOne({ botId: 'main' }).lean();
        
        // Forcer la mise à jour avec la config LANATIONDULAIT si nécessaire
        if (!config || config.welcomeMessage.includes('Bienvenue {firstname} sur notre bot!')) {
            console.log('🔄 Mise à jour vers la configuration LANATIONDULAIT...');
            await Config.deleteOne({ botId: 'main' });
            config = await Config.create(defaultConfig);
            console.log('✅ Configuration LANATIONDULAIT appliquée');
            return config.toObject();
        }
        
        console.log('✅ Configuration chargée:', {
            welcomeMessage: config.welcomeMessage?.substring(0, 50) + '...',
            welcomeImage: config.welcomeImage ? 'Définie' : 'Non définie',
            socialNetworks: config.socialNetworks?.length || 0,
            lastModified: config.lastModified
        });
        
        return config;
    } catch (error) {
        console.error('❌ Erreur lors du chargement de la configuration:', error);
        return defaultConfig;
    }
}

// Sauvegarder la configuration dans MongoDB
async function saveConfig(configData) {
    try {
        console.log('💾 Sauvegarde de la configuration...');
        
        // Nettoyer les données avant sauvegarde
        const dataToSave = {
            botId: 'main',
            welcomeMessage: configData.welcomeMessage,
            welcomeImage: configData.welcomeImage,
            infoText: configData.infoText,
            miniApp: configData.miniApp,
            socialNetworks: configData.socialNetworks,
            socialButtonsPerRow: configData.socialButtonsPerRow || 3,
            lastModified: new Date()
        };
        
        const config = await Config.findOneAndUpdate(
            { botId: 'main' },
            { $set: dataToSave },
            { 
                new: true, 
                upsert: true,
                runValidators: true
            }
        );
        
        console.log('✅ Configuration sauvegardée avec succès');
        console.log('📝 Détails sauvegardés:', {
            welcomeMessage: config.welcomeMessage?.substring(0, 50) + '...',
            welcomeImage: config.welcomeImage ? 'Définie' : 'Non définie',
            socialNetworks: config.socialNetworks?.length || 0
        });
        
        return true;
    } catch (error) {
        console.error('❌ Erreur lors de la sauvegarde de la configuration:', error);
        return false;
    }
}

// Réinitialiser la configuration (utile pour debug)
async function resetConfig() {
    try {
        await Config.deleteOne({ botId: 'main' });
        const newConfig = await Config.create(defaultConfig);
        console.log('🔄 Configuration réinitialisée');
        return newConfig.toObject();
    } catch (error) {
        console.error('❌ Erreur lors de la réinitialisation:', error);
        return defaultConfig;
    }
}

// Obtenir l'URL d'une image (stockée dans Cloudinary ou base64)
function getImagePath(imageUrl) {
    return imageUrl; // Retourne directement l'URL ou file_id Telegram
}

module.exports = {
    loadConfig,
    saveConfig,
    resetConfig,
    getImagePath,
    Config, // Exporter le modèle pour debug si nécessaire
    IMAGES_DIR: null // Plus utilisé avec MongoDB
};