import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Game from '../../../../models/Game';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb', // Set limit for base64 images
        },
    },
};

export async function POST(request: Request) {
    try {
        await dbConnect();

        const body = await request.json();
        const { creatorName, creatorPhoto } = body;

        if (!creatorName || !creatorPhoto) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const publicId = Math.random().toString(36).substr(2, 9);

        const game = await Game.create({
            publicId,
            creatorName,
            creatorPhoto
        });

        return NextResponse.json({ success: true, gameId: game.publicId }, { status: 201 });

    } catch (error) {
        console.error('Error creating game:', error);
        return NextResponse.json({ error: 'Failed to create game' }, { status: 500 });
    }
}
