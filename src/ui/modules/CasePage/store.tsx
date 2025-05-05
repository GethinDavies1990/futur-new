import { useQueryState } from 'nuqs'

export const useCasePageFilters = () => {
	const [category, setCategory] = useQueryState('category', {
		defaultValue: 'All',
	})

	const [author, setAuthor] = useQueryState('author')

	return {
		category,
		author,
		setCategory,
		setAuthor,
	}
}
