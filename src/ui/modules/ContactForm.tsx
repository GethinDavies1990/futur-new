'use client'
import React, { useState } from 'react'
import Code from './RichtextModule/Code'
import Asset from './Asset'
import Pretitle from '../Pretitle'
import { PortableText } from 'next-sanity'
import { toast } from 'react-hot-toast'

export default function ContactForm({
	content,
	pretitle,
	assets,
}: Partial<{
	content: any
	assets: Array<Sanity.Img | Sanity.Code | Sanity.CustomHTML>
	pretitle: string
}>) {
	const asset = assets?.[0]

	const [data, setData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		message: '',
	})

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		})
	}

	const sendEmail = async (e: React.FormEvent) => {
		e.preventDefault()
		const response = await fetch('api/send', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		if (response.status == 200) {
			setData({
				firstName: '',
				lastName: '',
				email: '',
				message: '',
			})
			toast.success(
				`Hey ${data.firstName} ${data.lastName}, your message was sent successfully!`,
			)
		} else {
			toast.error('Failed to send message. Please try again.')
		}
	}

	return (
		<div className="section">
			<div className="from-accent-40 togray-800 mx-auto flex w-full flex-col rounded-xl bg-gradient-to-br md:w-[80%] lg:w-[60%]">
				{/* Image */}
				{asset && (
					<div className="h-[250px] w-full overflow-hidden rounded-t-lg">
						<Asset asset={asset} />
					</div>
				)}

				{/* Form Content */}
				<div className="p-6 md:p-10">
					{/* Pretitle */}
					<div className="text-center">
						<Pretitle>{pretitle}</Pretitle>
						<div className="h-5"></div>
						<div className="text-sm">
							<PortableText
								value={content}
								components={{
									types: {
										code: ({ value }) => (
											<Code value={value} className="" theme="snazzy-light" />
										),
									},
								}}
							/>
						</div>
					</div>

					{/* Form */}
					<form onSubmit={sendEmail} className="mt-6 flex flex-col gap-4">
						{/* Name Fields */}
						<div className="font-poppins flex flex-col gap-4 md:flex-row">
							<input
								type="text"
								name="firstName"
								value={data.firstName}
								onChange={handleChange}
								placeholder="First Name"
								className="focus:ring-accent w-full rounded-sm bg-gray-900 p-3 focus:ring-1 focus:outline-none"
							/>
							<input
								type="text"
								name="lastName"
								value={data.lastName}
								onChange={handleChange}
								placeholder="Last Name"
								className="focus:ring-accent w-full rounded-sm bg-gray-900 p-3 focus:ring-1 focus:outline-none"
							/>
						</div>

						{/* Contact Info */}
						<div className="flex flex-col gap-4 md:flex-row">
							<input
								type="email"
								name="email"
								value={data.email}
								onChange={handleChange}
								placeholder="Email"
								className="focus:ring-accent w-full rounded-sm bg-gray-900 p-3 focus:ring-1 focus:outline-none"
							/>
						</div>

						{/* Message Box */}
						<textarea
							name="message"
							value={data.message}
							onChange={handleChange}
							rows={4}
							placeholder="Your message"
							className="focus:ring-accent w-full rounded-sm bg-gray-900 p-3 focus:ring-1 focus:outline-none"
						></textarea>

						{/* Submit Button */}
						<div className="flex justify-center">
							<button type="submit" className="action">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
