import Pretitle from '@/ui/Pretitle'
import { PortableText } from 'next-sanity'

export type RichtextSubModuleType = Sanity.Module<'richtext'> &
	Partial<{
		pretitle: string
		content: any
	}>

export default function RichtextSubModule({
	module,
}: {
	module: RichtextSubModuleType
}) {
	return (
		<div className="richtext headings:text-white text-gray-300">
			<Pretitle>{module.pretitle}</Pretitle>
			<PortableText value={module.content} />
		</div>
	)
}
