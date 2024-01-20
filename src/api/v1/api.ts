import { Request, Response } from "express";
import { Router } from "express";

import authRouter from "./routes/auth.router";
import transactionRouter from "./routes/transaction.router";
import adminRouter from "./routes/admin.router";
import userRouter from "./routes/user.router";
import geoLocationRouter from "./routes/geolocation.router";

const router = Router();

router.get("/", (req: Request, res: Response): Response => {
  return res
    .status(200)
    .send("<h1 align='center'>Welcome to Sahaj Yatra API</h1>");
});

router.use("/user", userRouter);

router.use("/auth", authRouter);

router.use("/transaction", transactionRouter);

router.use("/admin", adminRouter);

router.use("/location", geoLocationRouter);

export default router;
