import moduleProps from '@/lib/moduleProps'
import Pretitle from '@/ui/Pretitle'
import { PortableText } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import { cn, formatCurrency } from '@/lib/utils'

export default function PricingList({
	pretitle,
	intro,
	tiers,
	...props
}: Partial<{ pretitle: string; intro: any; tiers: Sanity.Pricing[] }> &
	Sanity.Module) {
	return (
		<section className="section space-y-8" {...moduleProps(props)}>
			{(pretitle || intro) && (
				<header className="richtext headings:text-white text-center text-gray-300">
					<Pretitle>{pretitle}</Pretitle>
					<PortableText value={intro} />
				</header>
			)}

			<div
				className="max-lg:carousel max-lg:full-bleed grid grid-cols-[repeat(var(--col,1),1fr)] items-stretch gap-6 max-lg:px-4"
				style={{ '--col': tiers?.length } as React.CSSProperties}
			>
				{tiers?.map(
					(tier) =>
						!!tier && (
							<article
								className="richtext space-y-4 rounded border border-white/20 p-4"
								key={tier._id}
							>
								<div className="h3 flex flex-wrap items-center gap-x-4 text-white">
									{tier.title}

									<Pretitle className="bg-accent ms-auto rounded-sm px-3 py-2 text-xs text-black">
										{tier.highlight}
									</Pretitle>
								</div>

								{tier.price?.base !== undefined && (
									<div className="text-accent flex flex-wrap items-end gap-x-1">
										{tier.price.base !== undefined &&
											!isNaN(tier.price.base) && (
												<b className="h3">
													{formatPrice(
														tier.price.base,
													)}
												</b>
											)}
										{tier.price.suffix && (
											<span
												className={cn(
													isNaN(tier.price.base) &&
														'h1',
												)}
											>
												{tier.price.suffix}
											</span>
										)}
										{tier.price.strikethrough && (
											<s className="font-bold text-gray-300 decoration-red-500">
												{formatPrice(
													tier.price?.strikethrough,
												)}
											</s>
										)}
									</div>
								)}

								<CTAList className="grid" ctas={tier.ctas} />
								<div className="richtext headings:text-white text-gray-300">
									<PortableText value={tier.content} />
								</div>
							</article>
						),
				)}
			</div>
		</section>
	)
}

function formatPrice(value: number) {
	if (value === 0) return 'Free'
	return formatCurrency(value).replace(/\.00$/, '')
}
