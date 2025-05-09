import moduleProps from '@/lib/moduleProps'
import Date from '@/ui/Date'
import Categories from './Categories'
import { Img } from '@/ui/Img'
import TableOfContents from '@/ui/modules/RichtextModule/TableOfContents'
import Content from '@/ui/modules/RichtextModule/Content'
import { cn } from '@/lib/utils'
import css from './PostContent.module.css'
import Image from 'next/image'

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
				<div className="section max-w-5xl">
					<Content
						value={workPost.bodySecondary}
						className={cn(css.body, 'headings:text-white text-gray-300')}
					>
						<hr />
					</Content>
					<div className="flex-row justify-between gap-4 md:flex">
						<div className="mb-2 flex-row text-gray-300">
							<p className="mb-2 font-bold">Client:</p>
							<p>{workPost.company}</p>
						</div>{' '}
						<div className="mb-6 flex-row text-gray-300">
							<p className="mb-2 font-bold">Launch Date</p>{' '}
							<Date value={workPost.publishDate} />
						</div>
					</div>
					<div className="flex-row">
						<p className="mb-2 font-bold text-gray-300">Deliverables:</p>
						<Categories
							className="flex flex-wrap gap-x-2"
							categories={workPost.categories}
							linked
						/>
					</div>
				</div>
			</div>

			<div className="section max-w-6xl">
				<Img
					className="relative h-full w-full rounded-xl object-cover"
					image={workPost?.metadata.image}
					width={800}
					alt={workPost?.metadata.title}
				/>
			</div>

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
