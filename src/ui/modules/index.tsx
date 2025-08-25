// src/ui/modules/index.tsx  (server component — do NOT add "use client")
import AccordionList from './AccordionList'
import BlogFrontpage from './blog/BlogFrontpage'
import BlogList from './blog/BlogList'
import BlogPostContent from './blog/PostContent'
import WorkFrontpage from './work/WorkFrontpage'
import WorkList from './work/WorkList'
import WorkPostContent from './work/PostContent'
import Breadcrumbs from './Breadcrumbs'
import Callout from './Callout'
import CardList from './CardList'
import CustomHTML from './CustomHTML'
import FlagList from './FlagList'
import Hero from './Hero'
import HeroSplit from './HeroSplit'
import HeroSaaS from './HeroSaaS'
import LogoList from './LogoList'
import RichtextModule from './RichtextModule'
import ScheduleModule from './ScheduleModule'
import SearchModule from './SearchModule'
import StatList from './StatList'
import StepList from './StepList'
import TabbedContent from './TabbedContent'
import TestimonialList from './TestimonialList'
import TestimonialFeatured from './TestimonialFeatured'
import Video from './Video'
import ContentSection from './ContentSection'
import ContactForm from './ContactForm'
import TestimonialListTitle from './TestimonialListTitle'
import CalloutAsset from './CalloutAsset'
import MediaCarousel from './MediaCarousel'
import AssetBlock from './AssetBlock'

import dynamic from 'next/dynamic'
import { createDataAttribute } from 'next-sanity'

// Explicit SSR=true so crawlers get HTML for these, too
const CreativeModule = dynamic(() => import('./CreativeModule'), { ssr: true })
const PersonList = dynamic(() => import('./PersonList'), { ssr: true })
const PricingList = dynamic(() => import('./PricingList'), { ssr: true })
const ServicesList = dynamic(() => import('./ServicesList'), { ssr: true })

const MODULE_MAP = {
	'accordion-list': AccordionList,
	'blog-frontpage': BlogFrontpage,
	'blog-list': BlogList,
	'blog-post-content': BlogPostContent,
	'work-frontpage': WorkFrontpage,
	'work-list': WorkList,
	'work-post-content': WorkPostContent,
	breadcrumbs: Breadcrumbs,
	callout: Callout,
	'callout-asset': CalloutAsset,
	'card-list': CardList,
	'content.section': ContentSection,
	'creative-module': CreativeModule,
	'custom-html': CustomHTML,
	'flag-list': FlagList,
	hero: Hero,
	'hero.split': HeroSplit,
	'hero.saas': HeroSaaS,
	'logo-list': LogoList,
	'person-list': PersonList,
	'pricing-list': PricingList,
	'services.list': ServicesList,
	'richtext-module': RichtextModule,
	'schedule-module': ScheduleModule,
	'search-module': SearchModule,
	'stat-list': StatList,
	'step-list': StepList,
	'tabbed-content': TabbedContent,
	'testimonial-list': TestimonialList,
	'testimonial.list.title': TestimonialListTitle,
	'testimonial.featured': TestimonialFeatured,
	'contact-form': ContactForm,
	video: Video,
	'media-carousel': MediaCarousel,
	'asset.block': AssetBlock,
} as const

export default function Modules({
	modules,
	page,
	post,
	workPost,
}: {
	modules?: Sanity.Module[]
	page?: Sanity.Page
	post?: Sanity.BlogPost
	workPost?: Sanity.WorkPost
}) {
	const getAdditionalProps = (module: Sanity.Module) => {
		switch (module._type) {
			case 'blog-post-content':
				return { post }
			case 'work-post-content':
				return { workPost }
			case 'breadcrumbs':
				return { currentPage: post || page }
			default:
				return {}
		}
	}

	return (
		<>
			{modules?.map((module) => {
				if (!module) return null
				const Component =
					MODULE_MAP[module._type as keyof typeof MODULE_MAP]
				if (!Component) return null

				return (
					<Component
						key={module._key}
						{...module}
						{...getAdditionalProps(module)}
						data-sanity={
							!!page?._id &&
							createDataAttribute({
								id: page._id,
								type: page._type,
								path: `page[_key == "${module._key}"]`,
							}).toString()
						}
					/>
				)
			})}
		</>
	)
}
