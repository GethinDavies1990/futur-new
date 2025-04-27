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
		<section className="section">
			<div className="frosted-glass section from-accent/30 headings:text-white max-w-screen-lg rounded-md bg-gradient-to-br to-gray-800/20 text-gray-300">
				<div className="space-y-6">
					<VscQuote className="text-accent inline-block shrink-0 text-xl" />

					<div className="self-center text-sm text-balance">
						<PortableText value={testimonial.content} />
					</div>

					<div className="flex items-center gap-4">
						{/* IMAGE */}
						<Img
							className="size-[30px] shrink-0 rounded object-cover"
							image={author?.image}
							width={400}
							alt={
								[author?.name, author?.title].filter(Boolean).join(', ') ||
								'Author'
							}
						/>

						{/* AUTHOR INFO */}
						<div className="flex flex-col text-start">
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
							{author?.company && (
								<div className="text-xs text-gray-500">{author?.company}</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
