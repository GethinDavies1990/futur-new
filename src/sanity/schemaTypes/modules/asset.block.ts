import { defineType, defineField } from 'sanity'
import { MdInsertPhoto } from 'react-icons/md'

export default defineType({
	name: 'asset.block',
	title: 'Asset Block',
	type: 'object',
	icon: MdInsertPhoto,
	fields: [
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true,
			},
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			media: 'image',
		},
	},
})
