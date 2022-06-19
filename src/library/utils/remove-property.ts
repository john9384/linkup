export const removePropertyFromObject = (
	obj: any,
	fields: string[],
): object => {
	for (let field of fields) {
		delete obj[field]
	}
	return obj
}
