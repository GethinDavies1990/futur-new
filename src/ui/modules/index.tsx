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

import dynamic from 'next/dynamic'
import { createDataAttribute } from 'next-sanity'

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
	'creative-module': dynamic(() => import('./CreativeModule')),
	'custom-html': CustomHTML,
	'flag-list': FlagList,
	hero: Hero,
	'hero.split': HeroSplit,
	'hero.saas': HeroSaaS,
	'logo-list': LogoList,
	'person-list': dynamic(() => import('./PersonList')),
	'pricing-list': dynamic(() => import('./PricingList')),
	'services.list': dynamic(() => import('./ServicesList')),
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
				// Only passing `post` for blog-related modules
				return { post }
			case 'work-post-content':
				// Only passing `casePost` for case-related modules
				return { workPost }
			case 'breadcrumbs':
				// Make sure that we pass the right `currentPage` based on the available types
				return { currentPage: post || page }
			default:
				return {}
		}
	}

	return (
		<>
			{modules?.map((module) => {
				if (!module) return null

				const Component = MODULE_MAP[module._type as keyof typeof MODULE_MAP]
				if (!Component) return null

				return (
					<Component
						key={module._key}
						{...module}
						{...getAdditionalProps(module)} // Pass correct props here
						currentPage={post || page} // Decide which one to pass as currentPage
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
