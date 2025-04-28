import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
	name: 'contact-form',
	title: 'Contact Form',
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
			group: 'content',
			of: [{ type: 'block' }, { type: 'custom-html' }],
		}),
	],
})
