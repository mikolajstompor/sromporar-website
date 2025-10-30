import mongoose from 'mongoose';

const MusicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    default: 'Mikołaj Stompór',
  },
  description: {
    type: String,
    default: '',
  },
  audioUrl: {
    type: String,
    required: true, // URL do pliku MP3 lub link zewnętrzny (Spotify, YouTube)
  },
  coverImage: {
    type: String,
    default: '/images/default-music-cover.jpg',
  },
  duration: {
    type: Number, // w sekundach
    default: 0,
  },
  genre: {
    type: String,
    default: '',
  },
  releaseDate: {
    type: Date,
    default: Date.now,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  externalLinks: {
    spotify: String,
    youtube: String,
    soundcloud: String,
    appleMusic: String,
  },
  socialShares: {
    facebook: { type: Number, default: 0 },
    twitter: { type: Number, default: 0 },
    instagram: { type: Number, default: 0 },
  },
}, {
  timestamps: true,
});

export default mongoose.models.Music || mongoose.model('Music', MusicSchema);
