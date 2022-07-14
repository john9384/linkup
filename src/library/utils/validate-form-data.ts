import { BAD_REQUEST } from '../constants/http-status'
import { ValidationError } from '../helpers/error'

export const validateFormData = (Validator: any, formData: any) => {
	const validate = Validator.validate({ ...formData })
	if (validate.error) {
		throw new ValidationError({
			message: validate.error.details[0].message,
			status: BAD_REQUEST,
		})
	} else return true
}

// Investigate this snippet working for the validateFormData method
// const validator = {
// 	name: {
// 		presence: true,
// 	},
// 	email: {
// 		presence: true,
// 		email: true,
// 	},
// 	password: {
// 		presence: true,
// 		length: {
// 			minimum: 6,
// 		},
// 	},
// }
