import moduleProps from '@/lib/moduleProps'
import { PortableText } from 'next-sanity'
import Pretitle from '@/ui/Pretitle'
import Code from './RichtextModule/Code'
import CustomHTML from './CustomHTML'
import Reputation from '@/ui/Reputation'
import CTAList from '@/ui/CTAList'
import Image from 'next/image'

export default function HeroSaaSVideo({
	pretitle,
	content,
	ctas,
	...props
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
}> &
	Sanity.Module) {
	return (
		<div className="">
			{/* Main Hero Section */}
			<section
				className="section space-y-8 text-center"
				{...moduleProps(props)}
			>
				<div className="richtext mx-auto max-w-2xl text-balance">
					<div className="frosted-glass shadow-accent inline-flex items-center rounded-full border-1 border-[#fc004c] bg-[#fc004c]/30 px-4 py-2 text-xs shadow-2xl">
						<Pretitle className="font-medium text-white">{pretitle}</Pretitle>
						<Image
							src="/icons/circle-inter.svg"
							width={12}
							height={12}
							alt="circle inter svg"
							className="ml-2"
						/>
					</div>
					<div className="">
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
					</div>

					<CTAList ctas={ctas} className="!mt-8 justify-center" />
				</div>
				<div className="py-10">
					<video
						className="border-accent anim-fade-to-t block h-full w-full rounded-xl border-1 object-cover [animation-duration:1s] [mask:linear-gradient(to_top,transparent,#000_50%)] md:h-full"
						autoPlay
						loop
						muted
						playsInline
					>
						<source src="/hero-vid.mp4" type="video/mp4" />
						<source src="/hero-vid.ogg" type="video/ogg" />
					</video>
				</div>
			</section>
		</div>
	)
}
