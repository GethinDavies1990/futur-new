import { cn } from '@/lib/utils'
import { stegaClean } from 'next-sanity'

export default function Pretitle({
	className,
	children,
}: React.ComponentProps<'p'>) {
	if (!children) return null

	return (
		<div className="flex items-center justify-center">
			<div className="text-accent mr-2 text-2xl">[</div>
			<h3
				className={cn(
					'technical text-figtree !not-uppercase text-accent !text-sm !font-normal !tracking-normal',
					className,
				)}
				style={{ fontFamily: 'var(--font-figtree)' }}
			>
				{stegaClean(children)}
			</h3>
			<div className="text-accent ml-2 text-2xl">]</div>
		</div>
	)
}
