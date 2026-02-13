import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICoupleCard extends Document {
    cardId: string;
    partner1Image: string; // Base64
    partner2Image: string; // Base64
    romanticMessage: string;
    theme: string;
    createdAt: Date;
}

const CoupleCardSchema: Schema = new Schema({
    cardId: { type: String, required: true, unique: true },
    partner1Image: { type: String, required: true },
    partner2Image: { type: String, required: true },
    romanticMessage: { type: String, required: true },
    theme: { type: String, default: 'modern' },
    createdAt: { type: Date, default: Date.now }
});

const CoupleCard: Model<ICoupleCard> = mongoose.models.CoupleCard || mongoose.model<ICoupleCard>('CoupleCard', CoupleCardSchema);

export default CoupleCard;
