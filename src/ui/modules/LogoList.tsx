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
		<div
			className={
				autoScroll
					? 'bg-black pb-8'
					: "section w-[80%] rounded-xl bg-[url('/blue-bg.png')] bg-cover bg-center bg-no-repeat"
			}
		>
			<section className="headings:text-black text-gray-600">
				{(pretitle || intro) && (
					<div className="text-center">
						<div className="mx-auto mb-4 inline-flex max-w-screen-md items-center justify-center rounded-full bg-cover bg-center px-6 py-2">
							<Pretitle className="text-gray-600">
								{pretitle}
							</Pretitle>
						</div>
						<header className="richtext mx-auto max-w-screen-md text-center">
							<PortableText value={intro} />
						</header>
					</div>
				)}

				<figure
					className={cn(
						'mx-auto flex items-center',
						autoScroll
							? `${css.track} overflow-fade max-w-max overflow-hidden`
							: 'mt-4 flex-wrap justify-center gap-12 rounded-lg py-20',
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
									style={
										{
											'--index': key,
										} as React.CSSProperties
									}
									image={
										logo.image?.[logoType] ||
										logo.image?.default
									}
									width={400}
									alt={logo.name}
									key={key}
								/>
							),
					)}
				</figure>
			</section>
		</div>
	)
}
