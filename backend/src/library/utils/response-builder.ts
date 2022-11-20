export interface IResponseData {
	[key: string]: any
}
interface IBuildResponse {
	success: boolean
	message: string
	data: IResponseData | null
}

export const buildResponse = ({ success, message, data }: IBuildResponse) => ({
	success,
	message,
	data,
})
