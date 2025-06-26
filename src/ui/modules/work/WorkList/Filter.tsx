'use client'

import { useWorkFilters } from '../store'
import { usePageState } from '@/lib/usePagination'
import Category from '../Category'
import { cn } from '@/lib/utils'
import css from './FilterList.module.css'

export default function Filter({
	label,
	value = 'All',
}: {
	label: string
	value?: 'All' | string
}) {
	const { category, setCategory } = useWorkFilters()
	const { setPage } = usePageState()

	return (
		<button
			className={cn(
				css.filter,
				'',
				category === value
					? 'border-accent mx-2 rounded-md border'
					: 'mx-2 rounded-md',
			)}
			onClick={() => {
				setCategory(value)
				setPage(1)
			}}
		>
			<Category label={label} />
		</button>
	)
}
