import { Router } from 'express';

import authController from '../controllers/auth.controller';

const router = Router();

//USER AUTH ROUTES
router.post('/login', authController.userLogin);

router.post('/register', authController.userRegister);

//ADMIN AUTH ROUTES
router.post('/login/admin', authController.busOwnerLogin);

router.post('/register/admin', authController.busOwnerRegister);

export default router;
