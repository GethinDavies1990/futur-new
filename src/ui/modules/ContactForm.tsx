'use client'
import React, { useState } from 'react'
import Code from './RichtextModule/Code'
import { TfiArrowRight } from 'react-icons/tfi'
import Pretitle from '../Pretitle'
import { PortableText } from 'next-sanity'
import { toast } from 'react-hot-toast'
import BookCallButton from '@/ui/BookCallButton'
import { useRouter } from 'next/navigation'

export default function ContactForm({
	content,
	pretitle,
}: Partial<{
	content: any
	assets: Array<Sanity.Img | Sanity.Code | Sanity.CustomHTML>
	pretitle: string
}>) {
	const [data, setData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		message: '',
	})

	const router = useRouter()
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
		const response = await fetch('/api/send', {
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
			router.push('/thank-you')
		} else {
			toast.error('Failed to send message. Please try again.')
		}
	}

	return (
		<div
			className="headings:text-black bg-cover bg-center text-gray-600"
			style={{
				backgroundImage: "url('/blue-bg.png')",
			}}
		>
			<div className="section">
				<div className="flex flex-col gap-8 md:flex-row">
					{/* Left Side: Text Content */}
					<div className="flex w-full items-center md:w-1/2">
						<div className="p-6 md:p-10">
							<div className="text-left md:text-left">
								<div className="flex items-center">
									<Pretitle className="mr-2 text-gray-600">
										{pretitle}
									</Pretitle>
									<TfiArrowRight size={14} />
								</div>

								<div className="h-5" />
								<div className="richtext">
									<PortableText
										value={content}
										components={{
											types: {
												code: ({ value }) => (
													<Code
														value={value}
														theme="snazzy-light"
													/>
												),
											},
										}}
									/>
									<BookCallButton />
								</div>
							</div>
						</div>
					</div>

					{/* Right Side: Form */}
					<div className="w-full md:w-1/2">
						<form
							onSubmit={sendEmail}
							className="frosted-glass mx-auto mt-6 flex w-full flex-col gap-4 rounded-xl border-1 border-gray-100 bg-white p-6 text-gray-600 md:p-10"
						>
							<div className="font-poppins flex flex-col gap-4 md:flex-row">
								<input
									type="text"
									name="firstName"
									value={data.firstName}
									onChange={handleChange}
									placeholder="First Name"
									className="focus:ring-accent w-full rounded-sm bg-gray-100 p-3 focus:ring-1 focus:outline-none"
								/>
								<input
									type="text"
									name="lastName"
									value={data.lastName}
									onChange={handleChange}
									placeholder="Last Name"
									className="focus:ring-accent w-full rounded-sm bg-gray-100 p-3 focus:ring-1 focus:outline-none"
								/>
							</div>

							<div className="flex flex-col gap-4 md:flex-row">
								<input
									type="email"
									name="email"
									value={data.email}
									onChange={handleChange}
									placeholder="Email"
									className="focus:ring-accent w-full rounded-sm bg-gray-100 p-3 focus:ring-1 focus:outline-none"
								/>
							</div>

							<textarea
								name="message"
								value={data.message}
								onChange={handleChange}
								rows={4}
								placeholder="Your message"
								className="focus:ring-accent w-full rounded-sm bg-gray-100 p-3 focus:ring-1 focus:outline-none"
							></textarea>
							<small className="text-gray-600">
								By submitting this form I accept the Privacy
								Policy of this site.
							</small>
							<div className="flex justify-start">
								<button type="submit" className="action">
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
