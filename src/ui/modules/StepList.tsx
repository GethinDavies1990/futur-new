import Pretitle from '@/ui/Pretitle'
import { PortableText } from '@portabletext/react'

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
				<header className="richtext headings:text-black mx-auto max-w-xl text-center text-balance text-gray-500">
					<Pretitle>{pretitle}</Pretitle>
					<PortableText value={intro} />
				</header>
			)}

			<ol className="grid gap-8 md:grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
				{steps?.map((step, index) => (
					<li
						className="grid grid-cols-[auto_1fr] gap-2 rounded-xl border border-gray-200 bg-gray-100 p-4"
						key={index}
					>
						<b className="bg-accent aspect-square h-[2em] rounded-full p-1 text-center text-2xl text-black tabular-nums">
							{index + 1}
						</b>

						<div className="richtext text-gray-500">
							<PortableText value={step.content} />
						</div>
					</li>
				))}
			</ol>
		</section>
	)
}
