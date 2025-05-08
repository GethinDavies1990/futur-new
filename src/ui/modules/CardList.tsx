import moduleProps from '@/lib/moduleProps'
import Pretitle from '@/ui/Pretitle'
import { PortableText, stegaClean } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import { Img } from '@/ui/Img'
import { cn } from '@/lib/utils'
import { BsArrowUpRightCircle } from 'react-icons/bs'

export default function CardList({
	pretitle,
	intro,
	cards,
	ctas,
	layout,
	columns = 3,
	visualSeparation,
	...props
}: Partial<{
	pretitle: string
	intro: any
	ctas: Sanity.CTA[]
	cards: Partial<{
		image: Sanity.Image
		content: any
		ctas: Sanity.CTA[]
	}>[]
	layout: 'grid' | 'carousel'
	columns: number
	visualSeparation: boolean
}> &
	Sanity.Module) {
	const isCarousel = stegaClean(layout) === 'carousel'

	return (
		<div className="py-3">
			<section className="section space-y-12" {...moduleProps(props)}>
				{(pretitle || intro) && (
					<header className="richtext headings:text-white text-center text-gray-300">
						<Pretitle className="text-gray-300">{pretitle}</Pretitle>
						<PortableText value={intro} />
						<CTAList className="justify-center" ctas={ctas} />
					</header>
				)}

				<div
					className={cn(
						'items-stretch gap-4',
						isCarousel
							? 'carousel max-xl:full-bleed md:overflow-fade pb-4 max-md:px-4 md:gap-8 md:before:m-auto md:after:m-auto'
							: [
									'grid *:h-full max-md:pb-4',
									columns
										? 'md:grid-cols-[repeat(var(--col,3),minmax(0,1fr))]'
										: 'sm:grid-cols-[repeat(auto-fill,minmax(var(--size,300px),1fr))]',
								],
					)}
					style={
						columns
							? ({
									'--col': columns,
								} as React.CSSProperties)
							: undefined
					}
				>
					{cards?.map((card, key) => (
						<article
							className={cn(
								'flex flex-col gap-2',
								visualSeparation &&
									'group headings:text-white rounded-lg border border-gray-600 bg-black text-gray-300 transition-all duration-700',
							)}
							key={key}
						>
							{card.image && (
								<figure>
									<Img
										className="aspect-video w-full rounded-t-[6px] object-cover"
										image={card.image}
										width={600}
									/>
								</figure>
							)}
							<div className="p-4">
								<div className="richtext grow">
									<PortableText value={card.content} />
								</div>
								<div className="mt-4 flex items-center justify-between">
									<CTAList ctas={card.ctas} />
									<BsArrowUpRightCircle
										size={20}
										className="group-hover:rotate-45"
									/>
								</div>
							</div>
						</article>
					))}
				</div>
			</section>
		</div>
	)
}
