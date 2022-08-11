import { Router } from 'express'
import catchErrors from '../../../library/utils/error-boundary'
import isAuthenticated from '../../../library/middlewares/authentication'
import profileController from '../controllers/profileController'

const profileRouter = Router()

profileRouter.get(
	'/',
	isAuthenticated,
	catchErrors(profileController.getProfiles),
)

profileRouter.get(
	'/user/current',
	isAuthenticated,
	catchErrors(profileController.getCurrentUserProfile),
)

profileRouter.get(
	'/:id',
	isAuthenticated,
	catchErrors(profileController.getProfileById),
)
profileRouter.put(
	'/:id',
	isAuthenticated,
	catchErrors(profileController.updateProfile),
)
// profileRouter.put('/upload/bg-img', isAuthenticated, catchErrors(profileController.uploadBgImg))
// profileRouter.put('/upload/avatar', isAuthenticated, catchErrors(profileController.uploadAvatar))
// profileRouter.delete('/:id' isAuthenticated, catchErrors(profileController.deleteUser))

export default profileRouter
