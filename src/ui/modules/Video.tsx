import moduleProps from '@/lib/moduleProps'
import { PortableText } from 'next-sanity'
import Pretitle from '@/ui/Pretitle'
import Code from './RichtextModule/Code'
import CustomHTML from './CustomHTML'
import Reputation from '@/ui/Reputation'
import CTAList from '@/ui/CTAList'

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
	videoFile: Sanity.Video
}> &
	Sanity.Module) {
	return (
		<div>
			<section
				className="section space-y-8 text-center"
				{...moduleProps(props)}
			>
				<div className="richtext mx-auto max-w-2xl text-balance">
					{pretitle && (
						<Pretitle className="text-xs font-medium text-white">
							{pretitle}
						</Pretitle>
					)}

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
								'custom-html': ({ value }) => <CustomHTML {...value} />,
								'reputation-block': ({ value }) => (
									<Reputation
										className="!mt-4 justify-center"
										reputation={value.reputation}
									/>
								),
							},
						}}
					/>

					<CTAList ctas={ctas} className="!mt-8 justify-center" />
				</div>

				{/* ✅ Render uploaded video */}
				{videoFile?.asset?._ref && (
					<div>
						<video
							className="anim-fade-to-t z-20 block h-full w-full rounded-xl border-1 border-gray-900 object-cover [animation-duration:1s] [mask:linear-gradient(to_top,transparent,#121212_50%)] md:h-full"
							autoPlay
							loop
							muted
							playsInline
						>
							<source src={urlForFile(videoFile).url()} type="video/mp4" />
						</video>
					</div>
				)}
			</section>
		</div>
	)
}
