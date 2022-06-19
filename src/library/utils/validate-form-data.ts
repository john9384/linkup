import { BAD_REQUEST } from '../constants/http-status'
import { ValidationError } from '../helpers/error'

export const validateFormData = (Validator: any, formData: any) => {
	const validate = Validator.validate({ ...formData })
	if (validate.error) {
		throw new ValidationError({
			message: validate.error.details[0].message,
			status: BAD_REQUEST,
		})
	}
}
