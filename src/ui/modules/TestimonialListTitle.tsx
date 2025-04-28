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
		<div className="bg-white py-20">
			<section className="section space-y-8 text-left">
				{(pretitle || intro) && (
					<header className="richtext headings:text-black grid items-start justify-between gap-8 text-gray-800 md:grid-cols-2 md:gap-x-12">
						<div className="flex items-center justify-start">
							<RxShadow className="text-accent mr-2" size={20} />
							<Pretitle className="text-gray-800">{pretitle}</Pretitle>
						</div>
						<div className="richtext headings:text-balance mx-auto w-full max-w-lg">
							<PortableText
								value={intro}
								components={{
									types: {
										'custom-html': ({ value }) => <CustomHTML {...value} />,
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
							? 'carousel max-xl:full-bleed md:overflow-fade pb-4 max-md:px-4 md:gap-8 md:before:m-auto md:after:m-auto'
							: 'grid sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
						stegaClean(layoutMobile) === 'carousel' &&
							'max-md:carousel max-md:full-bleed max-md:px-4 max-md:pb-4',
					)}
				>
					{testimonials?.map(
						(testimonial, key) =>
							testimonial && (
								<article
									className="bg-offwhite relative grid basis-[min(450px,70vw)]! place-content-center rounded-lg border border-gray-200 py-6 text-gray-800"
									key={key}
								>
									<div className="frosted-glass absolute inset-0 -z-10 h-full w-full"></div>
									<blockquote className="flex flex-col items-center gap-4">
										{testimonial.author && (
											<div className="inline-flex max-w-[25ch] items-center gap-2">
												<Img
													className="size-[25px] shrink-0 rounded-full object-cover"
													image={testimonial.author.image}
													width={80}
													alt={
														[testimonial.author.name, testimonial.author.title]
															.filter(Boolean)
															.join(', ') || 'Author'
													}
												/>

												<dl className="text-start">
													<dt className="flex flex-wrap items-center gap-1">
														{testimonial.author.name}
													</dt>

													{testimonial.author.title && (
														<dd className="text-xs text-balance">
															{testimonial.author.title}
														</dd>
													)}
												</dl>
											</div>
										)}
									</blockquote>
									<div className="mt-2 flex items-center justify-start">
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
