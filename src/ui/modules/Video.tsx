import { PortableText } from 'next-sanity'
import moduleProps from '@/lib/moduleProps'
import Pretitle from '@/ui/Pretitle'
import Code from './RichtextModule/Code'
import CustomHTML from './CustomHTML'
import Reputation from '@/ui/Reputation'
import CTAList from '@/ui/CTAList'
import Image from 'next/image'
import { getFileUrl } from '../../sanity/lib/client'

export default function Video({
	pretitle,
	content,
	ctas,
	videoFile,
	...props
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	videoFile: { asset?: { _ref: string; url: string } }
}> &
	Sanity.Module) {
	const videoSrc = videoFile?.asset?.url || null

	return (
		<div>
			<section
				className="section space-y-8 py-20"
				{...moduleProps(props)}
			>
				<div className="mx-auto max-w-3xl text-center">
					{pretitle && (
						<Pretitle className="text-center uppercase">
							{pretitle}
						</Pretitle>
					)}
					<div className="richtext text-center text-balance text-black">
						<PortableText
							value={content}
							components={{
								types: {
									code: ({ value }) => (
										<Code
											value={value}
											className="mx-auto mt-6! max-w-max"
											theme="snazzy-light"
										/>
									),
									'custom-html': ({ value }) => (
										<CustomHTML {...value} />
									),
									'reputation-block': ({ value }) => (
										<Reputation
											className="!mt-4 justify-center"
											reputation={value.reputation}
										/>
									),
								},
							}}
						/>
					</div>

					{content && (
						<Image
							src="/shopify-experts.png"
							width={300}
							height={300}
							alt="Shopify Experts logo"
							className="mx-auto mt-4"
						/>
					)}

					<CTAList ctas={ctas} className="!mt-8 justify-center" />
				</div>

				{/* ✅ Render video only if videoSrc is valid */}
				{videoSrc && (
					<div>
						<video
							className="anim-fade-to-t z-20 block h-full w-full rounded-lg object-cover shadow-lg [animation-duration:1s] md:h-full"
							autoPlay
							loop
							muted
							playsInline
						>
							<source src={videoSrc} type="video/mp4" />
						</video>
					</div>
				)}
			</section>
		</div>
	)
}
