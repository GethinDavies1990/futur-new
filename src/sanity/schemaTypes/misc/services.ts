import { defineField, defineType } from 'sanity'
import { LuDollarSign } from 'react-icons/lu'

export default defineType({
	name: 'services',
	title: 'Services',
	icon: LuDollarSign,
	type: 'document',
	groups: [{ name: 'content', default: true }, { name: 'asset' }],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'highlight',
			type: 'string',
			description: 'e.g. Recommended, Most popular, etc.',
		}),
		defineField({
			name: 'assets',
			title: 'Assets',
			type: 'array',
			of: [{ type: 'img' }],
			validation: (Rule) => Rule.max(1),
			group: 'asset',
		}),
		defineField({
			name: 'price',
			type: 'object',
			options: {
				columns: 2,
			},
			fields: [
				defineField({
					name: 'base',
					type: 'number',
					description: '0 for free, empty to hide',
				}),
				defineField({
					name: 'strikethrough',
					type: 'number',
				}),
				defineField({
					name: 'suffix',
					type: 'string',
					placeholder: 'e.g. /mo, per seat, forever, etc.',
				}),
			],
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }, { type: 'custom-html' }],
		}),
		defineField({
			name: 'testimonial',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'testimonial' }],
				},
			],
		}),
	],
	preview: {
		select: {
			title: 'title',
			price: 'price',
		},
		prepare: ({ title, price }) => ({
			title,
			subtitle: [
				price?.base || 'Free',
				price?.strikethrough && `(${price.strikethrough})`,
				price?.suffix,
			]
				.filter(Boolean)
				.join(' '),
		}),
	},
})
