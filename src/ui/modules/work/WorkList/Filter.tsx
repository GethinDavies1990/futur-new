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
					? 'mx-2 rounded-full border border-gray-300 bg-gray-600'
					: 'mx-2 rounded-full bg-gray-100',
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
