import { INotification } from './INotification'

export interface ICreateNotification {
	[key: string]: any
}

export interface IUpdateNotification {
	[key: string]: any
}

export interface IReadNotification {
	[key: string]: any
}

export interface IDeleteNotification {
	[key: string]: any
}

export interface INotificationDTO {
	read(payload: IReadNotification): Partial<INotification>
	create(payload: ICreateNotification): Promise<ICreateNotification>
	update(payload: IUpdateNotification): IUpdateNotification
	delete(payload: IDeleteNotification): IDeleteNotification
}
