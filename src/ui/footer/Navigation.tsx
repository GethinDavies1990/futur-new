import { getSite } from '@/sanity/lib/queries'
import CTA from '@/ui/CTA'
import { stegaClean } from 'next-sanity'
import { BsArrowDownLeftCircle } from 'react-icons/bs'

export default async function Menu() {
	const { footerMenu } = await getSite()

	return (
		<nav className="flex flex-wrap items-start gap-x-12 gap-y-6 text-gray-300 max-sm:flex-col">
			{footerMenu?.items?.map((item, key) => {
				switch (item._type) {
					case 'link':
						return (
							<CTA
								className="hover:link text-white"
								link={item}
								key={key}
							/>
						)

					case 'link.list':
						return (
							<div className="space-y-2 text-start" key={key}>
								<div className="text-accent flex items-center text-lg uppercase">
									<div className="text-accent mr-2">[</div>
									<CTA link={item.link}>
										{stegaClean(item.link?.label) ||
											item.link?.internal?.title}
									</CTA>
									<div className="text-accent ml-2">]</div>
								</div>

								<ul>
									{item.links?.map((link, key) => (
										<li key={key}>
											<CTA
												className="inline-block py-px text-xs hover:underline"
												link={link}
											/>
										</li>
									))}
								</ul>
							</div>
						)

					default:
						return null
				}
			})}
		</nav>
	)
}
