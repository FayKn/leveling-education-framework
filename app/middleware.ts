import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const config = {
  matcher: "/api/:path*",
};

export function middleware(request: NextRequest) {
  const CACHE_CONTROL_MAX_AGE = 86400;

  const response = NextResponse.next();

  response.headers.set(
    "Cache-Control",
    `public, max-age=${CACHE_CONTROL_MAX_AGE}`
  );
  response.headers.set("Access-Control-Allow-Origin", "*");

  return response;
}
