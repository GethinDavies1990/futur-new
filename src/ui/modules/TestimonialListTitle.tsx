import Pretitle from '@/ui/Pretitle'
import { PortableText, stegaClean } from 'next-sanity'
import { Img } from '@/ui/Img'
import CustomHTML from './CustomHTML'
import { cn } from '@/lib/utils'
import { RxShadow } from 'react-icons/rx'
import { MdStar } from 'react-icons/md'

export default function TestimonialListTitle({
	pretitle,
	intro,
	testimonials,
	layout,
	layoutMobile,
}: Partial<{
	pretitle: string
	intro: any
	testimonials: Sanity.Testimonial[]
	layout: 'grid' | 'carousel'
	layoutMobile: 'grid' | 'carousel'
}>) {
	return (
		<div className="py-20">
			<section className="section space-y-8">
				{(pretitle || intro) && (
					<header className="grid items-start justify-between gap-8 md:grid-cols-2 md:gap-x-12">
						<div className="flex items-center justify-start">
							<Pretitle className="uppercase">
								{pretitle}
							</Pretitle>
						</div>
						<div className="richtext headings:text-balance headings:text-black mx-auto w-full max-w-lg">
							<PortableText
								value={intro}
								components={{
									types: {
										'custom-html': ({ value }) => (
											<CustomHTML {...value} />
										),
									},
								}}
							/>
						</div>
					</header>
				)}

				<div
					className={cn(
						'gap-4',
						stegaClean(layout) === 'carousel'
							? 'carousel max-xl:full-bleed md:overflow-fade pb-4 text-center max-md:px-4 md:gap-8 md:before:m-auto md:after:m-auto'
							: 'grid sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
						stegaClean(layoutMobile) === 'carousel' &&
							'max-md:carousel max-md:full-bleed max-md:px-4 max-md:pb-4',
					)}
				>
					{testimonials?.map(
						(testimonial, key) =>
							testimonial && (
								<article
									className="relative grid basis-[min(550px,100vw)]! place-content-center rounded-lg border border-gray-200 bg-gray-100 py-6 text-center text-gray-500 shadow-lg"
									key={key}
								>
									<div className="absolute inset-0 -z-10 h-full w-[90%]"></div>
									<blockquote className="flex items-center justify-center gap-4">
										{testimonial.author && (
											<div className="max-w-[35ch] items-center gap-2 text-center">
												<Img
													className="mx-auto mb-4 size-[35px] shrink-0 rounded-full object-cover"
													image={
														testimonial.author.image
													}
													width={80}
													alt={
														[
															testimonial.author
																.name,
															testimonial.author
																.title,
														]
															.filter(Boolean)
															.join(', ') ||
														'Author'
													}
												/>

												<dl className="text-center">
													<dt className="flex flex-wrap items-center gap-1 text-center">
														{
															testimonial.author
																.name
														}
													</dt>

													{testimonial.author
														.title && (
														<dd className="text-md">
															{
																testimonial
																	.author
																	.title
															}
														</dd>
													)}
												</dl>
											</div>
										)}
									</blockquote>
									<div className="mt-2 flex items-center justify-center">
										{[...Array(5)].map((_, index) => (
											<MdStar
												key={index}
												size={16}
												className="text-yellow-500"
											/>
										))}
									</div>
								</article>
							),
					)}
				</div>
			</section>
		</div>
	)
}
