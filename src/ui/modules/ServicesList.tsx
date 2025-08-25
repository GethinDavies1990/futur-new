import moduleProps from '@/lib/moduleProps'
import Pretitle from '@/ui/Pretitle'
import { PortableText } from '@portabletext/react'
import CustomHTML from './CustomHTML'
import Reputation from '@/ui/Reputation'
import { ResponsiveImg } from '@/ui/Img'
import { Img } from '@/ui/Img'
import { RxShadow } from 'react-icons/rx'
import CTAList from '@/ui/CTAList'
import { cn, formatCurrency } from '@/lib/utils'

export default function ServicesList({
	pretitle,
	intro,
	services,
	assets,
	testimonials,
	...props
}: Partial<{
	pretitle: string
	intro: any
	testimonials: Sanity.Testimonial[]
	services: Sanity.Services[]
	assets: Sanity.Img[]
}> &
	Sanity.Module) {
	return (
		<div className="py-10">
			<section className="section space-y-12" {...moduleProps(props)}>
				{(pretitle || intro) && (
					<header className="richtext headings:text-white grid items-start justify-start gap-8 text-gray-300 md:grid-cols-2 md:gap-x-12">
						<div className="flex items-center justify-start">
							<RxShadow className="text-accent mr-2" size={20} />
							<Pretitle className="text-gray-300">
								{pretitle}
							</Pretitle>
						</div>
						<div className="richtext headings:text-balance mx-auto w-full max-w-lg">
							<PortableText value={intro} />
						</div>
					</header>
				)}

				<div className="space-y-12">
					{services?.map((service) =>
						!!service ? (
							<article
								className="grid grid-cols-1 items-center gap-8 md:grid-cols-2"
								key={service._id}
							>
								{/* LEFT: Content */}
								<div className="bg-offwhite max-w-[500px] space-y-6 p-6">
									<div className="flex items-center justify-between">
										<div className="h3 text-black">
											{service.title}
										</div>
										{service.highlight && (
											<Pretitle className="bg-accent/80 rounded-sm p-1 text-xs text-black">
												{service.highlight}
											</Pretitle>
										)}
									</div>

									<div className="richtext text-sm text-gray-500">
										<PortableText
											value={service.content}
											components={{
												types: {
													'custom-html': ({
														value,
													}) => (
														<CustomHTML
															{...value}
														/>
													),
													'reputation-block': ({
														value,
													}) => (
														<Reputation
															reputation={
																value.reputation
															}
														/>
													),
												},
											}}
										/>
									</div>

									<div className="flex items-center justify-between gap-2 text-xs">
										<div className="flex items-center">
											<div className="mr-4 text-gray-500">
												Starts at
											</div>
											{service.price?.base !==
												undefined && (
												<div className="flex items-end gap-x-1 font-semibold text-black">
													{!isNaN(
														service.price.base,
													) && (
														<b className="h5">
															{formatPrice(
																service.price
																	.base,
															)}
														</b>
													)}
													{service.price.suffix && (
														<span
															className={cn(
																isNaN(
																	service
																		.price
																		.base,
																) && 'h5',
															)}
														>
															{
																service.price
																	.suffix
															}
														</span>
													)}
													{service.price
														.strikethrough && (
														<s className="font-bold decoration-red-500">
															{formatPrice(
																service.price
																	.strikethrough,
															)}
														</s>
													)}
												</div>
											)}
										</div>

										<CTAList
											className=""
											ctas={service.ctas}
										/>
									</div>

									{service.testimonial?.length > 0 && (
										<div className="mt-4 rounded-lg border border-gray-200 bg-gray-100 p-6">
											<div className="text-sm text-gray-500">
												"
												{
													service.testimonial[0]
														.author?.title
												}
												"
											</div>
											<div className="mt-4 flex items-center gap-2">
												<Img
													className="size-[25px] shrink-0 rounded-full object-cover"
													image={
														service.testimonial[0]
															.author.image
													}
													width={80}
													alt={
														[
															service.testimonial
																.author?.name,
															service.testimonial
																.author?.title,
														]
															.filter(Boolean)
															.join(', ') ||
														'Author'
													}
												/>
												<div className="text-xs text-black">
													<div className="font-bold">
														{
															service
																.testimonial[0]
																.author?.name
														}
													</div>
													<div>
														{
															service
																.testimonial[0]
																.author?.company
														}
													</div>
												</div>
											</div>
										</div>
									)}
								</div>

								{/* RIGHT: Image */}
								{service.assets?.[0] && (
									<div className="max-[500px] relative aspect-video overflow-hidden rounded-md">
										<ResponsiveImg
											img={service.assets[0]}
											className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
											width={800}
										/>
									</div>
								)}
							</article>
						) : null,
					)}
				</div>
			</section>
		</div>
	)
}

function formatPrice(value: number) {
	if (value === 0) return 'Free'
	return '£' + value.toFixed(2).replace(/\.00$/, '')
}
