import { Request, Response } from "express";
import { Router } from "express";

import authRouter from "./routes/auth.router";

import transactionRouter from "./routes/transaction.router";

const router = Router();

router.get("/",(req:Request,res:Response) : Response=> {
    return res.status(200).send("<h1 align='center'>Welcome to HAMROBUS_API</h1>");
});

router.use('/auth',authRouter);

router.use('/transaction',transactionRouter);

export default router;