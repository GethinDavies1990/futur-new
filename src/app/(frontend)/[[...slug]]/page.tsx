// src/app/(frontend)/[[...slug]]/page.tsx
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { groq } from 'next-sanity'

import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'
import { client } from '@/sanity/lib/client'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import {
	MODULES_QUERY,
	GLOBAL_MODULE_PATH_QUERY,
	TRANSLATIONS_QUERY,
} from '@/sanity/lib/queries'
import { languages } from '@/lib/i18n'

// ---- Route segment config: FORCE SSR (Next.js 15 needs literals here)
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'
export const dynamicParams = true

// Types
type Params = { slug?: string[] }
type PageProps = { params: Params }

// Page
export default async function Page({ params }: PageProps) {
	const page = await getPage(params)
	if (!page) notFound()
	return <Modules modules={page.modules} page={page} />
}

// Metadata
export async function generateMetadata({ params }: PageProps) {
	const page = await getPage(params)
	if (!page) notFound()
	return processMetadata(page)
}

// ---- Data fetching
async function getPage(params: Params) {
	const { slug, lang } = processSlug(params)

	// ✅ In Next.js 15, draftMode() is async
	const { isEnabled } = await draftMode()

	if (isEnabled) {
		return fetchSanityLive<any>({
			query: PAGE_QUERY(lang),
			params: { slug },
		})
	}

	return client.fetch<any>(PAGE_QUERY(lang), { slug })
}

// ---- GROQ
const PAGE_QUERY = (lang?: string) => groq`*[
  _type == 'page' &&
  metadata.slug.current == $slug
  ${lang ? `&& language == '${lang}'` : ''}
][0]{
  ...,
  'modules': (
    *[_type == 'global-module' && path == '*'].before[]{ ${MODULES_QUERY} }
    + *[_type == 'global-module' && path != '*' && ${GLOBAL_MODULE_PATH_QUERY}].before[]{ ${MODULES_QUERY} }
    + modules[]{ ${MODULES_QUERY} }
    + *[_type == 'global-module' && path != '*' && ${GLOBAL_MODULE_PATH_QUERY}].after[]{ ${MODULES_QUERY} }
    + *[_type == 'global-module' && path == '*'].after[]{ ${MODULES_QUERY} }
  ),
  parent[]->{ metadata { slug } },
  metadata {
    ...,
    'ogimage': image.asset->url + '?w=1200'
  },
  ${TRANSLATIONS_QUERY},
}`

// ---- Helpers
function processSlug(params: Params) {
	const lang =
		params.slug && languages.includes(params.slug[0])
			? params.slug[0]
			: undefined

	if (!params.slug) return { slug: 'index', lang }

	const slug = params.slug.join('/')

	if (lang) {
		const processed = slug.replace(new RegExp(`^${lang}/?`), '')
		return { slug: processed === '' ? 'index' : processed, lang }
	}

	return { slug }
}
