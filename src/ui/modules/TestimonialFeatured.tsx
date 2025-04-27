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
			<div className="section from-accent/20 to-gray-800-60 flex items-center gap-x-12 gap-y-6 rounded-md bg-gradient-to-br max-sm:flex-col">
				<div className="space-y-2">
					<VscQuote className="text-accent inline-block shrink-0 text-2xl" />

					<div className="self-center text-xl text-balance">
						<PortableText value={testimonial.content} />
					</div>

					<dl className="text-start">
						<dt className="flex flex-wrap items-center gap-1">
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
						</dt>

						{author?.title && (
							<dd className="text-sm text-balance">{author?.title}</dd>
						)}
					</dl>
				</div>

				<Img
					className="mx-auto max-w-[100px] shrink-0 rounded"
					image={author?.image}
					width={400}
					alt={
						[author?.name, author?.title].filter(Boolean).join(', ') || 'Author'
					}
				/>
			</div>
		</section>
	)
}
