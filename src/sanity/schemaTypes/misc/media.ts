import { defineType, defineField } from 'sanity'
import { MdPermMedia } from 'react-icons/md'

export default defineType({
	name: 'media',
	title: 'Media',
	type: 'document',
	icon: MdPermMedia,
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),
		defineField({
			name: 'mediaType',
			title: 'Media Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Image', value: 'image' },
					{ title: 'Video', value: 'video' },
				],
				layout: 'radio',
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'media',
			title: 'Media File',
			type: 'file',
			options: {
				accept: 'video/*,image/*', // accepts both images and videos
			},
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: 'title',
			media: 'media',
		},
	},
})
