import moduleProps from '@/lib/moduleProps'
import Date from '@/ui/Date'
import Categories from './Categories'
import Authors from './Authors'
import ReadTime from './ReadTime'
import { LiaReadme } from 'react-icons/lia'
import TableOfContents from '@/ui/modules/RichtextModule/TableOfContents'
import Content from '@/ui/modules/RichtextModule/Content'
import { cn } from '@/lib/utils'
import css from './PostContent.module.css'

export default function PostContent({
	post,
	...props
}: { post?: Sanity.CasePagePost } & Sanity.Module) {
	if (!post) return null

	const showTOC = !post.hideTableOfContents || !!post.headings?.length

	return (
		<article {...moduleProps(props)}>
			<header className="section headings:text-black space-y-6 py-30 text-center text-gray-600">
				<h1 className="h1 text-balance">{post.metadata.title}</h1>
				<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
					<Date value={post.publishDate} />
					<Categories
						className="flex flex-wrap gap-x-2"
						categories={post.categories}
						linked
					/>
					<div className="flex items-center">
						<LiaReadme size={20} className="mr-2" />
						<ReadTime value={post.readTime} />
					</div>
				</div>

				{post.authors?.length && (
					<div className="text-xs">
						<p>Written by</p>
						<Authors
							className="flex flex-wrap items-center justify-center gap-4"
							authors={post.authors}
							linked
						/>
					</div>
				)}
			</header>

			<div
				className={cn(
					'section grid gap-8',
					showTOC && 'lg:grid-cols-[1fr_auto]',
				)}
			>
				{showTOC && (
					<aside className="lg:sticky-below-header mx-auto w-full max-w-lg self-start rounded-md bg-gray-100 text-gray-600 [--offset:1rem] lg:order-1 lg:w-3xs lg:p-8">
						<TableOfContents headings={post.headings} />
					</aside>
				)}

				<Content
					value={post.body}
					className={cn(
						css.body,
						'headings:text-gray-800 grid max-w-screen-md text-gray-500',
					)}
				>
					<hr />
				</Content>
			</div>
		</article>
	)
}
