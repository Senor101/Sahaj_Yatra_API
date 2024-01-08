import { Router } from "express";

import transactionController from "../controllers/transaction.controller";

const router = Router();

router.get("/",transactionController.getTransactionHistory)

router.post("/verify-payment", transactionController.verifyPayment)

export default router;