import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import { join } from 'path'
import { readdirSync, lstatSync } from 'fs'

i18next.use(Backend).init({
	// debug: true,
	initImmediate: false,
	fallbackLng: 'en',
	lng: 'en',
	preload: readdirSync(join(__dirname, '../../locales/translations')).filter(
		fileName => {
			const joinedPath = join(
				join(__dirname, '../../locales/translations'),
				fileName,
			)
			const isDirectory = lstatSync(joinedPath).isDirectory()
			return isDirectory
		},
	),
	ns: 'backend-app',
	defaultNS: 'backend-app',
	backend: {
		loadPath: './src/locales/translations/{{lng}}.json',
	},
})

export { i18next as i18tn }
