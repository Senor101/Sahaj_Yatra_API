import { Router } from 'express';

import userController from '../controllers/user.controller';

const router = Router();

router.get('/', userController.getAllUsers);

router.get('/deduct-fare', userController.deductBusFareController);

router.get('/unverified', userController.getUnverifiedUsers);

router.get('/verified', userController.getVerifiedUsers);

router.get('/:id', userController.getIndividualUserController)

//verify user and assign rfid tag
router.post('/verify/:id', userController.verifyUserController)

router.put('/:id', userController.updateUserDetailController)

export default router;
