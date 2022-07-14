/* eslint-disable no-restricted-syntax */
export const removePropertyFromObject = (
	obj: any,
	fields: string[],
): object => {
	let newObj = { ...obj }

	for (let field of fields) {
		delete newObj[field]
	}

	return newObj
}
