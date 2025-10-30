import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Image from '@/models/Image';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');
    const category = searchParams.get('category');

    let query = {};
    if (section) query.section = section;
    if (category) query.category = category;

    const images = await Image.find(query).sort({ order: 1 });
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const image = await Image.create(body);
    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { _id, ...updateData } = body;
    const image = await Image.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json(image);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await Image.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
