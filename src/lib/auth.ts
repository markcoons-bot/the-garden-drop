/**
 * ADMIN AUTH — deliberately small.
 *
 * A signed, httpOnly session cookie gated on a single ADMIN_PASSWORD. That is
 * the correct amount of auth for a two-person editorial team and it has no
 * third-party dependency. When you outgrow it, swap `verifyPassword` for
 * Supabase Auth (`supabase.auth.signInWithPassword`) and keep the rest.
 *
 * Local default password (dev only): "gardendrop".
 */

import 'server-only';
import { cookies } from 'next/headers';
import crypto from 'node:crypto';

const COOKIE = 'gd_admin';
const MAX_AGE = 60 * 60 * 12; // 12 hours

function secret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    'gardendrop-dev-secret-change-me'
  );
}

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'gardendrop';
}

function sign(value: string): string {
  const mac = crypto.createHmac('sha256', secret()).update(value).digest('hex');
  return `${value}.${mac}`;
}

function verify(signed: string | undefined): boolean {
  if (!signed) return false;
  const idx = signed.lastIndexOf('.');
  if (idx < 0) return false;
  const value = signed.slice(0, idx);
  const expected = sign(value);
  const a = Buffer.from(signed);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  if (!crypto.timingSafeEqual(a, b)) return false;

  const issued = Number(value.split(':')[1] ?? 0);
  return Date.now() - issued < MAX_AGE * 1000;
}

export function verifyPassword(input: string): boolean {
  const expected = adminPassword();
  const a = Buffer.from(input.padEnd(64).slice(0, 64));
  const b = Buffer.from(expected.padEnd(64).slice(0, 64));
  return crypto.timingSafeEqual(a, b);
}

export async function createSession(): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE, sign(`admin:${Date.now()}`), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function isAuthed(): Promise<boolean> {
  const jar = await cookies();
  return verify(jar.get(COOKIE)?.value);
}

export const ADMIN_COOKIE = COOKIE;
