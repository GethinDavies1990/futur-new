'use client'
import Link from 'next/link'
import React from 'react'
import { BiRightArrowAlt } from 'react-icons/bi'
import Image from 'next/image'

function BookCallButton() {
	return (
		<Link
			target="_blank"
			rel="noopener noreferrer"
			href="https://cal.com/wearefutur/chat-with-gethin-futur-media?overlayCalendar=true"
			className="group mt-8 inline-flex items-center justify-between gap-4 rounded-full border border-gray-200 bg-white px-2 py-2 transition-colors duration-500"
		>
			{/* Avatars / Icons */}
			<div className="flex items-center">
				<Image
					src="/icons/futur-emblem-black.svg"
					alt="Futur Media Emblem"
					width={40}
					height={40}
					className="h-8 w-8 rounded-full border border-black object-cover"
				/>

				<Image
					src="/profile.png"
					alt="Profile"
					width={40}
					height={40}
					className="-ml-3 h-8 w-8 rounded-full border border-black object-cover"
				/>
			</div>

			{/* Button Text */}
			<p className="text-md text-gray-800 underline decoration-white">
				Book discovery call
			</p>

			{/* Circle Icon Button */}
			<div className="flex size-8 items-center justify-center rounded-full bg-white transition-colors group-hover:bg-black">
				<BiRightArrowAlt
					size={16}
					className="text-black group-hover:text-white"
				/>
			</div>
		</Link>
	)
}

export default BookCallButton
