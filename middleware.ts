import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [ '/', '/users', '/auth/login'],
};
