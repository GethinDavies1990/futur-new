// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'

// Known crawlers + social bots. If it's a bot, DO NOTHING.
const BOT_RE =
	/(googlebot|bingbot|slurp|duckduckgo|baiduspider|yandex|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegram)/i

export default function middleware(req: NextRequest) {
	const ua = req.headers.get('user-agent') || ''
	if (BOT_RE.test(ua)) return NextResponse.next()

	// ⚠️ TEMP: Disable all redirects/re-writes for humans too while we stabilise indexing.
	// If you *must* keep your language redirect, put it back later—after pages are indexed.
	return NextResponse.next()
}

// Only run on real pages, not assets/API.
export const config = {
	matcher: ['/((?!_next/|api/|admin|favicon.ico|robots.txt|sitemap.xml).*)'],
}
