import moduleProps from '@/lib/moduleProps'
import Date from '@/ui/Date'
import Categories from './Categories'
import { Img } from '@/ui/Img'
import TableOfContents from '@/ui/modules/RichtextModule/TableOfContents'
import Content from '@/ui/modules/RichtextModule/Content'
import { cn } from '@/lib/utils'
import css from './PostContent.module.css'

export default function WorkPostContent({
	workPost,
	...props
}: { workPost?: Sanity.WorkPost } & Sanity.Module) {
	if (!workPost) return null

	// Only check for work post type
	if (workPost._type !== 'work.post') {
		return null // Return null if it's not a work post
	}

	return (
		<article {...moduleProps(props)}>
			<div>
				<div className="relative aspect-video w-full">
					{/* Image */}
					<Img
						className="h-full w-full object-cover"
						image={workPost?.metadata.image}
						width={1200}
						alt={workPost?.metadata.title}
					/>

					{/* Gradient overlay + centered text */}
					<div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black to-transparent">
						<h1 className="px-4 text-center text-4xl text-white">
							{workPost.metadata.title}
						</h1>
					</div>
				</div>
				<header className="section headings:text-white text-gray-600">
					<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
						<Date value={workPost.publishDate} />
						<Categories
							className="flex flex-wrap gap-x-2"
							categories={workPost.categories}
							linked
						/>
						<p>{workPost.company}</p>
					</div>
				</header>
			</div>

			<Content
				value={workPost.bodySecondary}
				className={cn(
					css.body,
					'headings:text-gray-800 max-w-screen-4xl grid text-yellow-500',
				)}
			>
				<hr />
			</Content>
			<div className={cn('section grid gap-8')}>
				<Content
					value={workPost.body}
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
