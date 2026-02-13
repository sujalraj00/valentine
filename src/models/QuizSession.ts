import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
}

export interface IQuizSession extends Document {
    sessionId: string;
    player1Id: string; // The creator
    player2Id?: string; // The joiner
    p1Ready: boolean;
    p2Ready: boolean;
    p1Score: number;
    p2Score: number;
    p1Finished: boolean;
    p2Finished: boolean;
    proposalAccepted: boolean;
    p2Answers?: Record<string, string>;
    currentQuestionIndex: number; // For synchronization if needed
    questions: IQuizQuestion[];
    createdAt: Date;
}

const QuizSessionSchema: Schema = new Schema({
    sessionId: { type: String, required: true, unique: true },
    player1Id: { type: String, required: true },
    player2Id: { type: String },
    p1Ready: { type: Boolean, default: false },
    p2Ready: { type: Boolean, default: false },
    p1Score: { type: Number, default: 0 },
    p2Score: { type: Number, default: 0 },
    p1Finished: { type: Boolean, default: false },
    p2Finished: { type: Boolean, default: false },
    proposalAccepted: { type: Boolean, default: false },
    p2Answers: { type: Map, of: String, default: {} }, // Store QuestionID -> Answer mapping
    currentQuestionIndex: { type: Number, default: 0 },
    questions: [
        {
            question: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctAnswer: { type: String, required: true },
        }
    ],
    createdAt: { type: Date, default: Date.now, expires: 86400 } // Auto-delete after 24h
});

const QuizSession: Model<IQuizSession> = mongoose.models.QuizSession || mongoose.model<IQuizSession>('QuizSession', QuizSessionSchema);

export default QuizSession;
