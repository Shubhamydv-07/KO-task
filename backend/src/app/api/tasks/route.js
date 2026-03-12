import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Task from '@/models/Task';
import { verifyAuth, authResponse } from '@/middleware/auth';

// GET all tasks for logged in user
export async function GET(request) {
  try {
    const authResult = await verifyAuth(request);
    if (authResult.error) return authResponse(authResult);

    await dbConnect();
    const tasks = await Task.find({ userId: authResult.userId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    console.error('Fetch tasks error:', error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

// Add a new task
export async function POST(request) {
  try {
    const authResult = await verifyAuth(request);
    if (authResult.error) return authResponse(authResult);

    await dbConnect();
    const body = await request.json();

    // Add user to body
    body.userId = authResult.userId;

    const task = await Task.create(body);

    return NextResponse.json({ success: true, data: task }, { status: 201 });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return NextResponse.json({ success: false, error: messages }, { status: 400 });
    }
    console.error('Create task error:', error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}
