import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Settings from '@/models/Settings';

export async function GET(request) {
  try {
    await dbConnect();
    let settings = await Settings.findOne({});

    // Create default settings if none exist
    if (!settings) {
      settings = await Settings.create({});
    }

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();

    let settings = await Settings.findOne({});

    if (settings) {
      Object.assign(settings, body);
      await settings.save();
    } else {
      settings = await Settings.create(body);
    }

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
