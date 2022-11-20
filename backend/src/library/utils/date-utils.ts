export const timeDifference = (initial: any, final: any) => final - initial

export const tokenExpired = (tokenExpires?: string) => {
	// This algorithim is for 5mins tokens
	const currTime = Date.now()
	const timeDiff = Number(tokenExpires) - currTime
	if (timeDiff <= 0) return true

	return false
}

export const minsToMilliSec = (mins: any) => mins * 60000

export const milliSecToDays = (milli: any) => {
	const oneDay = 24 * 60 * 60 * 1000
	return milli / oneDay
}

export const isEqual = (dateOne: any, dateTwo: any): boolean => {
	const firstDate = new Date(dateOne).toDateString()
	const secDate = new Date(dateTwo).toDateString()

	return firstDate === secDate
}
