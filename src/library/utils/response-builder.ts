export interface IResponseData {
	[key: string]: any
}
interface IBuildResponse {
	success: boolean
	message: string
	data: IResponseData
}

export const buildResponse = ({ success, message, data }: IBuildResponse) => {
	return {
		success,
		message,
		data,
	}
}
