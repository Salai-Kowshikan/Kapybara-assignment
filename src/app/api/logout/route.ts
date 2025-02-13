import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  response.cookies.set('auth-token', '', { path: '/', maxAge: 0 });
  return response;
}