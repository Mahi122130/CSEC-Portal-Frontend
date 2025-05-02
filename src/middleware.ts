import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/', '/login', '/_next', '/favicon.ico'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  if (PUBLIC_ROUTES.some(route => path.startsWith(route))) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('accessToken')?.value;
  const role = request.cookies.get('role')?.value;

  // Only require accessToken, not role, to match client-side checks
  if (!accessToken || isTokenExpired(accessToken)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};

function isTokenExpired(token: string) {
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
}