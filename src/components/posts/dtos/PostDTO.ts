import { v2 as cloudinary } from 'cloudinary'
import { userService } from '../../user'
import {
	ICreatePost,
	IDeletePost,
	IPostDTO,
	IReadPost,
	IUpdatePost,
} from '../../../types/post/IPostDTO'
import { removeFile } from '../../../library/middlewares/multer'

export class PostDTO implements IPostDTO {
	public read(payload?: IReadPost): Partial<IReadPost> {
		if (!payload) return {}
		const { userId, id } = payload

		if (userId) return { userId }
		if (id) return { id }

		return {}
	}

	_uploadFiles = async (files: any) => {
		const images: string[] = []
		const videos: string[] = []
		for (let file of files) {
			if (file.mimetype === 'video/mp4') {
				const upload = await cloudinary.uploader.upload(file.path, {
					resource_type: 'video',
					chunk_size: 6000000,
					eager: [
						{ width: 300, height: 300, crop: 'pad', audio_codec: 'none' },
						{
							width: 160,
							height: 100,
							crop: 'crop',
							gravity: 'south',
							audio_codec: 'none',
						},
					],
					eager_async: true,
				})
				videos.push(upload.url)
			} else {
				const upload = await cloudinary.uploader.upload(file.path)
				images.push(upload.url)
			}
			removeFile(file.path)
		}
		return { images, videos }
	}
	public async create(payload: ICreatePost): Promise<ICreatePost> {
		const { userId, content, files } = payload
		let images, videos
		if (files) {
			const uploads = await this._uploadFiles(files)
			images = uploads.images
			videos = uploads.videos
		}
		const user = await userService.read({ id: userId }, [
			'fullname',
			'username',
			'avatar',
		])
		return {
			user,
			userId,
			content,
			images,
			videos,
		}
	}

	public update(payload: IUpdatePost): IUpdatePost {
		const { content, likes } = payload
		return {
			content,
			likes,
		}
	}

	public delete(payload: IDeletePost): IDeletePost {
		return {
			id: payload.id,
		}
	}
}

export const postDTO = new PostDTO()
