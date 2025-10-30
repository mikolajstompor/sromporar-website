import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Music from '@/models/Music';

export async function POST(request) {
  try {
    await dbConnect();
    const { platform, url, title } = await request.json();

    // Track social share (you can also create a separate ShareTracking model)
    // For now, we'll just increment the share count in the Music model if it's a music track

    console.log('Share tracked:', { platform, url, title });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
