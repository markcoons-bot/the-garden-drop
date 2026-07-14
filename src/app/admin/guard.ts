import 'server-only';
import { redirect } from 'next/navigation';
import { isAuthed } from '@/lib/auth';

/**
 * The real gate. src/middleware.ts only checks that a cookie exists; this is
 * where the signature, the timing-safe compare and the 12-hour expiry are
 * actually enforced, on the Node runtime, before a single row is read.
 *
 * Every page under /admin except the login screen calls this first.
 */
export async function requireAdmin(next?: string): Promise<void> {
  if (await isAuthed()) return;
  redirect(next ? `/admin/login?next=${encodeURIComponent(next)}` : '/admin/login');
}
