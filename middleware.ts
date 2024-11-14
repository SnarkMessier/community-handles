import { NextResponse, type NextRequest } from "next/server";

export function middleware(request) {
  return NextResponse.next(); // Temporarily disable any rewrites
}

  // Check if the request hostname matches 'nyr.social'
  if (url.hostname === "nyr.social") {
    return NextResponse.next(); // Proceed normally
  }

  // Optional fallback handling if the domain is different
  return NextResponse.rewrite(new URL("/", url));
}

export const config = {
  matcher: [
    // Match all paths except for API and Next.js internals
    "/((?!api/|_next/).*)",
  ],
};
