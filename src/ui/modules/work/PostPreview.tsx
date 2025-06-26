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
		<div className="group relative isolate flex h-full flex-col space-y-2 overflow-hidden">
			<figure className="relative aspect-video shadow-lg">
				<Img
					className="aspect-video w-full rounded-sm object-cover transition-all group-hover:scale-105 group-hover:brightness-110"
					image={post?.metadata.image}
					width={700}
					alt={post?.metadata.title}
				/>

				{post?.featured && (
					<span className="absolute top-0 right-0 rounded-sm bg-white p-2 text-xs">
						Featured
					</span>
				)}
			</figure>
			<div className="p-1">
				<div className="py-2">
					<Categories
						className="flex flex-wrap gap-x-2 text-xs"
						categories={post?.categories}
					/>
				</div>

				<div className={cn('h4', skeleton && 'skeleton-2')}>
					<Link
						className="text-red-black"
						href={resolveUrl(post, { base: false })}
					>
						<span className="absolute inset-0 text-xl" />
						{post?.metadata.title}
					</Link>
				</div>

				<div className="grow text-gray-500">
					<p className="line-clamp-3">{post?.metadata.description}</p>
				</div>
				<div className="empty:skeleton mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
					<div className="bg-accent rounded-full px-4 py-2 text-xs text-black">
						View now
					</div>
				</div>
			</div>
		</div>
	)
}
