// src/app/(frontend)/[[...slug]]/page.tsx
import { notFound } from 'next/navigation'
import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import {
	MODULES_QUERY,
	GLOBAL_MODULE_PATH_QUERY,
	TRANSLATIONS_QUERY,
} from '@/sanity/lib/queries'
import { languages } from '@/lib/i18n'
import errors from '@/lib/errors'

// 👇 literals only (no expressions)
export const dynamic = 'force-static'
export const revalidate = 3600 // 1 hour

type Params = { slug?: string[] }
type Props = { params: Promise<Params> }

export default async function Page({ params }: Props) {
	const page = await getPage(await params)
	if (!page) notFound()
	return <Modules modules={page.modules} page={page} />
}

export async function generateMetadata({ params }: Props) {
	const page = await getPage(await params)
	if (!page) notFound()
	return processMetadata(page)
}

export async function generateStaticParams() {
	const slugs = await client.fetch<{ slug: string }[]>(
		groq`*[
      _type == 'page' &&
      defined(metadata.slug.current) &&
      !(metadata.slug.current in ['index'])
    ]{ 'slug': metadata.slug.current }`,
	)
	return slugs.map(({ slug }) => ({ slug: slug.split('/') }))
}

async function getPage(params: Params) {
	const { slug, lang } = processSlug(params)

	const PAGE_QUERY = (l?: string) => groq`*[
    _type == 'page' &&
    metadata.slug.current == $slug
    ${l ? `&& language == '${l}'` : ''}
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
    metadata { ...,'ogimage': image.asset->url + '?w=1200' },
    ${TRANSLATIONS_QUERY},
  }`

	const page = await client.fetch<Sanity.Page>(PAGE_QUERY(lang), { slug })
	if (slug === 'index' && !page) throw new Error(errors.missingHomepage)
	return page
}

function processSlug(params: Params) {
	const lang =
		params.slug && languages.includes(params.slug[0])
			? params.slug[0]
			: undefined
	if (params.slug === undefined) return { slug: 'index', lang }
	const joined = params.slug.join('/')
	if (lang) {
		const processed = joined.replace(new RegExp(`^${lang}/?`), '')
		return { slug: processed === '' ? 'index' : processed, lang }
	}
	return { slug: joined }
}
