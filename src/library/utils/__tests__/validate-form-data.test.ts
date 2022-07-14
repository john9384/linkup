import Joi from 'joi'
import { validateFormData } from '../validate-form-data'

describe('utils', () => {
	describe('validate-form-data', () => {
		const validator = Joi.object({
			name: Joi.string().min(3).max(50).label('firstname').required().messages({
				'any.required': 'Firstname is required',
				'string.empty': 'Firstname is required',
				'string.min': 'Firstname must be at least 3 characters',
				'string.max': 'Firstname must be at most 50 characters',
			}),
			email: Joi.string()
				.email({ minDomainSegments: 2 })
				.required()
				.label('email')
				.messages({
					'any.required': 'Email is required',
					'string.empty': 'Email is required',
					'string.email': 'Email is invalid',
				}),
			password: Joi.string()
				.min(8)
				.label('password')
				.regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/)
				.required()
				.messages({
					'any.required': 'Password is required',
					'string.min': '"Password" must have at least 8 characters',
					'string.required': '"Password" is required',
					'object.regex': '"Password" must have at least 8 characters',
					'string.pattern.base':
						'Password must have a minimum (8) eight characters, at least one uppercase letter, one number and one special character is required',
				}),
		})

		it('Empty Fields >> Should throw error if form data is invalid', () => {
			const formData = {
				name: '',
				email: '',
				password: '',
			}

			expect(() => validateFormData(validator, formData)).toThrow()
		})

		it('Invalid Email >> Should throw error if form data is invalid', () => {
			const formData = {
				name: 'John Doe',
				email: 'johndoe',
				password: '@Password123',
			}

			expect(() => validateFormData(validator, formData)).toThrow()
		})
		it('Invalid Password >> Should throw error if form data is invalid', () => {
			const formData = {
				name: 'JohnDoe',
				email: 'johndoe@gmail.com',
				password: 'password',
			}

			expect(() => validateFormData(validator, formData)).toThrow()
		})

		it('Valid form >> Should not throw error for valid form', () => {
			const formData = {
				name: 'John Doe',
				email: 'johndoe@gmail.com',
				password: '@Password123',
			}

			expect(validateFormData(validator, formData)).toEqual(true)
		})
	})
})
