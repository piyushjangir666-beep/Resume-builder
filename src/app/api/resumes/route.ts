import { NextResponse } from 'next/server';

// This app uses localStorage for persistence.
// This route exists for future backend integration.
export async function GET() {
  return NextResponse.json({ resumes: [], message: 'Resumes are stored in localStorage on the client.' });
}

export async function POST() {
  return NextResponse.json({ success: true });
}
