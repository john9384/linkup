import bcrypt from 'bcrypt'

export const bcryptEncode = async (text: string): Promise<string> => {
	return await bcrypt.hash(text, 10)
}

export const bcryptCompare = async (
	text: string,
	hash: string,
): Promise<boolean> => {
	return await bcrypt.compare(text, hash)
}
