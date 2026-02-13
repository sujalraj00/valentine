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
            console.log(`[API] Game not found: ${id}`);
            return NextResponse.json({ error: 'Game not found' }, { status: 404 });
        }

        console.log(`[API] Returning game data for ${id}:`, { finished: game.finished, choices: game.dateChoices?.length });

        return NextResponse.json({
            creatorName: game.creatorName,
            creatorPhoto: game.creatorPhoto,
            partnerName: game.partnerName,
            dateChoices: game.dateChoices,
            finished: game.finished
        });

    } catch (error) {
        console.error('Error fetching game:', error);
        return NextResponse.json({ error: 'Failed to fetch game' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();

        console.log(`[API] PATCH request for ${id}:`, body);

        const game = await Game.findOne({ publicId: id });

        if (!game) {
            return NextResponse.json({ error: 'Game not found' }, { status: 404 });
        }

        if (body.partnerName) game.partnerName = body.partnerName;
        if (body.dateChoices) game.dateChoices = body.dateChoices;
        if (body.finished !== undefined) game.finished = body.finished;

        await game.save();
        console.log(`[API] Game updated: ${id} -> finished: ${game.finished}`);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating game:', error);
        return NextResponse.json({ error: 'Failed to update game' }, { status: 500 });
    }
}
