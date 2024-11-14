import { NextResponse, type NextRequest } from "next/server"
import { getDomain } from "./lib/utils"

export function middleware(request: NextRequest) {
  const url = new URL(request.url)
  const { domain, subdomain } = getDomain(url.hostname)

  // Ensure domain is correctly recognized, modify condition as needed
  if (domain === "nyr.social") {
    if (subdomain && subdomain !== process.env.LANDING_SUBDOMAIN) {
      return NextResponse.rewrite(
        new URL(`/${domain}/${subdomain}${url.pathname}${url.search}`, url)
      )
    } else {
      return NextResponse.rewrite(
        new URL(`/${domain}${url.pathname}${url.search}`, url)
      )
    }
  }

  // Optional: Handle case where domain does not match expected value
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|js/|proxy/|[\\w-]+\\.\\w+|[a-zA-Z0-9-_.]+/[a-zA-Z0-9-_]+/opengraph-image).*)",
  ],
}
