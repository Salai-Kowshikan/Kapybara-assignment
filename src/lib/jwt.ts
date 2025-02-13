
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || '';

if (JWT_SECRET === '') {
  throw new Error('JWT_SECRET is not defined');
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return payload;
  } catch (error) {
    console.error('Invalid token:', error);
    throw new Error('Invalid token');
  }
}