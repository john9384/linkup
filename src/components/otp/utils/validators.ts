import Joi from 'joi'

export const VOtp = Joi.object({
	transporter: Joi.string().min(3).max(50).label('transporter').required(),
	transporterType: Joi.any()
		.valid('EMAIL', 'PHONE')
		.label('transporterType')
		.required(),
})
