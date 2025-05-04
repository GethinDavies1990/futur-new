import { fetchSanityLive } from '@/sanity/lib/fetch'
import { PortableText } from 'next-sanity'
import Pretitle from '@/ui/Pretitle'
import { cn } from '@/lib/utils'
import css from './MediaCarousel.module.css'
import { MdPermMedia } from 'react-icons/md'
import { groq } from 'next-sanity'
import Image from 'next/image'

interface MediaItem {
	_key: string
	_type: 'media'
	_id: string
	title?: string
	mediaType?: 'image' | 'video'
	media?: {
		asset?: {
			_id: string
			url: string
			metadata: {
				lqip: string
				dimensions: { width: number; height: number }
				aspectRatio: number
			}
		}
	}
}

export default async function MediaCarousel({
	pretitle,
	intro,
	items,
	autoScroll = true,
	duration = 12,
}: Partial<{
	pretitle: string
	intro: any
	items: MediaItem[]
	autoScroll?: boolean
	duration?: number
}>) {
	const isReferenceArray = items?.some((item) => '_ref' in item)

	const fetchedItems =
		!items || isReferenceArray
			? await fetchSanityLive<MediaItem[]>({
					query: groq`
						*[_id in $ids] {
							_id,
							_key,
							_type,
							title,
							mediaType,
							media {
								asset -> {
									_id,
									url,
									metadata {
										lqip,
										dimensions { width, height },
										aspectRatio
									}
								}
							}
						}
					`,
					params: { ids: items?.map((item: any) => item._ref) },
				})
			: items

	// Sort to match original CMS order
	const originalOrder = items?.map((item: any) => item._ref || item._id)
	const allItems = originalOrder
		? fetchedItems.sort(
				(a, b) => originalOrder.indexOf(a._id) - originalOrder.indexOf(b._id),
			)
		: fetchedItems

	// Duplicate for seamless scroll
	const duplicatedItems = [...allItems, ...allItems]

	return (
		<div className="bg-black">
			<section className="section headings:text-black py-8 text-gray-600">
				{(pretitle || intro) && (
					<header className="richtext mx-auto max-w-screen-sm text-center text-balance">
						<div className="flex items-start justify-center">
							<MdPermMedia
								size={30}
								className="bg-accent mr-2 rounded-full text-white"
							/>
							<Pretitle>{pretitle}</Pretitle>
						</div>
						<PortableText value={intro} />
					</header>
				)}

				<figure
					className={cn(
						'mx-auto flex items-center gap-2 pb-4',
						autoScroll
							? `${css.track} overflow-hidden`
							: 'flex-wrap justify-center',
					)}
					style={
						{
							'--count': allItems?.length,
							'--dur': `${duration}s`,
						} as React.CSSProperties
					}
				>
					{duplicatedItems?.map((item, i) => {
						const isImage = item.mediaType === 'image'
						const isVideo = item.mediaType === 'video'
						const mediaUrl = item.media?.asset?.url

						if (!mediaUrl) return null

						return (
							<div
								key={`${item._key || item._id}-${i}`}
								className={cn(
									'flex shrink-0 items-center justify-center rounded-lg bg-black',
									isImage
										? 'aspect-square h-[300px] w-[300px]'
										: 'aspect-video h-[300px] w-[533px]', // 16:9 ratio at 300px height
								)}
								style={{ '--index': i } as React.CSSProperties}
							>
								{isImage ? (
									<Image
										src={mediaUrl}
										alt={item.title || 'Image'}
										width={300}
										height={300}
										className="h-full w-full rounded-lg object-cover"
										loading="lazy"
									/>
								) : (
									<video
										src={mediaUrl}
										className="h-full w-full rounded-lg object-cover"
										autoPlay
										loop
										muted
										playsInline
									/>
								)}
							</div>
						)
					})}
				</figure>
			</section>
		</div>
	)
}
