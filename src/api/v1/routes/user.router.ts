import { Router } from 'express';

import userController from '../controllers/user.controller';

const router = Router();

router.get('/', userController.getAllUsers);

router.get('/deduct-fare', userController.deductBusFareController);

router.get('/unverified', userController.getUnverifiedUsers);

router.get('/verified', userController.getVerifiedUsers);

export default router;
