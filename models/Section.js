import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  backgroundColor: {
    type: String,
    default: '#2C1810',
  },
  textColor: {
    type: String,
    default: '#FFFFFF',
  },
  order: {
    type: Number,
    default: 0,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    enum: ['text', 'gallery', 'music', 'contact', 'custom'],
    default: 'text',
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
});

export default mongoose.models.Section || mongoose.model('Section', SectionSchema);
