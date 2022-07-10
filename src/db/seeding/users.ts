import users from './users.json'
import { bcryptEncode } from '../../library/helpers/bcrypt'
import { User } from '../../components/user/models/User'

async function test() {
	const password = await bcryptEncode('@Password123')
	users.forEach((user: any) => {
		const userData = {
			...user,
			password,
		}

		User.create(userData)
	})
}

test()
