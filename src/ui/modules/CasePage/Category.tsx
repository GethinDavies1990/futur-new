import Link from 'next/link'
import { CASE_DIR } from '@/lib/env'
import { cn } from '@/lib/utils'

export default function Category({
	value,
	label,
	linked,
}: {
	value?: Sanity.CasePageCategory
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
				pathname: `/${CASE_DIR}`,
				query: { category: value?.slug.current },
			}}
			{...props}
		/>
	) : (
		<div {...props} />
	)
}
