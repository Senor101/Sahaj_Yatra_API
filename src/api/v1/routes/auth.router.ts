import { Router } from "express";

import authController from "../controllers/auth.controller";

const router = Router();

//USER AUTH ROUTES
router.post("/login", authController.loginUser);

router.post("/register", authController.registerUser);

//ADMIN AUTH ROUTES
router.post("/login/admin", authController.adminLogin);

router.post("/register/admin", authController.adminRegister);

export default router;
