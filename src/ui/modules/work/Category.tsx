import Link from 'next/link'
import { WORK_DIR } from '@/lib/env'
import { cn } from '@/lib/utils'

export default function Category({
	value,
	label,
	linked,
}: {
	value?: Sanity.WorkCategory
	label?: string
	linked?: boolean
}) {
	const props = {
		className: cn(
			'bg-green-100 p-1 uppercase rounded-sm',
			!linked && 'pointer-events-none',
		),
		children: <span>{label || value?.title}</span>,
	}

	return linked ? (
		<Link
			href={{
				pathname: `/${WORK_DIR}`,
				query: { category: value?.slug.current },
			}}
			{...props}
		/>
	) : (
		<div {...props} />
	)
}
