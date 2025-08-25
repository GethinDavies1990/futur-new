import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'

import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import {
	MODULES_QUERY,
	GLOBAL_MODULE_PATH_QUERY,
	TRANSLATIONS_QUERY,
} from '@/sanity/lib/queries'
import { languages } from '@/lib/i18n'

// ✳️ Force true SSR (no static files, no ISR caches)
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'default-no-store'

// ✅ Correct typing – Next passes a plain object, not a Promise
type Params = { slug?: string[] }
type Props = { params: Params }

export default async function Page({ params }: Props) {
	const page = await getPage(params)
	if (!page) notFound()
	return <Modules modules={page.modules} page={page} />
}

export async function generateMetadata({ params }: Props) {
	const page = await getPage(params)
	if (!page) notFound()
	return processMetadata(page)
}

// ❌ IMPORTANT: REMOVE generateStaticParams for this catch-all route.
// Leaving it in will keep `x-nextjs-prerender: 1` and you’ll get SSG again.
// If you need static params for blog only, move that into the blog segment.

async function getPage(params: Params) {
	const { slug, lang } = processSlug(params)
	const { isEnabled } = await draftMode()

	if (isEnabled) {
		return fetchSanityLive<Sanity.Page>({
			query: PAGE_QUERY(lang),
			params: { slug },
		})
	}

	return client.fetch<Sanity.Page>(PAGE_QUERY(lang), { slug })
}

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
