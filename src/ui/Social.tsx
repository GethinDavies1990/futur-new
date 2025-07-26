import { getSite } from '@/sanity/lib/queries'
import CTA from './CTA'
import { cn } from '@/lib/utils'
import { FaFacebook, FaInstagramSquare, FaLinkedin } from 'react-icons/fa'
import {
	FaBluesky,
	FaGithub,
	FaTiktok,
	FaXTwitter,
	FaYoutube,
} from 'react-icons/fa6'
import { IoIosLink } from 'react-icons/io'
import type { ComponentProps } from 'react'

export default async function Social({ className }: ComponentProps<'div'>) {
	const { social } = await getSite()

	if (!social?.items?.length) return null

	return (
		<nav className={cn('group flex flex-wrap items-center', className)}>
			{social.items.map((item, key) => {
				switch (item._type) {
					case 'link':
						return (
							<CTA
								className="px-2 py-1 group-has-[a:hover]:opacity-50 hover:!opacity-100"
								link={item}
								key={key}
							>
								<Icon
									url={item.external}
									aria-label={item.label}
									className="h-[20px] w-[20px] text-white"
								/>
								<span className="sr-only">{item.label}</span>
							</CTA>
						)

					default:
						return null
				}
			})}
		</nav>
	)
}

function Icon({
	url,
	'aria-label': ariaLabel,
	...props
}: { url?: string } & React.ComponentProps<'svg'>) {
	if (!url) return null

	const iconProps = { 'aria-label': ariaLabel, role: 'img', ...props }

	return url?.includes('bsky.app') ? (
		<FaBluesky {...iconProps} />
	) : url?.includes('facebook.com') ? (
		<FaFacebook {...iconProps} />
	) : url?.includes('github.com') ? (
		<FaGithub {...iconProps} />
	) : url?.includes('instagram.com') ? (
		<FaInstagramSquare {...iconProps} />
	) : url?.includes('linkedin.com') ? (
		<FaLinkedin {...iconProps} />
	) : url?.includes('tiktok.com') ? (
		<FaTiktok {...iconProps} />
	) : url?.includes('twitter.com') || url?.includes('x.com') ? (
		<FaXTwitter {...iconProps} />
	) : url?.includes('youtube.com') ? (
		<FaYoutube {...iconProps} />
	) : (
		<IoIosLink {...iconProps} />
	)
}
