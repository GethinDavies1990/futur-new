import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { PortableText } from 'next-sanity'
import Pretitle from '@/ui/Pretitle'
import { Img } from '@/ui/Img'
import { cn } from '@/lib/utils'
import css from './LogoList.module.css'
import { IoLogoCodepen } from 'react-icons/io'

export default async function LogoList({
	pretitle,
	intro,
	logos,
	logoType = 'default',
	autoScroll,
	duration = 12,
}: Partial<{
	pretitle: string
	intro: any
	logos: Sanity.Logo[]
	logoType: 'default' | 'light' | 'dark'
	autoScroll?: boolean
	duration?: number
}>) {
	const allLogos =
		logos ||
		(await fetchSanityLive<Sanity.Logo[]>({
			query: groq`*[_type == 'logo']|order(name)`,
		}))

	return (
		<section className="section headings:text-black space-y-8 py-20 text-gray-600">
			{(pretitle || intro) && (
				<header className="richtext mx-auto max-w-screen-sm text-center text-balance">
					<div className="flex items-center justify-center">
						<IoLogoCodepen
							size={30}
							className="bg-accent mr-2 rounded-full text-white"
						/>
						<Pretitle>{pretitle}</Pretitle>
					</div>

					<PortableText value={intro} />
				</header>
			)}

			<figure
				className={cn(
					'mx-auto flex items-center gap-y-8 pb-4',
					autoScroll
						? `${css.track} overflow-fade max-w-max overflow-hidden`
						: 'flex-wrap justify-center gap-x-4 rounded-lg bg-blue-950 py-20',
				)}
				style={
					{
						'--count': allLogos?.length,
						'--dur': `${duration}s`,
					} as React.CSSProperties
				}
			>
				{allLogos.map(
					(logo, key) =>
						logo && (
							<Img
								className="h-[2.5em] w-[200px] shrink-0 object-contain px-4 py-2 max-sm:w-[150px]"
								style={{ '--index': key } as React.CSSProperties}
								image={logo.image?.[logoType] || logo.image?.default}
								width={400}
								alt={logo.name}
								key={key}
							/>
						),
				)}
			</figure>
		</section>
	)
}
