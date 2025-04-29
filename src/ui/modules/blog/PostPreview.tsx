import Link from 'next/link'
import resolveUrl from '@/lib/resolveUrl'
import { Img } from '@/ui/Img'
import Date from '@/ui/Date'
import Categories from './Categories'
import Authors from './Authors'
import { cn } from '@/lib/utils'

export default function PostPreview({
	post,
	skeleton,
}: {
	post?: Sanity.BlogPost
	skeleton?: boolean
}) {
	if (!post && !skeleton) return null

	return (
		<div className="group relative isolate flex h-full flex-col space-y-2 rounded-lg border-1 border-gray-100 bg-white p-2">
			<figure className="bg-ink relative aspect-video overflow-hidden rounded-xl">
				<Img
					className="aspect-video w-full object-cover transition-all group-hover:scale-105 group-hover:brightness-110"
					image={post?.metadata.image}
					width={700}
					alt={post?.metadata.title}
				/>

				{post?.featured && (
					<span className="pill-button absolute top-0 right-4 rounded-t-none py-1 text-xs">
						Featured
					</span>
				)}
			</figure>

			<div className={cn('h4', skeleton && 'skeleton-2')}>
				<Link
					className="text-gray-900"
					href={resolveUrl(post, { base: false })}
				>
					<span className="absolute inset-0" />
					{post?.metadata.title}
				</Link>
			</div>

			<div className="grow">
				<p className="line-clamp-3 text-sm empty:h-[3lh]">
					{post?.metadata.description}
				</p>
			</div>

			{(post?.authors?.length || skeleton) && (
				<Authors
					className="flex flex-wrap items-center gap-4 text-sm text-gray-600"
					authors={post?.authors}
					skeleton={skeleton}
				/>
			)}

			<hr />

			<div className="empty:skeleton flex flex-wrap items-center justify-between gap-x-4 text-xs text-gray-600">
				<Date value={post?.publishDate} />
				<Categories
					className="flex flex-wrap gap-x-2 text-xs"
					categories={post?.categories}
				/>
			</div>
		</div>
	)
}
