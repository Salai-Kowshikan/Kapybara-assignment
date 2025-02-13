
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

if (JWT_SECRET === '') {
  throw new Error('JWT_SECRET is not defined');
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    console.error('Invalid token:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};