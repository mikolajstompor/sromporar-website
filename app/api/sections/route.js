import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Section from '@/models/Section';

export async function GET(request) {
  try {
    await dbConnect();
    const sections = await Section.find({}).sort({ order: 1 });
    return NextResponse.json(sections);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const section = await Section.create(body);
    return NextResponse.json(section, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { _id, ...updateData } = body;
    const section = await Section.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json(section);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await Section.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
