import { cn } from '@/lib/utils'
import { stegaClean } from 'next-sanity'
import Link from 'next/link'
import resolveUrl from '@/lib/resolveUrl'
import type { ComponentProps, ReactNode } from 'react'

export default function CTA({
	_type,
	_key,
	link,
	style,
	className,
	children,
	icon: Icon, // 👈 take icon here
	...rest
}: Sanity.CTA & { icon?: ReactNode } & ComponentProps<'a'>) {
	const props = {
		className:
			cn('inline-flex items-center gap-2', stegaClean(style), className) ||
			undefined, // 👈 added flex styling
		children: (
			<>
				{/* 👈 render icon if it exists */}
				{children || link?.label || link?.internal?.title || link?.external}
				{Icon && <span className="text-lg">{Icon}</span>}{' '}
			</>
		),
		...rest,
	}

	if (link?.type === 'internal' && link.internal)
		return (
			<Link
				href={resolveUrl(link.internal, {
					base: false,
					params: link.params,
				})}
				{...props}
			/>
		)

	if (link?.type === 'external' && link.external)
		return <a href={stegaClean(link.external)} {...props} />

	return <div {...(props as ComponentProps<'div'>)} />
}
