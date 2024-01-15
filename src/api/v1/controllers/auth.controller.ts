import { Request, Response, NextFunction } from "express";  
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import User from "../models/user.model"
import { userExists } from "../utils/userExists.util";
import {IUser} from "../models/user.model"

const loginUser = async (req: Request, res: Response, next: NextFunction) : Promise<Response | void>  => {
    try{
        const {phoneNumber, password} : {phoneNumber:string, password:string}= req.body;
        if(!await userExists(phoneNumber)){
            throw new Error("Invalid Credentials");
        }
        const user = await User.findOne({phoneNumber:phoneNumber})
        // if(!user?.password){
        //     return res.status(400).json({
        //         message: "Password is required"
        //     })
        // }
        const isPasswordValid = await bcrypt.compare(password, user?.password || "");
        if(!isPasswordValid){
            throw new Error("Invalid Credentials");
        }
        const token = jwt.sign({id: user?._id}, process.env.JWT_SECRET || "", {expiresIn: "1d"});
        return res.status(200).json({
            message: "User Login Successful",
            token: token,
        });
    }catch(error){
        next(error);
    }
}

const registerUser = async (req: Request, res: Response, next: NextFunction) : Promise<Response | void> => {
    try{
        const {username,email,phoneNumber,citizenshipNumber,password} : IUser = req.body;
        if(await userExists(phoneNumber)){
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
