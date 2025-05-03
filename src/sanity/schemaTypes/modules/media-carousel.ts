import { defineType, defineField } from 'sanity'
import { MdViewCarousel } from 'react-icons/md'

export default defineType({
	name: 'media-carousel',
	title: 'Media Carousel',
	type: 'object',
	icon: MdViewCarousel,
	fields: [
		defineField({
			name: 'items',
			title: 'Carousel Items',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'media' }],
				},
			],
			validation: (Rule) =>
				Rule.max(6).warning('You can add up to 6 media items only.'),
		}),
		defineField({
			name: 'autoScroll',
			title: 'Enable Auto Scroll',
			type: 'boolean',
			initialValue: false,
		}),
		defineField({
			name: 'duration',
			title: 'Scroll Duration (seconds)',
			type: 'number',
			initialValue: 12,
			hidden: ({ parent }) => !parent?.autoScroll,
			validation: (Rule) => Rule.min(1).max(60),
		}),
	],
	preview: {
		select: {
			items: 'items',
		},
		prepare({ items }) {
			const count = items?.length || 0
			return {
				title: `Media Carousel (${count} item${count !== 1 ? 's' : ''})`,
			}
		},
	},
})
