import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import CoupleCard from '../../../models/CoupleCard';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { partner1Image, partner2Image, romanticMessage, theme } = body;

        if (!partner1Image || !partner2Image || !romanticMessage) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const cardId = Math.random().toString(36).substr(2, 12);

        const newCard = await CoupleCard.create({
            cardId,
            partner1Image,
            partner2Image,
            romanticMessage,
            theme
        });

        return NextResponse.json({ success: true, cardId: newCard.cardId }, { status: 201 });
    } catch (error) {
        console.error('Error creating couple card:', error);
        return NextResponse.json({ error: 'Failed to create card' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing card ID' }, { status: 400 });
        }

        const card = await CoupleCard.findOne({ cardId: id });

        if (!card) {
            return NextResponse.json({ error: 'Card not found' }, { status: 404 });
        }

        return NextResponse.json(card);
    } catch (error) {
        console.error('Error fetching couple card:', error);
        return NextResponse.json({ error: 'Failed to fetch card' }, { status: 500 });
    }
}
