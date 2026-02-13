import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGame extends Document {
    publicId: string;
    creatorName: string;
    creatorPhoto: string; // Base64 string
    partnerName?: string;
    dateChoices?: string[];
    finished?: boolean;
    createdAt: Date;
}

const GameSchema: Schema = new Schema({
    publicId: { type: String, required: true, unique: true },
    creatorName: { type: String, required: true },
    creatorPhoto: { type: String, required: true }, // Storing base64 image directly
    partnerName: { type: String },
    dateChoices: { type: [String], default: [] },
    finished: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

// Check if model exists to prevent overwrite error in dev hot reload
// BUT force delete if schema changed (implicitly handled by restart usually, but explicitly helps here)
if (process.env.NODE_ENV === 'development') {
    if (mongoose.models.Game) {
        delete mongoose.models.Game;
    }
}

const Game: Model<IGame> = mongoose.models.Game || mongoose.model<IGame>('Game', GameSchema);

export default Game;
