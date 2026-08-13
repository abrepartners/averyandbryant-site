import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Case-sensitive legacy path redirects.
 *
 * These CANNOT live in next.config.ts: Next.js `redirects()` matches `source`
 * case-INSENSITIVELY, so a "/Gallery" -> "/gallery" rule also catches
 * "/gallery" itself and self-loops forever (308 -> /gallery -> 308 -> ...).
 * Middleware sees the exact pathname, so we can compare case-sensitively and
 * only redirect the capitalized variant.
 *
 * "/Gallery" was indexed by Google (28 impressions, avg position 1.5) and was
 * returning a 404 after the redirect rule was pulled to stop the loop.
 */
const CASE_SENSITIVE_REDIRECTS: Record<string, string> = {
  "/Gallery": "/gallery",
};

export function middleware(request: NextRequest) {
  const destination = CASE_SENSITIVE_REDIRECTS[request.nextUrl.pathname];

  if (destination) {
    const url = request.nextUrl.clone();
    url.pathname = destination;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Only run on the exact paths we remap, so middleware stays off the hot path
  // for every other request.
  matcher: ["/Gallery"],
};
