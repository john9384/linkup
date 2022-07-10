function replaceId(obj: any) {
	let newObj = {}
	if (obj.hasOwnProperty('id')) {
		const _id = obj.id.toUpperCase()
		delete obj['id']
		newObj = {
			_id,
			...obj,
		}
	}

	console.log(newObj)
}

replaceId({
	id: 'soufa98dfa98dufo23lr98u',
	name: 'Shola',
})
