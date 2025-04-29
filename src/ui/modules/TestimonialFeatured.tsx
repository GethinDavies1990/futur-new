import { PortableText } from 'next-sanity'
import { VscQuote, VscSurroundWith } from 'react-icons/vsc'
import { Img } from '@/ui/Img'

export default function TestimonialFeatured({
	testimonial,
}: Partial<{
	testimonial: Sanity.Testimonial
}>) {
	if (!testimonial) return null

	const { author } = testimonial

	return (
		<div className="bg-white py-20">
			<section className="section">
				<div className="frosted-glass section mx-auto max-w-screen-lg rounded-md bg-pink-100 px-6 text-gray-600">
					<div className="flex flex-col items-center space-y-6 text-center">
						{/* IMAGE at top */}
						<Img
							className="size-[50px] rounded-full object-cover"
							image={author?.image}
							width={400}
							alt={
								[author?.name, author?.title].filter(Boolean).join(', ') ||
								'Author'
							}
						/>

						{/* REVIEW */}
						<div className="max-w-xl">
							<div className="mt-2 text-left text-sm text-balance">
								<PortableText value={testimonial.content} />
							</div>
						</div>

						{/* COMPANY */}
						{author?.company && (
							<div className="text-xs text-gray-500">{author.company}</div>
						)}

						{/* AUTHOR NAME + OPTIONAL SOURCE */}
						<div className="text-md flex items-center gap-1 font-bold">
							{author?.name}
							{testimonial?.source && (
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
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
