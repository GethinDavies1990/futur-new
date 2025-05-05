import AccordionList from './AccordionList'
import BlogFrontpage from './blog/BlogFrontpage'
import BlogList from './blog/BlogList'
import BlogPostContent from './blog/PostContent'
import CasePageFrontpage from './CasePage/CasePageFrontpage'
import CasePageList from './CasePage/CasePageList'
import CasePagePostContent from './CasePage/PostContent'
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
	'case-frontpage': CasePageFrontpage,
	'case-list': CasePageList,
	'case-post-content': CasePagePostContent,
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
	casePost,
}: {
	modules?: Sanity.Module[]
	page?: Sanity.Page | Sanity.BlogPost | Sanity.CasePagePost
	post?: Sanity.BlogPost
	casePost?: Sanity.CasePagePost
}) {
	const getAdditionalProps = (module: Sanity.Module) => {
		switch (module._type) {
			case 'blog-post-content':
				return { post }
			case 'case-post-content':
				return { casePost }
			case 'breadcrumbs':
				return { currentPage: post || casePost || page }
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
						{...getAdditionalProps(module)}
						currentPage={post || casePost || page}
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
