import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Game from '../../../../models/Game';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();

        // Await params for Next.js 15
        const { id } = await params;

        const game = await Game.findOne({ publicId: id });

        if (!game) {
            return NextResponse.json({ error: 'Game not found' }, { status: 404 });
        }

        return NextResponse.json({
            creatorName: game.creatorName,
            creatorPhoto: game.creatorPhoto
        });

    } catch (error) {
        console.error('Error fetching game:', error);
        return NextResponse.json({ error: 'Failed to fetch game' }, { status: 500 });
    }
}
