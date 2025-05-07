import { defineField, defineType } from 'sanity'
import { VscEdit } from 'react-icons/vsc'

export default defineType({
	name: 'work-post-content',
	title: 'Work post content',
	icon: VscEdit,
	type: 'object',
	fields: [
		defineField({
			name: 'options',
			title: 'Module options',
			type: 'module-options',
		}),
	],
	preview: {
		select: {
			uid: 'options.uid',
		},
		prepare: ({ uid }) => ({
			title: 'Work post content',
			subtitle: uid && `#${uid}`,
		}),
	},
})
