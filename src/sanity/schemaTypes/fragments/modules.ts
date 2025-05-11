import { defineField } from 'sanity'

export default defineField({
	name: 'modules',
	description: 'Page content',
	type: 'array',
	of: [
		{ type: 'accordion-list' },
		{ type: 'asset.block' },
		{ type: 'blog-frontpage' },
		{ type: 'blog-list' },
		{ type: 'blog-post-content' },
		{ type: 'work-frontpage' },
		{ type: 'work-list' },
		{ type: 'work-post-content' },
		{ type: 'breadcrumbs' },
		{ type: 'callout' },
		{ type: 'callout-asset' },
		{ type: 'card-list' },
		{ type: 'creative-module' },
		{ type: 'custom-html' },
		{ type: 'flag-list' },
		{ type: 'hero' },
		{ type: 'hero.saas' },
		{ type: 'video' },
		{ type: 'media-carousel' },
		{ type: 'hero.split' },
		{ type: 'logo-list' },
		{ type: 'person-list' },
		{ type: 'services.list' },
		{ type: 'pricing-list' },
		{ type: 'richtext-module' },
		{ type: 'schedule-module' },
		{ type: 'search-module' },
		{ type: 'stat-list' },
		{ type: 'step-list' },
		{ type: 'tabbed-content' },
		{ type: 'testimonial-list' },
		{ type: 'testimonial.list.title' },
		{ type: 'testimonial.featured' },
		{ type: 'content.section' },
		{ type: 'contact-form' },
	],
	options: {
		insertMenu: {
			views: [
				{
					name: 'grid',
					previewImageUrl: (schemaType) =>
						`/admin/thumbnails/${schemaType}.webp`,
				},
				{ name: 'list' },
			],
			groups: [
				{
					name: 'blog',
					of: ['blog-frontpage', 'blog-list', 'blog-post-content'],
				},
				{
					name: 'case',
					of: ['work-frontpage', 'work-list', 'work-post-content'],
				},

				{
					name: 'hero',
					of: ['hero', 'hero.saas', 'hero.split'],
				},
				{
					name: 'lists',
					of: [
						'accordion-list',
						'blog-list',
						'work-list',
						'card-list',
						'flag-list',
						'logo-list',
						'person-list',
						'pricing-list',
						'services.list',
						'stat-list',
						'step-list',
						'testimonial-list',
					],
				},
				{
					name: 'testimonials',
					of: ['testimonial-list', 'testimonial.featured'],
				},
			],
		},
	},
})
