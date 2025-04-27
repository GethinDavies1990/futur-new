import { defineArrayMember, defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { reputationBlock } from '../misc/reputation'
import { getBlockText } from 'sanitypress-utils'

export default defineType({
	name: 'video',
	title: 'Video',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	groups: [
		{ name: 'content', default: true },
		{ name: 'asset' },
		{ name: 'options' },
	],
	fields: [
		defineField({
			name: 'options',
			title: 'Module options',
			type: 'module-options',
			group: 'options',
		}),
		defineField({
			name: 'pretitle',
			type: 'string',
			group: 'content',
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
			group: 'content',
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'content',
		}),
		// ✅ ADD THIS
		defineField({
			name: 'videoFile',
			title: 'Video file',
			type: 'file',
			options: {
				accept: 'video/*', // only allow videos
			},
			group: 'asset',
		}),
	],
	preview: {
		select: {
			content: 'content',
			media: 'videoFile', // change this if you want
		},
		prepare: ({ content, media }) => ({
			title: getBlockText(content),
			subtitle: 'Video',
			media,
		}),
	},
})
