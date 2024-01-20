import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model";
import { userExists } from "../utils/userExists.util";
import { IUser } from "../models/user.model";
import throwError from "../utils/throwError.util";

const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { phoneNumber, password }: { phoneNumber: string; password: string } =
      req.body;
    if (!(await userExists(phoneNumber))) {
      return throwError("Invalid Credentials", 404);
    }
    const user = await User.findOne({ phoneNumber: phoneNumber });
    // if(!user?.password){
    //     return res.status(400).json({
    //         message: "Password is required"
    //     })
    // }
    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!isPasswordValid) {
      return throwError("Invalid Credentials", 400);
    }
    const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET || "", {
      expiresIn: "1d",
    });
    return res.status(200).json({
      message: "User Login Successful",
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { username, email, phoneNumber, citizenshipNumber, password }: IUser =
      req.body;
    if (await userExists(phoneNumber)) {
      return throwError("User already exists", 409);
    }
    if (!password) {
      return throwError("Password is required", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userBody = {
      username,
      email,
      phoneNumber,
      citizenshipNumber,
      password: hashedPassword,
    };
    const newUser = await User.create(userBody);
    newUser.password = undefined;
    return res.status(201).json({
      message: "User Created",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const adminLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const {
      phoneNumber,
      password,
    }: { phoneNumber: string | number; password: string } = req.body;
    if (!(await userExists(phoneNumber))) {
      return throwError("Invalid Credentials", 404);
    }
    const admin = await User.findOne({ phoneNumber: phoneNumber });
    const token = jwt.sign(
      {
        admin: true,
        id: admin?._id,
      },
      process.env.JWT_SECRET || "",
      { expiresIn: "1d" }
    );
    return res.status(200).json({
      message: "Admin Login Successful",
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

const adminRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { phoneNumber, password, email, citizenshipNumber } = req.body;
  } catch (error) {
    next(error);
  }
};

export default { loginUser, registerUser, adminLogin, adminRegister };
