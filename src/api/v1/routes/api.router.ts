import { Request, Response } from "express";
import { Router } from "express";

const router = Router();

router.get("/",(req:Request,res:Response) : Response<any, Record<string, any>>=> {
    return res.status(200).send("<h1 align='center'>Welcome to HAMROBUS_API</h1>");
});

export default router;