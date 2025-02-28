import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  const cookieStore = await cookies();
  cookieStore.delete('auth-token')
  return response;
}