import { Router } from 'express'

import authController from '../controllers/auth.controller'
import { validateToken } from '../middlewares/role.middleware'
import { validateUserRegister } from '../validators/requestValidator.utils'
import checkValidation from '../middlewares/jsonbody.middleware'

const router = Router()

//USER AUTH ROUTES
router.post('/login', authController.userLogin)

router.post(
  '/register',
  validateUserRegister,
  checkValidation,
  authController.userRegister,
)

//ADMIN AUTH ROUTES
router.post('/login/admin', authController.busOwnerLogin)

router.post('/register/admin', authController.busOwnerRegister)

router.post('/login/superadmin', authController.superAdminLogin)

//logout routes
router.post('/logout', validateToken, authController.userLogoutController)

export default router
