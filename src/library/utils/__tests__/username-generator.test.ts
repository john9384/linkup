import { generateUsername } from '../username-generator'

describe('utils', () => {
	describe('remove-property', () => {
		it('should generate a username from firstname and lastname', () => {
			const firstname = 'John'
			const lastname = 'Doe'
			const first = firstname.substring(0, 4)
			const last = lastname.substring(0, 4)
			let timestamp = new Date().getTime()
			let code = `${timestamp}`.substring(9, 13)
			const staticUsername = `${first.toLowerCase()}${last.toLowerCase()}${code}`

			const generatedUsername = generateUsername(firstname, lastname)

			expect(generatedUsername).toEqual(staticUsername)
		})
	})
})
