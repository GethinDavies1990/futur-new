import Pretitle from '@/ui/Pretitle'
import { PortableText, stegaClean } from 'next-sanity'
import { Img } from '@/ui/Img'
import { VscSurroundWith } from 'react-icons/vsc'
import { cn } from '@/lib/utils'
import Image from 'next/image'
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
		<section className="section space-y-8 text-center">
			{(pretitle || intro) && (
				<header className="richtext">
					<div className="border-accent/50 from-accent/30 inline-flex items-center rounded-full border-1 bg-gradient-to-t to-transparent px-2 py-1">
						<Pretitle className="mx-2 text-xs font-medium whitespace-nowrap text-white">
							{pretitle}
						</Pretitle>
					</div>
					<PortableText value={intro} />
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
								className="relative grid basis-[min(450px,70vw)]! place-content-center rounded-md border border-gray-800 py-6"
								key={key}
							>
								<div className="frosted-glass to-accent/20 absolute inset-0 -z-10 h-full w-full bg-gradient-to-tr from-gray-800/20"></div>
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
										<MdStar key={index} size={16} className="text-yellow-500" />
									))}
								</div>
							</article>
						),
				)}
			</div>
		</section>
	)
}
