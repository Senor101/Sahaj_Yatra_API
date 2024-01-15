import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const users = await User.find();
        return res.status(200).json({
            message: "Users fetched succesfully",
            count : users.length,
            data : users
        })
    }catch(error){
        next(error);
    }
}

const getUnverifiedUsers = async (Req: Request, res: Response, next: NextFunction) => {
    try{
        const unverifiedUsers = await User.find({isVerified: false});
        const unverifiedUsersCount = unverifiedUsers.length;
        return res.status(200).json({
            message: "Unverified Users fetched succesfully",
            count : unverifiedUsersCount,
            data : unverifiedUsers
        })
    }catch(error){
        next(error);
    }
}

export default {getAllUsers, getUnverifiedUsers}