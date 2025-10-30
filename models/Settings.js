import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'Mikołaj Stompór — Art Is Life',
  },
  tagline: {
    type: String,
    default: 'Essence of Art',
  },
  heroTitle: {
    type: String,
    default: 'MIKOŁAJ STOMPÓR',
  },
  heroSubtitle: {
    type: String,
    default: 'Essence of Art',
  },
  biographyTitle: {
    type: String,
    default: 'Biografia',
  },
  biographyImage: {
    type: String,
    default: '',
  },
  biographyText: {
    type: String,
    default: '',
  },
  contactEmail: {
    type: String,
    default: 'mikolaj.stompor@art.pl',
  },
  contactPhone: {
    type: String,
    default: '+48 123 456 789',
  },
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
    spotify: String,
    youtube: String,
  },
  maintenanceMode: {
    type: Boolean,
    default: false,
  },
  theme: {
    primaryColor: {
      type: String,
      default: '#D4AF37',
    },
    secondaryColor: {
      type: String,
      default: '#2C1810',
    },
    accentColor: {
      type: String,
      default: '#FFD700',
    },
  },
}, {
  timestamps: true,
});

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
