import { defineField, defineType } from 'sanity'
import { TfiLayoutMediaLeft } from 'react-icons/tfi'
import { reputationBlock } from '../misc/reputation'

export default defineType({
	name: 'content.section',
	title: 'Content Section',
	icon: TfiLayoutMediaLeft,
	type: 'object',
	groups: [{ name: 'content', default: true }],
	fields: [
		defineField({
			name: 'pretitle',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }, { type: 'custom-html' }, reputationBlock],
			group: 'content',
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'content',
		}),
	],
	preview: {
		select: {
			pretitle: 'pretitle',
		},
		prepare: ({ pretitle }) => ({
			title: pretitle || 'No Pretitle',
			subtitle: 'Content Section',
		}),
	},
})
