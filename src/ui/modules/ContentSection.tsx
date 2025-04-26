import { PortableText } from 'next-sanity'
import Pretitle from '@/ui/Pretitle'
import CTAList from '@/ui/CTAList'
import Asset from './Asset'
import CustomHTML from './CustomHTML'
import Reputation from '@/ui/Reputation'
import { RxShadow } from 'react-icons/rx'
import { cn } from '@/lib/utils'

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
		<section className="section headings:text-white items- grid gap-8 text-gray-300 md:grid-cols-2 md:gap-x-12">
			<div className="flex items-center">
				<RxShadow className="text-accent mr-1" />
				<Pretitle className="text-gray-300">{pretitle}</Pretitle>
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
		</section>
	)
}
