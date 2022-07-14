import * as dateUtils from '../date-utils'

describe('utils', () => {
	describe('date utils', () => {
		it('isEqual >> Equal dates should return true', () => {
			const dateOne = new Date('December 17, 1995 03:24:00')
			const dateTwo = new Date('December 17, 1995 03:24:00')

			expect(dateUtils.isEqual(dateOne, dateTwo)).toEqual(true)
		})

		it('minsToMilliSec >> should return correct value', () => {
			const mins = 5
			const milli = dateUtils.minsToMilliSec(mins)

			expect(milli).toEqual(300000)
		})

		it('milliSecToDays >> should return correct value', () => {
			const milli = 300000
			const days = dateUtils.milliSecToDays(milli)

			expect(days).toEqual(0.003472222222222222)
		})

		it('tokenExpired >> Expired token should return true', () => {
			const pastTimestamp = Date.now() - 300000
			const tokenExpires = String(pastTimestamp)

			expect(dateUtils.tokenExpired(tokenExpires)).toEqual(true)
		})

		it('tokenExpired >> Token of current time should return true', () => {
			const timestamp = Date.now()
			const tokenExpires = String(timestamp)

			expect(dateUtils.tokenExpired(tokenExpires)).toEqual(true)
		})

		it('tokenExpired >> Future token should return false', () => {
			const futureTimestamp = Date.now() + 300000
			const tokenExpires = String(futureTimestamp)

			expect(dateUtils.tokenExpired(tokenExpires)).toEqual(false)
		})
	})
})
