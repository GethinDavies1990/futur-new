import moduleProps from '@/lib/moduleProps'
import { ResponsiveImg } from '@/ui/Img'
import { PortableText, stegaClean } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import Pretitle from '@/ui/Pretitle'
import { RxShadow } from 'react-icons/rx'
import CustomHTML from './CustomHTML'
import Reputation from '@/ui/Reputation'
import { cn } from '@/lib/utils'

export default function Hero({
	pretitle,
	content,
	ctas,
	assets,
	textAlign = 'center',
	alignItems,
	...props
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	assets: Sanity.Img[]
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}> &
	Sanity.Module) {
	const hasImage = !!assets?.[0]
	const asset = assets?.[0]

	return (
		<div className="bg-black bg-cover bg-center">
			<section
				className={cn(
					hasImage && 'grid overflow-hidden *:col-span-full *:row-span-full',
				)}
				{...moduleProps(props)}
			>
				{hasImage && (
					<ResponsiveImg
						img={asset}
						className="max-h-fold size-full object-cover"
						width={2400}
						draggable={false}
					/>
				)}

				{content && (
					<div className="section flex h-auto w-full flex-col pt-30">
						<div
							className={cn(
								'richtext headings:text-white relative isolate max-w-xl text-gray-300',
								hasImage && 'text-shadow',
								{
									'mb-8': stegaClean(alignItems) === 'start',
									'my-auto': stegaClean(alignItems) === 'center',
									'mt-auto': stegaClean(alignItems) === 'end',
								},
								{
									'me-auto': ['left', 'start'].includes(stegaClean(textAlign)),
									'mx-auto': stegaClean(textAlign) === 'center',
									'ms-auto': ['right', 'end'].includes(stegaClean(textAlign)),
								},
							)}
							style={{ textAlign: stegaClean(textAlign) }}
						>
							<div className="flex items-center">
								<RxShadow className="text-accent mr-1" />
								<Pretitle className="text-gray-300">{pretitle}</Pretitle>
							</div>

							<PortableText
								value={content}
								components={{
									types: {
										'custom-html': ({ value }) => <CustomHTML {...value} />,
										'reputation-block': ({ value }) => (
											<Reputation
												className={cn(
													'!mt-4',
													hasImage && '[&_strong]:text-accent',
													{
														'justify-start': ['left', 'start'].includes(
															stegaClean(textAlign),
														),
														'justify-center':
															stegaClean(textAlign) === 'center',
														'justify-end': ['right', 'end'].includes(
															stegaClean(textAlign),
														),
													},
												)}
												reputation={value.reputation}
											/>
										),
									},
								}}
							/>

							<CTAList
								ctas={ctas}
								className={cn('!mt-4 flex items-center gap-2', {
									'justify-start': stegaClean(textAlign) === 'left',
									'justify-center': stegaClean(textAlign) === 'center',
									'justify-end': stegaClean(textAlign) === 'right',
								})}
							/>
						</div>
					</div>
				)}
			</section>
		</div>
	)
}
