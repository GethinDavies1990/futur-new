import Pretitle from '@/ui/Pretitle'
import { PortableText, stegaClean } from 'next-sanity'
import Icon, { getPixels } from '@/ui/Icon'
import { cn } from '@/lib/utils'

export default function FlagList({
	pretitle,
	intro,
	items,
	iconPosition,
}: Partial<{
	pretitle: string
	intro: any
	items: {
		icon: Sanity.Icon
		content: any
	}[]
	iconPosition: 'top' | 'left'
}>) {
	return (
		<div className="py-10">
			<section className="section space-y-8">
				{(pretitle || intro) && (
					<header className="richtext headings:text-black mx-auto text-left text-balance text-gray-500">
						<Pretitle>{pretitle}</Pretitle>
						<PortableText value={intro} />
					</header>
				)}

				<div className="headings:text-black headings:no-underline text-md grid items-stretch gap-x-8 gap-y-6 text-gray-500 md:grid-cols-[repeat(2,minmax(200px,1fr))]">
					{items?.map(({ icon, content }, key) => (
						<article
							className={cn(
								'frosted-glass grid gap-4 rounded-lg border-1 border-gray-200 bg-gray-100 p-4 text-sm',
								stegaClean(iconPosition) === 'left' &&
									icon &&
									'grid-cols-[var(--size)_1fr]',
							)}
							style={
								{
									'--size': icon?.size ?? '20px',
								} as React.CSSProperties
							}
							key={key}
						>
							{icon && (
								<figure
									className="mb-2"
									style={{ height: getPixels(icon?.size) }}
								>
									<div className="inline-flex rounded-full p-1">
										<Icon icon={icon} />
									</div>
								</figure>
							)}

							<div className="richtext">
								<PortableText value={content} />
							</div>
						</article>
					))}
				</div>
			</section>
		</div>
	)
}
