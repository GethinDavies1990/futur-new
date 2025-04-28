import { EmailTemplate } from '../../../ui/Email/EmailTemplate'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
	try {
		const body = await request.json()
		const { firstName, lastName, email, message } =
			body

		const { data, error } = await resend.emails.send({
			from: `${firstName} <hello@submissions.futurmedia.co.uk>`,
			to: ['hello@futurmedia.co.uk'],
			subject: `You have a form submission from ${firstName} ${lastName}`,
			react: (
				<EmailTemplate
					firstName={firstName}
					lastName={lastName}
					email={email}
					message={message}
				/>
			),
		})

		if (error) {
			return Response.json({ error }, { status: 500 })
		}

		return Response.json(data)
	} catch (error) {
		return Response.json({ error }, { status: 500 })
	}
}