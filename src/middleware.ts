// middleware.ts
import {
	NextResponse,
	type NextRequest,
	type MiddlewareConfig,
} from 'next/server'
import { getTranslations } from './sanity/lib/queries'
import { DEFAULT_LANG } from './lib/i18n'

export default async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// ✅ Let Googlebot (and all bots) pass through with no redirects
	const ua = request.headers.get('user-agent')?.toLowerCase() || ''
	if (
		ua.includes('googlebot') ||
		ua.includes('bingbot') ||
		ua.includes('slurp')
	) {
		return NextResponse.next()
	}

	// ✅ Skip Next.js internals, API, admin etc
	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api') ||
		pathname.startsWith('/admin') ||
		pathname === '/favicon.ico'
	) {
		return NextResponse.next()
	}

	const langCookie = request.cookies.get('lang')?.value
	const T = await getTranslations()

	// ✅ If no translations, skip
	if (!T?.length) return NextResponse.next()

	// Is this path one of the translated slugs?
	const available = T.find((t) =>
		[t.slug, ...(t.translations?.map(({ slug }) => slug) ?? [])].includes(
			pathname,
		),
	)

	if (!available) return NextResponse.next()

	const cookieMatchesCurrentPrefix =
		langCookie ===
			available.translations?.find((t) =>
				[t.slugBlogAlt, t.slug].includes(pathname),
			)?.language ||
		(langCookie === DEFAULT_LANG && pathname === available.slug)

	if (!cookieMatchesCurrentPrefix) {
		const target = available.translations?.find(
			(t) => t.language === langCookie,
		)

		const url =
			target?.language === DEFAULT_LANG
				? available.slug
				: (target?.slugBlogAlt ?? target?.slug)

		if (url) {
			return NextResponse.redirect(new URL(url, request.url))
		}
	}

	return NextResponse.next()
}

export const config: MiddlewareConfig = {
	matcher: ['/((?!favicon.ico|_next|api|admin).*)'],
}
