import { type SchemaTypeDefinition } from 'sanity'

// documents
import site from './documents/site'
import page from './documents/page'
import globalModule from './documents/global-module'
import blogPost from './documents/blog.post'
import blogCategory from './documents/blog.category'
import workPost from './documents/work.post'
import workCategory from './documents/work.category'
import navigation from './documents/navigation'
import redirect from './documents/redirect'

// miscellaneous
import announcement from './misc/announcement'
import logo from './misc/logo'
import person from './misc/person'
import pricing from './misc/pricing'
import reputation from './misc/reputation'
import testimonial from './misc/testimonial'
import services from './misc/services'
import media from './misc/media'

// objects
import cta from './objects/cta'
import icon from './objects/icon'
import img from './objects/img'
import link from './objects/link'
import linkList from './objects/link.list'
import metadata from './objects/metadata'
import moduleOptions from './objects/module-options'

// modules
import accordionList from './modules/accordion-list'
import assetBlock from './modules/asset.block'
import blogFrontpage from './modules/blog-frontpage'
import blogList from './modules/blog-list'
import blogPostContent from './modules/blog-post-content'
import workFrontpage from './modules/work-frontpage'
import workList from './modules/work-list'
import workPostContent from './modules/work-post-content'
import breadcrumbs from './modules/breadcrumbs'
import callout from './modules/callout'
import cardList from './modules/card-list'
import creativeModule from './modules/creative'
import customHtml from './modules/custom-html'
import flagList from './modules/flag-list'
import hero from './modules/hero'
import heroSaas from './modules/hero.saas'
import heroSplit from './modules/hero.split'
import logoList from './modules/logo-list'
import personList from './modules/person-list'
import pricingList from './modules/pricing-list'
import richtextModule from './modules/richtext-module'
import scheduleModule from './modules/schedule-module'
import searchModule from './modules/search-module'
import statList from './modules/stat-list'
import stepList from './modules/step-list'
import tabbedContent from './modules/tabbed-content'
import testimonialFeatured from './modules/testimonial.featured'
import testimonialList from './modules/testimonial-list'
import testimonialListTitle from './modules/testimonial.list.title'
import Video from './modules/video'
import mediaCarousel from './modules/media-carousel'
import contentSection from './modules/content.section'
import servicesList from './modules/services.list'
import contactForm from './modules/contact-form'
import calloutAsset from './modules/callout-asset'

export const schemaTypes: SchemaTypeDefinition[] = [
	// documents
	site,
	page,
	globalModule,
	blogPost,
	blogCategory,
	workPost,
	workCategory,
	navigation,

	// miscellaneous
	announcement,
	redirect,
	logo,
	person,
	pricing,
	services,
	reputation,
	testimonial,
	media,

	// objects
	cta,
	icon,
	img,
	link,
	linkList,
	metadata,
	moduleOptions,

	// modules
	accordionList,
	assetBlock,
	blogFrontpage,
	blogList,
	blogPostContent,
	workFrontpage,
	workList,
	workPostContent,
	breadcrumbs,
	callout,
	calloutAsset,
	cardList,
	contentSection,
	creativeModule,
	customHtml,
	flagList,
	hero,
	heroSaas,
	Video,
	mediaCarousel,
	heroSplit,
	logoList,
	personList,
	pricingList,
	servicesList,
	richtextModule,
	scheduleModule,
	searchModule,
	statList,
	stepList,
	tabbedContent,
	testimonialFeatured,
	testimonialList,
	testimonialListTitle,
	contactForm,
]
