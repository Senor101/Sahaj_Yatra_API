import { Router } from "express";

import userController from "../controllers/user.controller";
import { isBusOwner, isSuperAdmin, isUser, validateToken } from "../middlewares/role.middleware";

const router = Router();

router.get("/", validateToken, isBusOwner, userController.getAllUsers);

router.get("/info", validateToken, userController.getUserInfo);

router.get("/unverified", validateToken, isSuperAdmin, userController.getUnverifiedUsers);

router.get("/verified", validateToken, isSuperAdmin, userController.getVerifiedUsers);

// deduct fare handling both entry and exit of a passenger
router.get("/deductfare", userController.deductBusFareController);

router.get("/:id", validateToken, isBusOwner, userController.getIndividualUserController);

router.put("/:id", validateToken, isUser, userController.updateUserDetailController);

//verify user and assign rfid tag
router.post("/:id/verify", validateToken, isSuperAdmin, userController.verifyUserController);

export default router;
