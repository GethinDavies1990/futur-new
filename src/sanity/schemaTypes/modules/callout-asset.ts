import { defineArrayMember, defineField, defineType } from 'sanity'
import { VscInspect } from 'react-icons/vsc'
import { reputationBlock } from '../misc/reputation'
import { getBlockText } from 'sanitypress-utils'

export default defineType({
	name: 'callout-asset',
	title: 'Callout with Asset',
	icon: VscInspect,
	type: 'object',
	fields: [
		defineField({
			name: 'media',
			title: 'Media (Image or Video)',
			type: 'object',
			fields: [
				defineField({
					name: 'image',
					title: 'Image',
					type: 'image',
					options: { hotspot: true },
				}),
				defineField({
					name: 'video',
					title: 'Video',
					type: 'file',
					options: {
						accept: 'video/*',
					},
				}),
			],
			validation: (Rule) =>
				Rule.custom((media) => {
					if (media?.image && media?.video) {
						return 'Only one of image or video can be set.'
					}
					return true
				}),
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [
				{ type: 'block' },
				defineArrayMember({
					title: 'Code block',
					type: 'code',
					options: {
						withFilename: true,
					},
				}),
				{ type: 'custom-html' },
				reputationBlock,
			],
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
		}),
	],
	preview: {
		select: {
			content: 'content',
		},
		prepare: ({ content }) => ({
			title: getBlockText(content),
			subtitle: 'Callout with Asset',
		}),
	},
})
