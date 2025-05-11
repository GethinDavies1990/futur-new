// AssetBlock.tsx
import Image from 'next/image'

type AssetBlockProps = {
	image?: {
		asset: {
			url: string
		}
		alt?: string
	}
	video?: {
		asset: {
			url: string
		}
	}
}

export default function AssetBlock({ image, video }: AssetBlockProps) {
	return (
		<div className="relative w-screen overflow-hidden">
			{/* Image with overlay */}
			{image?.asset?.url ? (
				<div className="relative w-full">
					<Image
						src={image.asset.url}
						alt={image.alt || 'Asset Image'}
						width={1920}
						height={1080}
						className="h-auto max-h-[60vh] w-full object-cover"
					/>
					{/* Overlay */}
					<div className="absolute inset-0 bg-black opacity-50" />
				</div>
			) : video?.asset?.url ? (
				<video
					src={video.asset.url}
					autoPlay
					loop
					muted
					playsInline
					className="h-auto max-h-[80vh] w-full object-cover"
				/>
			) : null}
		</div>
	)
}
