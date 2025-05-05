export default function (
	posts: Sanity.CasePagePost[],
	showFeaturedPostsFirst: boolean = true,
) {
	if (showFeaturedPostsFirst)
		return posts.sort((a, b) => (b.featured ? 1 : -1) - (a.featured ? 1 : -1))

	return posts
}
