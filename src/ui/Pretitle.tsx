import { cn } from '@/lib/utils'
import { stegaClean } from 'next-sanity'

export default function Pretitle({
	className,
	children,
}: React.ComponentProps<'p'>) {
	if (!children) return null

	return (
		<h3
			className={cn(
				'technical text-figtree !not-uppercase text-ink/65 !text-sm !font-normal !tracking-normal',
				className,
			)}
			style={{ fontFamily: 'var(--font-figtree)' }}
		>
			{stegaClean(children)}
		</h3>
	)
}
