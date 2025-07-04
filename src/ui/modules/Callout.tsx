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
		<div className="py-10">
			<section className="section text-center">
				<div className="frosted-glass section headings:text-black relative w-full overflow-hidden rounded-md bg-gradient-to-b from-[#F1EAFF] to-[#FFEDED] py-30 text-gray-600">
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
