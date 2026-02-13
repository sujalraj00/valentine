import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGame extends Document {
    publicId: string;
    creatorName: string;
    creatorPhoto: string; // Base64 string
    createdAt: Date;
}

const GameSchema: Schema = new Schema({
    publicId: { type: String, required: true, unique: true },
    creatorName: { type: String, required: true },
    creatorPhoto: { type: String, required: true }, // Storing base64 image directly
    createdAt: { type: Date, default: Date.now },
});

// Check if model exists to prevent overwrite error in dev hot reload
const Game: Model<IGame> = mongoose.models.Game || mongoose.model<IGame>('Game', GameSchema);

export default Game;
