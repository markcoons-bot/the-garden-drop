import { NextResponse, type NextRequest } from 'next/server';

/**
 * ADMIN GATE — a presence check, and deliberately nothing more.
 *
 * Middleware runs on the edge runtime, where node:crypto does not exist. We
 * could re-implement the HMAC verification here with the Web Crypto API, but
 * then the signing logic would live in two places and would one day disagree
 * with itself — which is the classic way an auth system develops a hole.
 *
 * So this file does one cheap job: if there is no session cookie at all,
 * redirect to the login screen instead of rendering an admin page that would
 * only bounce you anyway. The CRYPTOGRAPHIC verification — signature, timing-
 * safe compare, 12-hour expiry — is done by isAuthed() in src/lib/auth.ts, on
 * the Node runtime, in the admin layout and in every /api/admin route handler.
 * A forged cookie gets past this middleware and gets nowhere.
 *
 * That is the correct division: middleware for routing, auth.ts for auth.
 */

// Must match ADMIN_COOKIE in src/lib/auth.ts. Duplicated as a literal because
// importing that module here would pull node:crypto into the edge bundle.
const ADMIN_COOKIE = 'gd_admin';

export function middleware(request: NextRequest): NextResponse {
  const { pathname, search } = request.nextUrl;

  if (pathname === '/admin/login') return NextResponse.next();

  const hasCookie = Boolean(request.cookies.get(ADMIN_COOKIE)?.value);
  if (hasCookie) return NextResponse.next();

  const login = request.nextUrl.clone();
  login.pathname = '/admin/login';
  login.search = '';
  // Come back to where you were going once you have signed in.
  if (pathname !== '/admin') {
    login.searchParams.set('next', `${pathname}${search}`);
  }
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ['/admin', '/admin/((?!login).*)'],
};
