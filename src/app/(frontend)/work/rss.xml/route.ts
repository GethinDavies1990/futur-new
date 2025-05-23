import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { WORK_DIR } from '@/lib/env'
import resolveUrl from '@/lib/resolveUrl'
import { Feed } from 'feed'
import { escapeHTML, toHTML } from '@portabletext/to-html'
import { urlFor } from '@/sanity/lib/image'
import { DEFAULT_LANG } from '@/lib/i18n'

export async function GET() {
	const { work, posts, copyright } = await fetchSanityLive<{
		work: Sanity.Page
		posts: Array<Sanity.WorkPost & { image?: string }>
		copyright: string
	}>({
		query: groq`{
      'work': *[_type == 'page' && metadata.slug.current == '${WORK_DIR}'][0]{
        _type,
        title,
        metadata,
        'image': metadata.image.asset->url,
      },
      'posts': *[_type == 'work.post']{
        _type,
        body,
        publishDate,
        authors[]->,
        metadata,
        'image': metadata.image.asset->url,
        language,
      },
      'copyright': pt::text(*[_type == 'site'][0].copyright)
    }`,
	})

	if (!work || !posts) {
		return new Response(
			'Missing either a case page or case posts in Sanity Studio',
			{ status: 500 },
		)
	}

	const url = resolveUrl(work)

	const feed = new Feed({
		title: work?.title || work.metadata.title,
		description: work.metadata.description,
		link: url,
		id: url,
		copyright,
		favicon: process.env.NEXT_PUBLIC_BASE_URL + '/favicon.ico',
		language: DEFAULT_LANG,
		generator: 'https://sanitypress.dev',
	})

	posts.map((post) => {
		const url = resolveUrl(post, { language: post.language })

		return feed.addItem({
			title: escapeHTML(post.metadata.title),
			description: post.metadata.description,
			id: url,
			link: url,
			published: new Date(post.publishDate),
			date: new Date(post.publishDate),
			author: post.authors?.map((author) => ({ name: author.name })),
			content: toHTML(post.body, {
				components: {
					types: {
						image: ({ value: { alt = '', caption, source, ...value } }) => {
							const img = `<img src="${urlFor(value).url()}" alt="${escapeHTML(alt)}" />`
							const figcaption =
								caption && `<figcaption>${escapeHTML(caption)}</figcaption>`
							const aSource = source && `<a href="${source}">(Source)</a>`
							return `<figure>${[img, figcaption, aSource].filter(Boolean).join(' ')}</figure>`
						},
						admonition: ({ value: { title, content } }) =>
							`<dl><dt>${title}</dt><dd>${escapeHTML(content)}</dd></dl>`,
						code: ({ value }) =>
							`<pre><code>${escapeHTML(value.code)}</code></pre>`,
					},
				},
			}),
			image: post.image,
		})
	})

	return new Response(feed.atom1(), {
		headers: {
			'Content-Type': 'application/atom+xml',
		},
	})
}
