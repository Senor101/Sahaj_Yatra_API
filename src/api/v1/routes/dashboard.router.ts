import {Router} from 'express'

import {getBusownerDashboardController, getUserDashboardController} from '../controllers/dashboard.controller';
import { isBusOwner, isUser, validateToken } from '../middlewares/role.middleware';

const dashboardRouter = Router()

dashboardRouter.get(
  '/busowner',
  validateToken,
  isBusOwner,
  getBusownerDashboardController
)

dashboardRouter.get(
  '/user',
  validateToken,
  isUser,
  getUserDashboardController
)

export default dashboardRouter;