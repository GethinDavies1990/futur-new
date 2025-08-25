import { cookies } from 'next/headers'
import { DEFAULT_LANG } from '@/lib/i18n'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { stegaClean } from '@sanity/client/stega'
import sortFeaturedPosts from './sortFeaturedPosts'
import { Suspense } from 'react'
import PostPreviewLarge from '../PostPreviewLarge'
import FilterList from '../WorkList/FilterList'
import PostPreview from '../PostPreview'
import Paginated from './Paginated'

export default async function WorkFrontpage({
	mainPost,
	showFeaturedPostsFirst,
	itemsPerPage,
}: Partial<{
	mainPost: 'recent' | 'featured'
	showFeaturedPostsFirst: boolean
	itemsPerPage: number
}>) {
	const lang = (await cookies()).get('lang')?.value ?? DEFAULT_LANG

	const posts = await fetchSanityLive<Sanity.WorkPost[]>({
		query: groq`
			*[
				_type == 'work.post'
				${!!lang ? `&& select(defined(language) => language == '${lang}', true)` : ''}
			]|order(publishDate desc){
				_type,
				_id,
				featured,
				metadata,
				categories[]->,
				authors[]->,
				publishDate,
				language
			}
		`,
	})

	const [firstPost, ...otherPosts] =
		stegaClean(mainPost) === 'featured' ? sortFeaturedPosts(posts) : posts

	return (
		<div>
			<section className="section space-y-12">
				<PostPreviewLarge post={firstPost} />

				<hr />

				<FilterList />

				<Suspense
					fallback={
						<ul className="grid gap-x-8 gap-y-12 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
							{Array.from({ length: itemsPerPage ?? 6 }).map(
								(_, i) => (
									<li key={i}>
										<PostPreview skeleton />
									</li>
								),
							)}
						</ul>
					}
				>
					<Paginated
						posts={sortFeaturedPosts(
							otherPosts,
							showFeaturedPostsFirst,
						)}
						itemsPerPage={itemsPerPage}
					/>
				</Suspense>
			</section>
		</div>
	)
}
