import { defineField, defineType } from 'sanity'
import { VscEdit } from 'react-icons/vsc'

export default defineType({
	name: 'casePage-post-content',
	title: 'Case post content',
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
			title: 'Case post content',
			subtitle: uid && `#${uid}`,
		}),
	},
})
