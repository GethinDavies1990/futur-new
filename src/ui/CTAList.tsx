import { FiArrowRight, FiDownload } from 'react-icons/fi' // example icons
import { BsArrowUpRightCircle } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'

import CTA from './CTA'
import { cn } from '@/lib/utils'

export default function CTAList({
	ctas,
	className,
}: {
	ctas?: Sanity.CTA[]
} & React.ComponentProps<'div'>) {
	if (!ctas?.length) return null

	const icons = [<BsArrowUpRightCircle />] // or however you want to pick icons

	return (
		<div className={cn('flex flex-wrap items-center gap-[.5em]', className)}>
			{ctas?.map((cta, key) => <CTA {...cta} icon={icons[key]} key={key} />)}
		</div>
	)
}
