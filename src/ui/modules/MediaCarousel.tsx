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
					'mx-auto flex items-center gap-1 pb-4', // Reduced gap around items
					autoScroll
						? `${css.track} overflow-fade overflow-hidden`
						: 'flex-wrap justify-center gap-1 rounded-lg bg-blue-950 py-10', // Adjusted padding and gap
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
						className="flex h-[500px] w-[500px] shrink-0 items-center justify-center px-1 py-2" // Adjusted item size and gap
						style={{ '--index': i } as React.CSSProperties}
					>
						{/* Check for media type and render accordingly */}
						{item.mediaType === 'image' && item.media?.asset?.url ? (
							<Image
								src={item.media.asset.url}
								alt={item.title || 'Image'}
								width={500} // Adjusted size for consistency
								height={500} // Square image
								className="max-h-full max-w-full rounded-lg object-cover"
								loading="lazy"
							/>
						) : item.mediaType === 'video' && item.media?.asset?.url ? (
							<video
								src={item.media.asset.url}
								className="aspect-video max-h-full max-w-full rounded-lg object-cover"
								autoPlay
							/>
						) : null}
					</div>
				))}
			</figure>
		</section>
	)
}
