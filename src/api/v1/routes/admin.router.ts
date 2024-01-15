import { Router } from "express";

import adminController from "../controllers/admin.controller";

const router = Router();

router.post("/",adminController.verifyUser)

// router.get("/",adminController)

export default router;