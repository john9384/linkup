/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { ObjectId } from 'mongodb'
import users from './users.json'
import { bcryptEncode } from '../../library/helpers/bcrypt'
import { User } from '../../components/user/models/User'
import ConnectDatabase from '../connectDB'
import DisconnectDatabase from '../disconnectDB'
import Logger from '../../library/helpers/loggers'

async function updateFriends(userIds: string[]) {
	const usersList = await User.find()
	usersList.forEach(async user => {
		const friends = userIds
			.filter(userId => userId !== user.id)
			.map(id => new ObjectId(id))
		const userID = new ObjectId(user.id)
		Logger.info(`Seeding friends for ${user.firstname} ${user.lastname}`)
		await User.updateOne({ _id: userID }, { friends }, { upsert: true })
	})
}

async function seedUsers() {
	const password = await bcryptEncode('@Password123')
	const userData = users.map(user => ({
		...user,
		password,
	}))

	Logger.info('Seeding Users ....')

	// await User.deleteMany({})
	const newUsers = await User.insertMany(userData)
	const newUsersId = newUsers.map(user => user.id)
	await updateFriends(newUsersId)

	return { done: true }
}

ConnectDatabase().then(() =>
	seedUsers().then(status => {
		if (status.done) {
			setTimeout(() => {
				Logger.info('Seeding complete')
				DisconnectDatabase()
			}, 10000)
		}
	}),
)
