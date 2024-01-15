import { Request, Response, NextFunction } from "express";

const getTransactionHistory =async (req: Request, res: Response, next: NextFunction) => {
    try{

    }catch(error){
        next(error);
    }
}

const verifyPayment = async (Req: Request, res: Response, next: NextFunction) => {
    try{

    }catch(error){
        next(error);
    }
}

export default {getTransactionHistory, verifyPayment}