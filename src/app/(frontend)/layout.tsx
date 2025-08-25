// src/app/(frontend)/[[...slug]]/page.tsx
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import type { Metadata, ResolvingMetadata } from 'next'

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

// Force full SSR; prevents prerender headers
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const runtime = 'nodejs'

type Params = { slug?: string[] }

export default async function Page({ params }: { params: Promise<Params> }) {
	const page = await getPage(await params)
	if (!page) notFound()
	return <Modules modules={page.modules} page={page} />
}

export async function generateMetadata(
	{ params }: { params: Promise<Params> },
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const page = await getPage(await params)
	if (!page) notFound()
	return processMetadata(page)
}

// — no generateStaticParams —

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
  metadata { ..., 'ogimage': image.asset->url + '?w=1200' },
  ${TRANSLATIONS_QUERY},
}`

function processSlug(params: Params) {
	const lang =
		params.slug && languages.includes(params.slug[0])
			? params.slug[0]
			: undefined
	if (params.slug === undefined) return { slug: 'index', lang }
	const slug = params.slug.join('/')
	if (lang) {
		const processed = slug.replace(new RegExp(`^${lang}/?`), '')
		return { slug: processed === '' ? 'index' : processed, lang }
	}
	return { slug }
}
