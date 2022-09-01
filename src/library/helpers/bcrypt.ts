import bcrypt from 'bcryptjs'

export const bcryptEncode = (text: string): string => bcrypt.hashSync(text, 10)

export const bcryptCompare = (text: string, hash: string): boolean =>
	bcrypt.compareSync(text, hash)
