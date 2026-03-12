import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Task from '@/models/Task';
import { verifyAuth, authResponse } from '@/middleware/auth';

// Toggle task status or update task
export async function PUT(request, { params }) {
  try {
    const authResult = await verifyAuth(request);
    if (authResult.error) return authResponse(authResult);

    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    let task = await Task.findById(id);

    if (!task) {
      return NextResponse.json({ success: false, error: 'Task not found' }, { status: 404 });
    }

    // Make sure user owns task
    if (task.userId.toString() !== authResult.userId) {
      return NextResponse.json({ success: false, error: 'Not authorized to update this task' }, { status: 401 });
    }

    task = await Task.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });

    return NextResponse.json({ success: true, data: task });
  } catch (error) {
    console.error('Update task error:', error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

// Delete a task
export async function DELETE(request, { params }) {
  try {
    const authResult = await verifyAuth(request);
    if (authResult.error) return authResponse(authResult);

    await dbConnect();
    const { id } = await params;

    const task = await Task.findById(id);

    if (!task) {
      return NextResponse.json({ success: false, error: 'Task not found' }, { status: 404 });
    }

    // Make sure user owns task
    if (task.userId.toString() !== authResult.userId) {
      return NextResponse.json({ success: false, error: 'Not authorized to delete this task' }, { status: 401 });
    }

    await task.deleteOne();

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error('Delete task error:', error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}
