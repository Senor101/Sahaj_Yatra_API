import { Router } from "express";

import transactionController from "../controllers/transaction.controller";

const router = Router();

router.get("/:userId/history", transactionController.getTransactionHistory);

router.post("/verify-payment", transactionController.verifyPaymentController);

export default router;
