import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: "/blog",
};

export function middleware(request) {
    const url = request.nextUrl.clone();

    if (url.pathname.startsWith("/blog/")) {
        url.pathname = url.pathname.replace(/^\/blog/, "");
        return NextResponse.redirect(url);
    }
}
