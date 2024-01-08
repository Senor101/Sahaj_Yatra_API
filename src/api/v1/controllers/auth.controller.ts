import { Request, Response, NextFunction } from "express";

const loginUser = (req: Request, res: Response, next: NextFunction) => {
    try{

    }catch(error){
        next(error);
    }
}

const registerUser = (Req: Request, res: Response, next: NextFunction) => {
    try{

    }catch(error){
        next(error);
    }
}

export default {loginUser, registerUser}