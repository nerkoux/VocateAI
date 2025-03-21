import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  mbtiResult: String,
  mbtiResponses: Object,
  skillRatings: Object,
  completedAt: Date,
  assessmentCompleted: {
    type: Boolean,
    default: false
  },
  careerGuidance: String,
  learningResources: Array,
  // Add subscription-related fields
  subscriptionStatus: {
    type: String,
    enum: ['none', 'active', 'canceled', 'past_due'],
    default: 'none'
  },
  subscriptionPlan: {
    type: String,
    enum: ['BASIC', 'STANDARD', 'PREMIUM'],
    default: 'BASIC'
  },
  stripeCustomerId: String,
  stripeSubscriptionId: String,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);