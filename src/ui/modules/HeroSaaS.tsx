import moduleProps from '@/lib/moduleProps'
import { PortableText } from 'next-sanity'
import Pretitle from '@/ui/Pretitle'
import Code from './RichtextModule/Code'
import CustomHTML from './CustomHTML'
import Reputation from '@/ui/Reputation'
import CTAList from '@/ui/CTAList'
import { ResponsiveImg } from '@/ui/Img'
import { cn } from '@/lib/utils'

export default function HeroSaaS({
	pretitle,
	content,
	ctas,
	assets,
	assetFaded,
	...props
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	assets: Sanity.Img[]
	assetFaded?: boolean
}> &
	Sanity.Module) {
	const asset = assets?.[0]

	return (
		<div className="py-10">
			{/* Main Hero Section */}
			<section
				className="section space-y-8 text-center"
				{...moduleProps(props)}
			>
				<div className="richtext mx-auto text-balance">
					<div>
						<Pretitle className="texy-xs text-gray-600">
							{pretitle}
						</Pretitle>
					</div>
					<div className="headings:text-black text-gray-600np">
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

					<CTAList ctas={ctas} className="!mt-8 justify-center" />
				</div>

				{(() => {
					switch (asset?._type) {
						case 'img':
							return (
								<ResponsiveImg
									img={asset}
									pictureProps={{
										className: cn(
											'anim-fade-to-t w-full block [animation-duration:1s]',
											assetFaded &&
												'[mask:linear-gradient(to_top,transparent,#000_50%)]',
										),
									}}
									width={2400}
									draggable={false}
								/>
							)
						default:
							return null
					}
				})()}
			</section>
		</div>
	)
}
