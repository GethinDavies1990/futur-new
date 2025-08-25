import { notFound, draftMode } from 'next/navigation'
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
import errors from '@/lib/errors'

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
    ]{
      'slug': metadata.slug.current
    }`,
	)

	return slugs.map(({ slug }) => ({ slug: slug.split('/') }))
}

async function getPage(params: Params) {
	const { slug, lang } = processSlug(params)

	// ✅ Check if Draft Mode is enabled
	const { isEnabled } = await draftMode()

	if (isEnabled) {
		// Use live mode for Sanity Preview
		return fetchSanityLive<Sanity.Page>({
			query: PAGE_QUERY(lang),
			params: { slug },
		})
	} else {
		// Use static client fetch for production
		return client.fetch<Sanity.Page>(PAGE_QUERY(lang), { slug })
	}
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

type Params = { slug?: string[] }

type Props = {
	params: Promise<Params>
}

function processSlug(params: Params) {
	const lang =
		params.slug && languages.includes(params.slug[0])
			? params.slug[0]
			: undefined

	if (params.slug === undefined)
		return {
			slug: 'index',
			lang,
		}

	const slug = params.slug.join('/')

	if (lang) {
		const processed = slug.replace(new RegExp(`^${lang}/?`), '')

		return {
			slug: processed === '' ? 'index' : processed,
			lang,
		}
	}

	return { slug }
}
