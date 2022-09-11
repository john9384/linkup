export interface IBaseRepository {
	create(query?: any): Promise<any>
	read(query?: any): Promise<any>
	update(query: any, data: any): Promise<any>
	destroy(query?: any): Promise<any>
}
