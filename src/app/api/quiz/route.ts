import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import QuizSession from '../../../models/QuizSession';

const DEFAULT_QUESTIONS = [
    { question: "What's my favorite food?", options: ["Pizza", "Sushi", "Tacos", "Pasta"], correctAnswer: "Pizza" }, // Placeholders
    { question: "What time do I wake up?", options: ["6 AM", "7 AM", "8 AM", "9 AM"], correctAnswer: "7 AM" },
    { question: "What's my favorite color?", options: ["Red", "Blue", "Pink", "Green"], correctAnswer: "Red" },
    { question: "Where was our first date?", options: ["Cafe", "Park", "Cinema", "Restaurant"], correctAnswer: "Cafe" },
    { question: "What's my dream travel destination?", options: ["Paris", "Tokyo", "New York", "London"], correctAnswer: "Tokyo" },
    { question: "What's my favorite movie genre?", options: ["Comedy", "Horror", "Action", "Romance"], correctAnswer: "Romance" },
    { question: "What's my hidden talent?", options: ["Singing", "Cooking", "Painting", "Gaming"], correctAnswer: "Singing" },
    { question: "What's my favorite season?", options: ["Spring", "Summer", "Autumn", "Winter"], correctAnswer: "Spring" },
    { question: "What's my coffee order?", options: ["Latte", "Espresso", "Cappuccino", "Black"], correctAnswer: "Latte" },
    { question: "What's my favorite animal?", options: ["Cat", "Dog", "Rabbit", "Hamster"], correctAnswer: "Dog" }
];

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { action, sessionId, playerId, score, ready, finished } = body;

        if (action === 'create') {
            const newSessionId = Math.random().toString(36).substr(2, 9);
            const player1Id = Math.random().toString(36).substr(2, 9);

            const session = await QuizSession.create({
                sessionId: newSessionId,
                player1Id,
                questions: DEFAULT_QUESTIONS // In a real app, these could be custom
            });

            return NextResponse.json({ success: true, sessionId: newSessionId, playerId: player1Id }, { status: 201 });
        }

        if (action === 'join') {
            const session = await QuizSession.findOne({ sessionId });
            if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 });
            if (session.player2Id) return NextResponse.json({ error: 'Session full' }, { status: 400 });

            const player2Id = Math.random().toString(36).substr(2, 9);
            session.player2Id = player2Id;
            await session.save();

            return NextResponse.json({ success: true, playerId: player2Id });
        }

        if (action === 'update') {
            const session = await QuizSession.findOne({ sessionId });
            if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 });

            if (playerId === session.player1Id) {
                if (ready !== undefined) session.p1Ready = ready;
                if (score !== undefined) session.p1Score = score;
                if (finished !== undefined) session.p1Finished = finished;
            } else if (playerId === session.player2Id) {
                if (ready !== undefined) session.p2Ready = ready;
                if (score !== undefined) session.p2Score = score;
                if (finished !== undefined) session.p2Finished = finished;
            } else {
                return NextResponse.json({ error: 'Invalid player ID' }, { status: 403 });
            }

            await session.save();
            return NextResponse.json({ success: true, session });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('Quiz API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });

        const session = await QuizSession.findOne({ sessionId: id });
        if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 });

        return NextResponse.json(session);
    } catch (error) {
        console.error('Quiz GET Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
