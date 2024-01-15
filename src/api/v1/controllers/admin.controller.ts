import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try{

    }catch(error){
        next(error);
    }
}

// const getUnverifiedUsers = async (Req: Request, res: Response, next: NextFunction) => {
//     try{
//     }catch(error){
//         next(error);
//     }
// }

export default {verifyUser}