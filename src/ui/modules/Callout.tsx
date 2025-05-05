import { PortableText } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import Code from './RichtextModule/Code'
import Reputation from '@/ui/Reputation'
import BookCallButton from '../BookCallButton'

export default function Callout({
	content,
	ctas,
}: Partial<{
	content: any
	ctas: Sanity.CTA[]
}>) {
	return (
		<div className="bg-offwhite py-20">
			<section className="section text-center">
				<div className="frosted-glass section headings:text-black relative w-full overflow-hidden rounded-md py-30 text-gray-600">
					{/* Gradient background, fills parent including padding */}
					<div className="pointer-events-none absolute inset-0 -z-10 rotate-180 rounded-lg bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(97,166,255,0.8)_100%)]" />

					{/* Leave your content exactly as it is */}
					<div className="richtext mx-auto max-w-screen-sm text-balance">
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
											className="!mt-4 justify-center"
											reputation={value.reputation}
										/>
									),
								},
							}}
						/>
						{!ctas && <BookCallButton />}
						<CTAList className="!mt-8 justify-center" ctas={ctas} />
					</div>
				</div>
			</section>
		</div>
	)
}
