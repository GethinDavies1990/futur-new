import moduleProps from '@/lib/moduleProps'
import Pretitle from '@/ui/Pretitle'
import { PortableText } from 'next-sanity'
import Image from './RichtextModule/Image'
import Code from './RichtextModule/Code'
import CustomHTML from './CustomHTML'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function AccordionList({
	pretitle,
	intro,
	items,
	layout = 'vertical',
	connect,
	generateSchema,
	...props
}: Partial<{
	pretitle: string
	intro: any
	items: {
		id: string
		summary: string
		content: any
		open?: boolean
	}[]
	layout: 'vertical' | 'horizontal'
	connect: boolean
	generateSchema: boolean
}> &
	Sanity.Module) {
	return (
		<div className="py-10">
			<section
				className={cn(
					'section',
					layout === 'horizontal'
						? 'grid gap-8 md:grid-cols-2'
						: 'space-y-8',
				)}
				{...(generateSchema && {
					itemScope: true,
					itemType: 'https://schema.org/FAQPage',
				})}
				{...moduleProps(props)}
			>
				<header className="richtext headings:text-black grid items-start justify-between gap-8 text-gray-500 md:grid-cols-2 md:gap-x-12">
					<div className="flex-col items-center justify-start">
						<div className="flex-row items-center justify-center">
							<div>
								<small className="text-left">
									👋 Speak to us
								</small>
							</div>
							<Link
								target="_blank"
								rel="noopener noreferrer"
								href="https://cal.com/wearefutur/chat-with-gethin-futur-media?overlayCalendar=true"
								className="action-outline mt-2"
							>
								Book Call
							</Link>
						</div>
					</div>
					<div className="richtext mx-auto w-full max-w-lg">
						<PortableText value={intro} />
					</div>
				</header>

				<div className="mx-auto w-full max-w-screen-md">
					{items?.map(({ id, summary, content, open }, index) => (
						<details
							key={id || index}
							className="accordion border-b border-gray-600"
							name={connect ? props._key : undefined}
							open={open}
							{...(generateSchema && {
								itemScope: true,
								itemProp: 'mainEntity',
								itemType: 'https://schema.org/Question',
							})}
						>
							<summary
								className="py-4 font-light text-black"
								{...(generateSchema && {
									itemProp: 'name',
								})}
							>
								{summary}
							</summary>

							<div
								className="anim-fade-to-b pb-4"
								{...(generateSchema && {
									itemScope: true,
									itemProp: 'acceptedAnswer',
									itemType: 'https://schema.org/Answer',
								})}
							>
								<div
									className="richtext rounded-md border border-gray-600 bg-gray-100 p-6 text-sm text-gray-500"
									itemProp="text"
								>
									<PortableText
										value={content}
										components={{
											types: {
												image: Image,
												code: Code,
												'custom-html': ({ value }) => (
													<CustomHTML
														className="has-[table]:md:[grid-column:bleed] has-[table]:md:mx-auto"
														{...value}
													/>
												),
											},
										}}
									/>
								</div>
							</div>
						</details>
					))}
				</div>
			</section>
		</div>
	)
}
