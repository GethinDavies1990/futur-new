import Pretitle from '@/ui/Pretitle'
import { PortableText, stegaClean } from 'next-sanity'
import { Img } from '@/ui/Img'
import { VscSurroundWith } from 'react-icons/vsc'
import { cn } from '@/lib/utils'
import Image from 'next/image'

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
						<Image
							src="/icons/star.svg"
							width={16}
							height={16}
							alt="Star Svg"
						/>
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
								className="relative grid basis-[min(450px,70vw)]! place-content-center rounded-xl border border-gray-800 py-8"
								key={key}
							>
								<div className="absolute inset-0 -z-10 h-full w-full bg-[#121212] bg-[size:2rem_1rem]">
									<div className="absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle_150px_at_50%_50px,#fff,transparent)] opacity-15"></div>
								</div>
								<blockquote className="flex flex-col items-center gap-4">
									{testimonial.author && (
										<div className="inline-flex max-w-[25ch] items-center gap-2">
											<Img
												className="size-[30px] shrink-0 rounded-full object-cover"
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

													{testimonial.source && (
														<cite>
															<a
																className="text-ink/50"
																href={testimonial.source}
																target="_blank"
																title="Source"
															>
																<VscSurroundWith />
															</a>
														</cite>
													)}
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
								<div className="mt-2 flex items-center justify-center">
									{[...Array(5)].map((_, index) => (
										<Image
											key={index}
											src="/icons/star.svg"
											width={20}
											height={20}
											alt="Star Svg"
										/>
									))}
								</div>
								<div className="absolute inset-x-0 -bottom-px h-18 bg-gradient-to-t from-[#121212] to-transparent"></div>
							</article>
						),
				)}
			</div>
		</section>
	)
}
