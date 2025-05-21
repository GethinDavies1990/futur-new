import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { DEFAULT_LANG } from '@/lib/i18n'
import { BLOG_DIR } from '@/lib/env'
import { WORK_DIR } from '@/lib/env'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const data = await fetchSanityLive<Record<string, MetadataRoute.Sitemap>>({
		query: groq`{
  // Blog posts
  'blog': *[_type == 'blog.post' && metadata.noIndex != true] | order(name) {
    'url': (
      $baseUrl
      + select(defined(language) && language != $defaultLang => language + '/', '')
      + '${BLOG_DIR}/'
      + metadata.slug.current
    ),
    'lastModified': _updatedAt,
    'priority': 0.4
  },

  // Work posts
  'work': *[_type == 'work.post' && metadata.noIndex != true] | order(name) {
    'url': (
      $baseUrl
      + select(defined(language) && language != $defaultLang => language + '/', '')
      + '${WORK_DIR}/'
      + metadata.slug.current
    ),
    'lastModified': _updatedAt,
    'priority': 0.4
  },

  // Optional: Static pages
  'pages': *[_type == 'page' && metadata.noIndex != true] | order(name) {
    'url': (
      $baseUrl
      + select(defined(language) && language != $defaultLang => language + '/', '')
      + metadata.slug.current
    ),
    'lastModified': _updatedAt,
    'priority': 0.6
  }
}`,
		params: {
			baseUrl: process.env.NEXT_PUBLIC_BASE_URL + '/',
			defaultLang: DEFAULT_LANG,
		},
	})

	return Object.values(data).flat()
}
