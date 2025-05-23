'use client'

import PostPreview from '../PostPreview'
import { useWorkFilters } from '../store'

export default function List({
	posts,
	...props
}: {
	posts: Sanity.WorkPost[]
} & React.ComponentProps<'ul'>) {
	const filtered = filterPosts(posts)

	if (!filtered.length) {
		return <div>No posts found...</div>
	}

	return (
		<ul {...props}>
			{filtered?.map((post) => (
				<li className="anim-fade" key={post._id}>
					<PostPreview post={post} />
				</li>
			))}
		</ul>
	)
}

export function filterPosts(posts: Sanity.WorkPost[]) {
	const { category, author } = useWorkFilters()

	return posts.filter((post) => {
		if (category !== 'All' && author)
			return (
				post.authors?.some(({ slug }) => slug?.current === author) &&
				post.categories?.some(({ slug }) => slug?.current === category)
			)

		if (category !== 'All')
			return post.categories?.some(({ slug }) => slug?.current === category)

		if (author)
			return post.authors?.some(({ slug }) => slug?.current === author)

		return true
	})
}
