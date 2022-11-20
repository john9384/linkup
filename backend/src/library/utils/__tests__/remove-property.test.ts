import { removePropertyFromObject } from '../remove-property'

describe('utils', () => {
	describe('remove-property', () => {
		it('should remove a property from an object', () => {
			const obj = {
				a: 1,
				b: 2,
				c: 3,
			}

			const newObj1 = removePropertyFromObject(obj, ['a'])
			const newObj2 = removePropertyFromObject(obj, ['a', 'b'])

			expect(newObj1).toEqual({
				b: 2,
				c: 3,
			})

			expect(newObj2).toEqual({
				c: 3,
			})
		})
	})
})
