import fs from 'fs'
import multer from 'multer'
import { Request } from 'express'
import { logger } from '../../library/helpers'

export const removeFile = async (imgPath: string) => {
	try {
		// const realPath = imgPath.replace("http://localhost:4000/src/", "");
		// const x = path.join(__dirname, `../../${realPath}`);
		fs.unlinkSync(imgPath)
	} catch (err: any) {
		logger.error(err.message)
	}
}

export const fileStorage = multer.diskStorage({
	destination: (req: Request, file: any, cb: any) => {
		cb(null, 'src/uploads')
	},
	filename: (req: Request, file: any, cb: any) => {
		cb(
			null,
			new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname,
		)
		//cb(null, Date.now() + "-" + file.originalname);
	},
})

export const fileFilter = (req: Request, file: any, cb: any) => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'video/mp4'
	) {
		cb(null, true)
	} else {
		cb(null, false)
		const err = new Error('Only .png, .jpg and .jpeg format allowed!')
		err.name = 'ExtensionError'
		return cb(err)
	}
}
