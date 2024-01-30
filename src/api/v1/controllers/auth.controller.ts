import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.model';
import { userExists } from '../utils/userExists.util';
import { IUser } from '../models/user.model';
import throwError from '../utils/throwError.util';
import { BusOwner, IBusOwner } from '../models/bus.model';

const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { phoneNumber, password }: { phoneNumber: string; password: string } =
      req.body;
    if (!(await userExists(phoneNumber))) {
      return throwError(req, res, 'Invalid Credentials', 404);
    }
    const user = await User.findOne({ phoneNumber: phoneNumber });
    // if(!user?.password){
    //     return res.status(400).json({
    //         message: "Password is required"
    //     })
    // }
    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || ''
    );
    if (!isPasswordValid) {
      return throwError(req, res, 'Invalid Credentials', 400);
    }
    const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET || '', {
      expiresIn: '1d',
    });
    return res.status(200).json({
      message: 'User Login Successful',
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const userBody: IUser = req.body;
    if (await userExists(userBody.phoneNumber)) {
      return throwError(req, res, 'User already exists', 409);
    }
    if (!userBody.password) {
      return throwError(req, res, 'Password is required', 400);
    }
    const hashedPassword = await bcrypt.hash(userBody.password, 12);
    const newUser = await User.create({
      ...userBody,
      password: hashedPassword,
    });
    newUser.password = undefined;
    return res.status(201).json({
      message: 'User Created',
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const busOwnerLogin = async (
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
      return throwError(req, res, 'Invalid Credentials', 404);
    }
    const admin = await User.findOne({ phoneNumber: phoneNumber });
    const isPasswordValid = await bcrypt.compare(
      password,
      admin?.password || ''
    );
    if (!isPasswordValid) {
      return throwError(req, res, 'Invalid Credentials', 403);
    }
    const token = jwt.sign(
      {
        admin: true,
        id: admin?._id,
      },
      process.env.JWT_SECRET || '',
      { expiresIn: '1d' }
    );
    return res.status(200).json({
      message: 'Admin Login Successful',
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

const busOwnerRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const busOwnerBody: IBusOwner = req.body;
    const existingBusOwner = await BusOwner.findOne({
      $or: [
        { phoneNumber: busOwnerBody.phoneNumber },
        { email: busOwnerBody.email },
      ],
    });
    console.log('ok');
    if (!busOwnerBody.password) {
      return throwError(req, res, 'Password is required', 400);
    }
    if (existingBusOwner) {
      return throwError(req, res, 'Bus Owner already exists', 409);
    }
    const hashedPassword = await bcrypt.hash(busOwnerBody.password, 12);
    const newBusOwner = await BusOwner.create({
      ...busOwnerBody,
      password: hashedPassword,
    });
    newBusOwner.password = '';
    res.status(201).json({
      message: 'New Bus Owner registered successfully.',
      data: newBusOwner,
    });
  } catch (error) {
    next(error);
  }
};

export default { userLogin, userRegister, busOwnerLogin, busOwnerRegister };
