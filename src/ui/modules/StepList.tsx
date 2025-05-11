import Pretitle from '@/ui/Pretitle'
import { PortableText } from 'next-sanity'

export default function StepList({
	pretitle,
	intro,
	steps,
}: Partial<{
	pretitle: string
	intro: any
	steps: {
		content: any
	}[]
}>) {
	return (
		<section className="section space-y-8">
			{(pretitle || intro) && (
				<header className="richtext headings:text-white mx-auto max-w-xl text-center text-balance text-gray-300">
					<Pretitle>{pretitle}</Pretitle>
					<PortableText value={intro} />
				</header>
			)}

			<ol className="grid gap-8 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
				{steps?.map((step, index) => (
					<li
						className="grid grid-cols-[auto_1fr] gap-2 rounded-xl border border-gray-600 bg-black p-2"
						key={index}
					>
						<b className="aspect-square h-[1em] rounded-full bg-gray-900 p-1 text-center text-3xl text-white tabular-nums">
							{index + 1}
						</b>

						<div className="richtext text-gray-300">
							<PortableText value={step.content} />
						</div>
					</li>
				))}
			</ol>
		</section>
	)
}
