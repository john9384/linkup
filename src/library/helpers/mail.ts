/* eslint-disable import/no-extraneous-dependencies */
import nodemailer, { SendMailOptions } from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'
import { otpMail } from '../../views/emails/otp'

export interface IMailObject extends SendMailOptions {
	mailContent: string
	content: string | number
	subject: string | undefined
	to: string | undefined
	from?: string | undefined
}

export const sendMail = async ({
	mailContent,
	content,
	subject,
	to,
}: IMailObject) => {
	const htmlContent = (val: string) => {
		switch (val) {
			case 'otp':
				return otpMail(content)
			default:
				return ''
		}
	}

	let transporter = nodemailer.createTransport(
		smtpTransport({
			service: 'gmail',
			host: 'smtp.gmail.com',
			auth: {
				user: process.env.NODEMAILER_USER,
				pass: process.env.NODEMAILER_PASS,
			},
		}),
	)

	return transporter.sendMail({
		from: 'noreply@linkup.com',
		to,
		subject: `Linkup - ${subject}`,
		text: 'Linku mail',
		html: htmlContent(mailContent),
	})
}
