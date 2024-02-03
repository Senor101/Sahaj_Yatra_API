import { Router } from 'express';

import adminController from '../controllers/admin.controller';

const router = Router();

router.post('/verify', adminController.verifyUser);

export default router;
