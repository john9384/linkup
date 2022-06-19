import Joi from 'joi'

export const VSignup = Joi.object({
	firstName: Joi.string().min(3).max(50).label('firstName').required(),
	lastName: Joi.string().min(3).max(50).label('lastName').required(),
	email: Joi.string().email({ minDomainSegments: 2 }).required().label('email'),
	password: Joi.string()
		.min(8)
		.label('password')
		.regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/)
		.required()
		.messages({
			'string.min': '"Password" must have at least 8 characters',
			'object.regex': '"Password" must have at least 8 characters',
			'string.pattern.base': `"Password" must have a minimum (8) eight characters, at least one uppercase letter, one number and one special character is required`,
		}),
	confirmPassword: Joi.any()
		.valid(Joi.ref('password'))
		.messages({ 'any.valid': 'Password mismatch' })
		.required(),
})

export const VLogin = Joi.object({
	email: Joi.string().email({ minDomainSegments: 2 }).required().label('email'),
	password: Joi.string().label('password').required(),
})
