import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = new URL(request.url);

  // Only allow specific rewrites if hostname matches
  if (url.hostname === "nyr.social") {
    return NextResponse.next(); // Proceed normally for nyr.social
  }

  // Fallback behavior for other hostnames, if needed
  const fallbackUrl = new URL("/", url);
  return NextResponse.rewrite(fallbackUrl);
}

export const config = {
  matcher: [
    "/((?!api/|_next/).*)", // Match paths, excluding API and Next.js internals
  ],
};
