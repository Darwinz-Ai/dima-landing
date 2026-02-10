import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
    const response = handleI18nRouting(request);

    // Check if the response is a redirect (307 or 308)
    if (response.status === 307 || response.status === 308) {
        const location = response.headers.get('location');
        if (location) {
            // Return a new redirect response with status 301
            return NextResponse.redirect(new URL(location, request.url), 301);
        }
    }

    return response;
}

export const config = {
    // Same matcher as before
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};