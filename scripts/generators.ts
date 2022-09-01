import fs from 'fs'

function generateComponent(name: string) {
	try {
		const dir = `./src/components/${name.toLowerCase()}`

		if (fs.existsSync(dir)) {
			throw new Error(`Component with name ${name} already exists`)
		}

		fs.mkdirSync(dir, { recursive: true })

		const dirContent = [
			`${name.toLowerCase()}.controller.ts`,
			`${name.toLowerCase()}.services.ts`,
			`${name.toLowerCase()}.model.ts`,
			`${name.toLowerCase()}.routes.ts`,
			`${name.toLowerCase()}.types.ts`,
		]

		// eslint-disable-next-line no-restricted-syntax
		for (const file of dirContent) {
			fs.writeFileSync(`${dir}/${file}`, '')
		}

		console.log(`
    generated files
      ${dir}/${name.toLowerCase()}Controller.ts
      ${dir}/${name.toLowerCase()}Service.ts
      ${dir}/${name.toLowerCase()}Model.ts
      ${dir}/${name.toLowerCase()}Routes.ts
      ${dir}/${name.toLowerCase()}Type.ts
    `)
	} catch (err: any) {
		console.log(err.message)
	}
}

function generator() {
	const args = process.argv.slice(2)
	const arg1 = args[0]
	const arg2 = args[1]

	switch (arg1) {
		case 'component':
			generateComponent(arg2)
			break
		default:
			console.log('No command specified')
	}
}

generator()
