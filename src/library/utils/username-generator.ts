export const generateUsername = (firstName: string, lastName: string): string => {
	let timestamp = new Date().getTime()
	let code = `${timestamp}`.substring(9, 13)
	const first = firstName.substring(0, 4)
	const last = lastName.substring(0, 4)
	return `${first}.${last}${code}`
}
