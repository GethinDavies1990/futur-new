import moduleProps from '@/lib/moduleProps'
import Pretitle from '@/ui/Pretitle'
import { PortableText } from 'next-sanity'
import { RxShadow } from 'react-icons/rx'
import CTAList from '@/ui/CTAList'
import { cn, formatCurrency } from '@/lib/utils'

export default function ServicesList({
	pretitle,
	intro,
	services,
	...props
}: Partial<{ pretitle: string; intro: any; services: Sanity.Services[] }> &
	Sanity.Module) {
	return (
		<section className="section space-y-8" {...moduleProps(props)}>
			{(pretitle || intro) && (
				<header className="section richtext headings:text-white grid items-start gap-8 text-gray-300 md:grid-cols-2 md:gap-x-12">
					<div className="flex items-center">
						<RxShadow className="text-accent mr-1" />
						<Pretitle className="text-gray-300">{pretitle}</Pretitle>
					</div>
					<div className="richtext headings:text-balance mx-auto w-full max-w-lg">
						<PortableText value={intro} />
					</div>
				</header>
			)}

			<div
				className="max-lg:carousel max-lg:full-bleed grid grid-cols-[repeat(var(--col,1),1fr)] items-stretch gap-6 max-lg:px-4"
				style={{ '--col': services?.length } as React.CSSProperties}
			>
				{services?.map(
					(services) =>
						!!services && (
							<article
								className="richtext w-[400px] space-y-4 rounded border p-4 text-gray-300"
								key={services._id}
							>
								<div className="mb-6 flex items-center justify-between">
									<div className="h3 text-white">{services.title}</div>
									<Pretitle className="bg-accent/50 rounded-sm p-1 text-xs text-white">
										{services.highlight}
									</Pretitle>
								</div>{' '}
								<div className="richtext mb-6 text-sm">
									<PortableText value={services.content} />
								</div>
								<div className="flex items-center">
									<div className="text-xs">Starts at</div>

									{services.price?.base !== undefined && (
										<div className="ml-1 flex items-end gap-x-1 text-white">
											{services.price.base !== undefined &&
												!isNaN(services.price.base) && (
													<b className="h6">
														{formatPrice(services.price.base)}
													</b>
												)}
											{services.price.suffix && (
												<span
													className={cn(isNaN(services.price.base) && 'h6')}
												>
													{services.price.suffix}
												</span>
											)}
											{services.price.strikethrough && (
												<s className="font-bold decoration-red-500">
													{formatPrice(services.price?.strikethrough)}
												</s>
											)}
										</div>
									)}
									<div className="mx-4">|</div>
									<div>
										{' '}
										<CTAList className="grid" ctas={services.ctas} />
									</div>
								</div>
							</article>
						),
				)}
			</div>
			<div></div>
		</section>
	)
}

function formatPrice(value: number) {
	if (value === 0) return 'Free'
	return formatCurrency(value).replace(/\.00$/, '')
}
