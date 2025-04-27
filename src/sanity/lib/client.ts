import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from '@/sanity/lib/env'
import { dev } from '@/lib/env'
import imageUrlBuilder from '@sanity/image-url'

// Create Sanity client
export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: !dev,
	stega: {
		studioUrl: '/admin',
	},
})

// Set up the image URL builder
const builder = imageUrlBuilder(client)

// Function to get the URL for a file (image/video)
export function getFileUrl(file: any) {
	if (!file?.asset?._ref) return ''

	// Check if the file is an image
	if (file.asset?.metadata?.type.startsWith('image')) {
		return builder.image(file).url()
	}

	// Handle video or other file types, returning the original URL
	return file?.asset?.url || ''
}
