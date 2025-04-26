import { defineField, defineType } from 'sanity'
import { LuDollarSign } from 'react-icons/lu'
import { getBlockText } from 'sanitypress-utils'
import { count } from '@/lib/utils'

export default defineType({
	name: 'services.list',
	title: 'Services list',
	icon: LuDollarSign,
	type: 'object',
	groups: [{ name: 'content', default: true }, { name: 'options' }],
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
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'services',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'services' }],
				},
			],
			group: 'content',
		}),
	],
	preview: {
		select: {
			intro: 'intro',
			services: 'services',
		},
		prepare: ({ intro, services }) => ({
			title: getBlockText(intro) || count(services, 'services'),
			subtitle: 'Services list',
		}),
	},
})
