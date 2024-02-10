import { Router } from 'express';

import authController from '../controllers/auth.controller';
import { validateToken } from '../middleware/role.middleware';

const router = Router();

//USER AUTH ROUTES
router.post('/login', authController.userLogin);

router.post('/register', authController.userRegister);

//ADMIN AUTH ROUTES
router.post('/login/admin', authController.busOwnerLogin);

router.post('/register/admin', authController.busOwnerRegister);

router.post('/login/superadmin', authController.superAdminLogin);

//PROTECTED ROUTES
router.get('/protected', validateToken, (req, res, next) => res.status(200).json({ message: 'Protected Route' }));

export default router;
