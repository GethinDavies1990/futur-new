import { PortableText } from 'next-sanity'
import Pretitle from '@/ui/Pretitle'
import CTAList from '@/ui/CTAList'
import CustomHTML from './CustomHTML'
import Reputation from '@/ui/Reputation'

export default function ContentSection({
	pretitle,
	content,
	ctas,
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
}>) {
	return (
		<section className="section space-y-8 py-20">
			<header className="richtext grid items-start justify-between gap-8 md:grid-cols-2 md:gap-x-12">
				<div className="flex max-w-lg items-center justify-start">
					<Pretitle>{pretitle}</Pretitle>
				</div>
				<div className="richtext headings:text-balance headings:text-black mx-auto w-full max-w-3xl text-gray-500">
					<PortableText
						value={content}
						components={{
							types: {
								'custom-html': ({ value }) => (
									<CustomHTML {...value} />
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
					<CTAList ctas={ctas} className="!mt-6" />
				</div>
			</header>
		</section>
	)
}
