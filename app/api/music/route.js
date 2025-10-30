import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Music from '@/models/Music';

export async function GET(request) {
  try {
    await dbConnect();
    const music = await Music.find({}).sort({ order: 1 });
    return NextResponse.json(music);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const music = await Music.create(body);
    return NextResponse.json(music, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { _id, ...updateData } = body;
    const music = await Music.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json(music);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await Music.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
