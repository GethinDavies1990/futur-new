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
	post?: Sanity.WorkPost
	skeleton?: boolean
}) {
	if (!post && !skeleton) return null

	return (
		<div className="group relative isolate flex h-full flex-col space-y-2 overflow-hidden rounded-xl border border-gray-600 bg-black">
			<figure className="bg-ink relative aspect-video">
				<Img
					className="aspect-video w-full rounded-t-xl object-cover transition-all group-hover:scale-105 group-hover:brightness-110"
					image={post?.metadata.image}
					width={700}
					alt={post?.metadata.title}
				/>

				{post?.featured && (
					<span className="absolute top-0 right-0 rounded-sm rounded-t-none rounded-r-none bg-white p-2 text-xs">
						Featured
					</span>
				)}
			</figure>
			<div className="p-6">
				<div className={cn('h4', skeleton && 'skeleton-2')}>
					<Link className="text-white" href={resolveUrl(post, { base: false })}>
						<span className="absolute inset-0 text-xl" />
						{post?.metadata.title}
					</Link>
				</div>

				<div className="grow">
					<p className="line-clamp-3">{post?.metadata.description}</p>
				</div>
				<div className="empty:skeleton mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-600">
					<Categories
						className="flex flex-wrap gap-x-2 text-xs"
						categories={post?.categories}
					/>
					<div className="rounded-full bg-white px-4 py-2 text-xs text-black">
						View now
					</div>
				</div>
			</div>
		</div>
	)
}
