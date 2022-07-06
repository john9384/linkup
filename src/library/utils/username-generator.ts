export const generateUsername = (
	firstname: string,
	lastname: string,
): string => {
	let timestamp = new Date().getTime()
	let code = `${timestamp}`.substring(9, 13)
	const first = firstname.substring(0, 4)
	const last = lastname.substring(0, 4)
	return `${first}.${last}${code}`
}
