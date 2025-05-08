import { notFound } from 'next/navigation'
import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'
import { client } from '@/sanity/lib/client'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { WORK_DIR } from '@/lib/env'
import { MODULES_QUERY, TRANSLATIONS_QUERY } from '@/sanity/lib/queries'
import { languages, type Lang } from '@/lib/i18n'
import errors from '@/lib/errors'

export default async function Page({ params }: Props) {
	const post = await getPost(await params)
	if (!post) notFound()
	return <Modules modules={post.modules} workPost={post} />
}

export async function generateMetadata({ params }: Props) {
	const post = await getPost(await params)
	if (!post) notFound()
	return processMetadata(post)
}

export async function generateStaticParams() {
	const slugs = await client.fetch<string[]>(
		groq`*[_type == 'work.post' && defined(metadata.slug.current)].metadata.slug.current`,
	)

	return slugs.map((slug) => ({ slug: slug.split('/') }))
}

async function getPost(params: Params) {
	const workTemplateExists = await fetchSanityLive<boolean>({
		query: groq`count(*[_type == 'global-module' && path == $path]) > 0`,
		params: { path: `${WORK_DIR}/` },
	})

	if (!workTemplateExists) throw new Error(errors.missingWorkTemplate)

	const { slug, lang } = processSlug(params)

	return await fetchSanityLive<Sanity.WorkPost & { modules: Sanity.Module[] }>({
		query: groq`*[
			_type == 'work.post' &&
			metadata.slug.current == $slug
			${lang ? '&& language == $lang' : ''}
		][0]{
			...,
			company,
			body[]{
				...,
				_type == 'image' => { asset-> }
			},
			bodySecondary[]{
				...,
				_type == 'image' => { asset-> }
			},
			image1 {
				asset->{
					_id,
					url,
					metadata { lqip, dimensions, aspectRatio }
				}
			},
			image1Alt,
			image2 {
				asset->{
					_id,
					url,
					metadata { lqip, dimensions, aspectRatio }
				}
			},
			image2Alt,
			image3 {
				asset->{
					_id,
					url,
					metadata { lqip, dimensions, aspectRatio }
				}
			},
			image3Alt,
			'readTime': length(string::split(pt::text(body), ' ')) / 200,
			'headings': body[style in ['h2', 'h3']]{
				style,
				'text': pt::text(@)
			},
			categories[]->,
			authors[]->,
			metadata {
				...,
				'ogimage': image.asset->url + '?w=1200'
			},
			'modules': (
				*[_type == 'global-module' && path == '*'].before[]{ ${MODULES_QUERY} }
				+ *[_type == 'global-module' && path == $path].before[]{ ${MODULES_QUERY} }
				+ *[_type == 'global-module' && path == $path].after[]{ ${MODULES_QUERY} }
				+ *[_type == 'global-module' && path == '*'].after[]{ ${MODULES_QUERY} }
			),
			${TRANSLATIONS_QUERY},
		}`,
		params: {
			slug,
			...(lang ? { lang } : {}),
			path: `${WORK_DIR}/`,
		},
	})
}

type Params = { slug: string[] }

type Props = {
	params: Promise<Params>
}

function processSlug(params: Params) {
	const lang = languages.includes(params.slug[0] as Lang)
		? params.slug[0]
		: undefined

	const slug = params.slug.join('/')

	return {
		slug: lang ? slug.replace(new RegExp(`^${lang}/`), '') : slug,
		lang,
	}
}
