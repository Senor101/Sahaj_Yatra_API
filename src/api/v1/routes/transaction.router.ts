import { Router } from "express";

import transactionController from "../controllers/transaction.controller";
import { isUser, validateToken } from "../middleware/role.middleware";

const router = Router();

router.get("/:userId/history", validateToken, isUser, transactionController.getTransactionHistory);

router.post("/verify-payment", validateToken, isUser, transactionController.verifyPaymentController);

export default router;
