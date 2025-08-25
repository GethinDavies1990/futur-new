import { PortableText } from '@portabletext/react'
import CTAList from '@/ui/CTAList'
import Code from './RichtextModule/Code'
import Reputation from '@/ui/Reputation'
import BookCallButton from '../BookCallButton'
import Image from 'next/image'

export default function CalloutAsset({
	content,
	ctas,
	media,
}: Partial<{
	content: any
	ctas: Sanity.CTA[]
	media: {
		image?: Sanity.Image
		video?: {
			asset: {
				_ref: string
				_type: string
				url: string
				metadata?: any
			}
		}
	}
}>) {
	return (
		<div className="py-20">
			<section className="section">
				<div className="headings:text-black grid grid-cols-1 items-center gap-10 md:grid-cols-2">
					{/* Content on the Left */}
					<div className="richtext text-gray-500">
						<PortableText
							value={content}
							components={{
								types: {
									code: ({ value }) => (
										<Code
											value={value}
											className="mx-auto max-w-max"
											theme="snazzy-light"
										/>
									),
									'reputation-block': ({ value }) => (
										<Reputation
											className="!mt-4"
											reputation={value.reputation}
										/>
									),
								},
							}}
						/>
						{!ctas && <BookCallButton />}
						<CTAList className="!mt-8" ctas={ctas} />
					</div>

					{/* Media on the Right */}
					<div className="mx-auto w-full">
						{media?.image ? (
							<Image
								src={media.image.asset.url}
								alt={media.image.alt || 'Callout Image'}
								width={600}
								height={600}
								className="rounded"
							/>
						) : media?.video ? (
							<video
								src={media.video.asset.url}
								autoPlay
								loop
								muted
								playsInline
								className="aspect-video w-full rounded object-cover shadow-lg"
							/>
						) : null}
					</div>
				</div>
			</section>
		</div>
	)
}
