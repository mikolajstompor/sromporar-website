import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  url: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
  },
  category: {
    type: String,
    enum: ['gallery', 'biography', 'hero', 'artwork', 'other'],
    default: 'gallery',
  },
  order: {
    type: Number,
    default: 0,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  metadata: {
    width: Number,
    height: Number,
    size: Number,
    format: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Image || mongoose.model('Image', ImageSchema);
