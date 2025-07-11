import { Fragment } from 'react'
import CTA from '@/ui/CTA'
import { stegaClean } from 'next-sanity'

export default async function Breadcrumbs({
	crumbs,
	hideCurrent,
	currentPage,
}: Partial<{
	crumbs: Sanity.Link[]
	hideCurrent?: boolean
	currentPage: Sanity.Page | Sanity.BlogPost | Sanity.WorkPost
}>) {
	return (
		<nav className="section border-accent border-t-1 py-4 text-sm">
			<ol
				className="flex flex-wrap items-center gap-x-2 gap-y-1"
				itemScope
				itemType="https://schema.org/BreadcrumbList"
			>
				{crumbs?.map((crumb, key) => (
					<Fragment key={key}>
						<Crumb link={crumb} position={key + 1} />

						{key < crumbs.length - 1 || !hideCurrent ? (
							<li className="text-accent" role="presentation">
								/
							</li>
						) : null}
					</Fragment>
				))}

				<Crumb
					position={(crumbs?.length || 0) + 2}
					hidden={hideCurrent}
				>
					{currentPage?.title || currentPage?.metadata.title}
				</Crumb>
			</ol>
		</nav>
	)
}

function Crumb({
	link,
	position,
	children,
	hidden,
}: {
	link?: Omit<Sanity.Link, '_type'>
	position: number
	hide?: boolean
} & React.ComponentProps<'li'>) {
	const content = (
		<>
			<span itemProp="name" hidden={hidden}>
				{stegaClean(
					children ||
						link?.label ||
						link?.internal?.title ||
						link?.external,
				)}
			</span>
			<meta itemProp="position" content={position.toString()} />
		</>
	)

	return (
		<li
			className="line-clamp-1 text-black"
			itemProp="itemListElement"
			itemScope
			itemType="https://schema.org/ListItem"
		>
			{link ? (
				<CTA
					className="text-black hover:underline"
					link={{ _type: 'link', ...link }}
					itemProp="item"
				>
					{content}
				</CTA>
			) : (
				content
			)}
		</li>
	)
}
