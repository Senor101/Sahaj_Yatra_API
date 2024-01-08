import { Request, Response, NextFunction } from "express";

const getTransactionHistory = (req: Request, res: Response, next: NextFunction) => {
    try{

    }catch(error){
        next(error);
    }
}

const verifyPayment = (Req: Request, res: Response, next: NextFunction) => {
    try{

    }catch(error){
        next(error);
    }
}

export default {getTransactionHistory, verifyPayment}