import { Request, Response, NextFunction } from "express";  
import bcrypt from "bcrypt";

import User from "../models/user.model"
import { userExists } from "../utils/userExists.util";
import {IUser} from "../models/user.model"

const loginUser = async (req: Request, res: Response, next: NextFunction) : Promise<Response | void>  => {
    try{
        const {email, password} : {email:string, password:string}= req.body;
        if(!await userExists(email)){
            throw new Error("User does not exist");
        }
        return res.status(200).json({
            message: "User Login Successful",
            data:'addEventListener'
        });
    }catch(error){
        next(error);
    }
}

const registerUser = async (req: Request, res: Response, next: NextFunction) : Promise<Response | void> => {
    try{
        const {username,email,phoneNumber,citizenshipNumber,password} : IUser = req.body;
        if(await userExists(email)){
            throw Error("User already exists");
        }
        if(!password){
            return res.status(400).json({
                message: "Password is required"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userBody = {
            username,
            email,
            phoneNumber,
            citizenshipNumber,
            password: hashedPassword,
        }
        const newUser = await User.create(userBody);
        newUser.password = undefined;
        return res.status(201).json({
            message: "User Created",
            data: newUser
        })
    }catch(error){
        next(error);
    }
}

const adminLogin = async (req: Request, res: Response, next: NextFunction) : Promise<Response | void> => {
    try{
        const userBody = req.body;
        return res.status(200).json({
            message: "Admin Login Successful",
            data: userBody
        })
    }catch(error){
        next(error);
    }
}


export default {loginUser, registerUser,adminLogin}
