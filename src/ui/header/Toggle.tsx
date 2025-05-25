import { BsPlusCircleFill } from 'react-icons/bs'

export default function Toggle() {
	return (
		<label className="transition duration-700 [grid-area:toggle] md:hidden">
			<input id="header-toggle" type="checkbox" hidden />

			<span className="header-open:hidden flex items-center gap-2">
				Menu <BsPlusCircleFill size={20} />
			</span>
			<span className="header-closed:hidden flex items-center gap-2">
				Menu <BsPlusCircleFill size={20} className="rotate-45" />
			</span>
		</label>
	)
}
