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
		<section className="section headings:text-white space-y-8 text-gray-300">
			<header className="richtext grid items-start justify-between gap-8 md:grid-cols-2 md:gap-x-12">
				<div className="flex max-w-lg items-center justify-start">
					<Pretitle className="h2 text-gray-300">{pretitle}</Pretitle>
				</div>
				<div className="richtext headings:text-balance mx-auto w-full max-w-lg">
					<PortableText
						value={content}
						components={{
							types: {
								'custom-html': ({ value }) => <CustomHTML {...value} />,
								'reputation-block': ({ value }) => (
									<Reputation className="!mt-4" reputation={value.reputation} />
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
