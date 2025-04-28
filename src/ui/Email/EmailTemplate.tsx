import * as React from 'react'

interface EmailTemplateProps {
	firstName: string
	lastName: string
	email: string
	message: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	firstName,
	lastName,
	email,
	message,
}) => (
	<div>
		<h1>
			You have a message from {firstName} {lastName}!
		</h1>
		<h2>{email}</h2>
		<p>{message}</p>
	</div>
)
