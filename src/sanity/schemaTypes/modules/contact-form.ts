import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
	name: 'contact-form',
	title: 'Contact Form',
	type: 'object',
	groups: [
		{ name: 'content', default: true },
		{ name: 'asset', title: 'Assets' },
	],
	fields: [
		defineField({
			name: 'pretitle',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'content',
			type: 'array',
			group: 'content',
			of: [{ type: 'block' }, { type: 'custom-html' }],
		}),
		defineField({
			name: 'assets',
			title: 'Assets',
			type: 'array',
			of: [
				{ type: 'img' },
				defineArrayMember({
					title: 'Code block',
					type: 'code',
					options: {
						withFilename: true,
					},
				}),
				{ type: 'custom-html' },
			],
			validation: (Rule) => Rule.max(1),
			group: 'asset',
		}),
	],
})
