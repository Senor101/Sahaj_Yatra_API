import {Router} from 'express'

import {getBusownerDashboardController} from '../controllers/dashboard.controller';
import { isBusOwner, validateToken } from '../middlewares/role.middleware';

const dashboardRouter = Router()

dashboardRouter.get(
  '/busowner',
  validateToken,
  isBusOwner,
  getBusownerDashboardController
  )

export default dashboardRouter;