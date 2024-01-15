import { Request, Response, NextFunction } from "express";

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    try{

    }catch(error){
        next(error);
    }
}

const getUnverifiedUsers = (Req: Request, res: Response, next: NextFunction) => {
    try{

    }catch(error){
        next(error);
    }
}

export default {getAllUsers, getUnverifiedUsers}