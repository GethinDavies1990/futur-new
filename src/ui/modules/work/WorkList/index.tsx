import { cookies } from 'next/headers'
import { DEFAULT_LANG } from '@/lib/i18n'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import moduleProps from '@/lib/moduleProps'
import Pretitle from '@/ui/Pretitle'
import { PortableText, stegaClean } from 'next-sanity'
import FilterList from './FilterList'
import { Suspense } from 'react'
import PostPreview from '../PostPreview'
import List from './List'
import { cn } from '@/lib/utils'

export default async function WorkList({
	pretitle,
	intro,
	layout,
	limit,
	showFeaturedPostsFirst,
	displayFilters,
	filteredCategory,
	...props
}: Partial<{
	pretitle: string
	intro: any
	layout: 'grid' | 'carousel'
	limit: number
	showFeaturedPostsFirst: boolean
	displayFilters: boolean
	filteredCategory: Sanity.WorkCategory
}> &
	Sanity.Module) {
	const lang = (await cookies()).get('lang')?.value ?? DEFAULT_LANG

	const posts = await fetchSanityLive<Sanity.WorkPost[]>({
		query: groq`
			*[
				_type == 'work.post'
				${!!lang ? `&& select(defined(language) => language == '${lang}', true)` : ''}
				${!!filteredCategory ? `&& $filteredCategory in categories[]->._id` : ''}
			]|order(
				${showFeaturedPostsFirst ? 'featured desc, ' : ''}
				publishDate desc
			)
			${limit ? `[0...${limit}]` : ''}
			{
				...,
				categories[]->,
				authors[]->
			}
		`,
		params: {
			filteredCategory: filteredCategory?._id || '',
			limit: limit ?? 0,
		},
	})

	const listClassName = cn(
		'items-stretch gap-x-8 gap-y-12',
		stegaClean(layout) === 'grid'
			? 'grid grid-cols-1 md:grid-cols-2'
			: 'carousel max-xl:full-bleed md:overflow-fade-r pb-4 [--size:320px] max-xl:px-4',
	)

	return (
		<div className="bg-white">
			<section className="section space-y-8" {...moduleProps(props)}>
				{intro && (
					<header>
						<Pretitle className="uppercase">{pretitle}</Pretitle>
						<div className="richtext headings:text-black text-gray-500">
							<PortableText value={intro} />
						</div>
					</header>
				)}

				{displayFilters && !filteredCategory && <FilterList />}

				<Suspense
					fallback={
						<ul className={listClassName}>
							{Array.from({ length: limit ?? 6 }).map((_, i) => (
								<li key={i}>
									<PostPreview skeleton />
								</li>
							))}
						</ul>
					}
				>
					<List posts={posts} className={listClassName} />
				</Suspense>
			</section>
		</div>
	)
}
