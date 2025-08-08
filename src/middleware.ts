// middleware.ts (in your project root)
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";
import { updateSession } from "./app/[locale]/_utils/supabase/middleware";

// Create the internationalization middleware
const intlMiddleware = createMiddleware({
  ...routing,
  // Redirect paths without locale to default locale
  localePrefix: "always",
});

export async function middleware(request: NextRequest) {
  // First, handle internationalization
  const intlResponse = intlMiddleware(request);

  // Then, handle Supabase session update
  const supabaseResponse = await updateSession(request);

  // If intl middleware returns a response (redirect), use that
  // Otherwise, use the Supabase response
  return intlResponse || supabaseResponse;
}

export const config = {
  // Match all pathnames except for
  // - api routes
  // - _next (Next.js internals)
  // - _static (inside /public)
  // - all files inside /public (e.g. /favicon.ico)
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
