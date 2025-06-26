import Link from 'next/link'
import { BLOG_DIR } from '@/lib/env'
import { cn } from '@/lib/utils'
import { BiSolidCategory } from 'react-icons/bi'
import { FaShopify, FaCode } from 'react-icons/fa' // Example additional icons
import { IoCodeSlashSharp } from 'react-icons/io5'

// Mapping function to select icon based on the category name
const getCategoryIcon = (categoryName: string) => {
	switch (categoryName.toLowerCase()) {
		case 'shopify':
			return <FaShopify className="text-green-500" />
		case 'web design':
			return <IoCodeSlashSharp className="text-accent" />
		default:
			return <BiSolidCategory />
	}
}

export default function Category({
	value,
	label,
	linked,
}: {
	value?: Sanity.BlogCategory
	label?: string
	linked?: boolean
}) {
	const categoryLabel = label || value?.title || ''

	const props = {
		className: cn(
			' p-2 uppercase text-xs flex items-center gap-1 text-gray-500',
			!linked && 'pointer-events-none',
		),
		children: (
			<>
				{getCategoryIcon(categoryLabel)} <span>{categoryLabel}</span>
			</>
		),
	}

	return linked ? (
		<Link
			href={{
				pathname: `/${BLOG_DIR}`,
				query: { category: value?.slug.current },
			}}
			{...props}
		/>
	) : (
		<div {...props} />
	)
}
