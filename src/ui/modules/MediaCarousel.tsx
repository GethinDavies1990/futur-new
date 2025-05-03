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
	autoScroll,
	duration = 12,
}: Partial<{
	pretitle: string
	intro: any
	items: MediaItem[]
	autoScroll?: boolean
	duration?: number
}>) {
	// Fetch items with a GROQ query if items are not provided
	const allItems =
		!items || items.some((item) => '_ref' in item)
			? await fetchSanityLive<MediaItem[]>({
					query: groq`
          *[_type == 'media'] | order(title) {
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
				})
			: items

	console.log('Fetched Items:', allItems)
	return (
		<section className="section headings:text-black space-y-8 py-10 text-gray-600">
			{(pretitle || intro) && (
				<header className="richtext mx-auto max-w-screen-sm text-center text-balance">
					<div className="flex items-center justify-center">
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
					'mx-auto flex items-center gap-y-2 pb-4',
					autoScroll
						? `${css.track} `
						: 'flex-wrap justify-center gap-x-4 rounded-lg bg-blue-950 py-20',
				)}
				style={
					{
						'--count': allItems?.length,
						'--dur': `${duration}s`,
					} as React.CSSProperties
				}
			>
				{allItems?.map((item: MediaItem, i) => (
					<div
						key={item._key || i} // Use _key for better uniqueness
						className="flex h-[450px] w-[450px] shrink-0 items-center justify-center px-4 py-2"
						style={{ '--index': i } as React.CSSProperties}
					>
						{/* Check for media type and render accordingly */}
						{item.mediaType === 'image' && item.media?.asset?.url ? (
							<Image
								src={item.media.asset.url}
								alt={item.title || 'Image'}
								width={400} // You can adjust the size as necessary
								height={400} // This ensures the image is square
								className="max-h-full max-w-full object-cover"
								loading="lazy"
							/>
						) : item.mediaType === 'video' && item.media?.asset?.url ? (
							<video
								src={item.media.asset.url}
								className="aspect-video max-h-full max-w-full object-cover"
								autoPlay
								controls
							/>
						) : null}
					</div>
				))}
			</figure>
		</section>
	)
}
