import { Router } from 'express';

import userController from '../controllers/user.controller';

const router = Router();

router.get('/', userController.getAllUsers);

router.get('/unverified', userController.getUnverifiedUsers);

router.get('/verified', userController.getVerifiedUsers);

// deduct fare handling both entry and exit of a passenger
router.get('/deductfare', userController.deductBusFareController);

router.get('/:id', userController.getIndividualUserController)

router.put('/:id', userController.updateUserDetailController)

//verify user and assign rfid tag
router.post('/:id/verify', userController.verifyUserController)

export default router;
