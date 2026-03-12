import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function verifyAuth(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { error: 'Not authorized to access this route', status: 401 };
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return { error: 'Not authorized to access this route', status: 401 };
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // We return the user ID so it can be used in the API route
      return { userId: decoded.id };
    } catch (err) {
      return { error: 'Not authorized to access this route', status: 401 };
    }
  } catch (error) {
    return { error: 'Server Error during authentication', status: 500 };
  }
}

// Helper to easily return unauthorized response
export function authResponse(authResult) {
    return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status });
}
