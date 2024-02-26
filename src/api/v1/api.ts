import { Request, Response } from "express";
import { Router } from "express";

//import routers here
import authRouter from "@routes/auth.router";
import transactionRouter from "@routes/transaction.router";
import userRouter from "@routes/user.router";
import busRouter from "@routes/bus.router";

const router = Router();

router.get("/", (req: Request, res: Response): Response => {
    return res.status(200).send("<h1 align='center'>Welcome to Sahaj Yatra API</h1>");
});

// use routers here
router.use("/user", userRouter);

router.use("/auth", authRouter);

router.use("/transaction", transactionRouter);

router.use("/bus", busRouter);

export default router;
