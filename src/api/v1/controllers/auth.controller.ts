import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.model';
import { userExists } from '../utils/userExists.util';
import { IUser } from '../models/user.model';
import throwError from '../utils/throwError.util';
import { BusOwner, IBusOwner } from '../models/bus.model';

const userLogin = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { phoneNumber, password }: { phoneNumber: string; password: string } = req.body;
        const user = await User.findOne({ phoneNumber: phoneNumber });
        if (!user) {
            return throwError(req, res, 'Invalid Credentials', 404);
        }
        if (!user.password) {
            return res.status(400).json({
                message: 'Password is required'
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user?.password);
        if (!isPasswordValid) {
            return throwError(req, res, 'Invalid Credentials', 400);
        }
        const token = jwt.sign({ id: user?._id, role: 'user' }, process.env.JWT_SECRET || '', {
            expiresIn: '1d'
        });
        return res.status(200).json({
            message: 'User Login Successful',
            token: token,
            role: 'user'
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const userRegister = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const userBody: IUser = req.body;
        if (!userBody.password) {
            return throwError(req, res, 'Password is required', 400);
        }
        const existingUser = await User.findOne({ citizenshipNumber: userBody.citizenshipNumber });
        if (existingUser) {
            return throwError(req, res, 'User already registered', 409);
        }
        const hashedPassword = await bcrypt.hash(userBody.password, 12);
        const newUser = await User.create({
            ...userBody,
            password: hashedPassword
        });
        newUser.password = '';
        return res.status(201).json({
            message: 'User Created',
            data: newUser
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const busOwnerLogin = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { phoneNumber, password }: { phoneNumber: string | number; password: string } = req.body;
        const existingBusOwner = await BusOwner.findOne({
            phoneNumber: phoneNumber
        });
        if (!existingBusOwner) {
            return throwError(req, res, 'Invalid Credentials', 404);
        }
        const isPasswordValid = await bcrypt.compare(password, existingBusOwner?.password || '');
        if (!isPasswordValid) {
            return throwError(req, res, 'Invalid Credentials', 403);
        }
        const token = jwt.sign(
            {
                role: 'busOwner',
                id: existingBusOwner?._id
            },
            process.env.JWT_SECRET || '',
            { expiresIn: '1d' }
        );
        return res.status(200).json({
            message: 'Admin Login Successful',
            token: token,
            role: 'busOwner'
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const busOwnerRegister = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const busOwnerBody: IBusOwner = req.body;
        const existingBusOwner = await BusOwner.findOne({
            $or: [{ phoneNumber: busOwnerBody.phoneNumber }, { email: busOwnerBody.email }]
        });
        if (!busOwnerBody.password) {
            return throwError(req, res, 'Password is required', 400);
        }
        if (existingBusOwner) {
            return throwError(req, res, 'Bus Owner already exists', 409);
        }
        const hashedPassword = await bcrypt.hash(busOwnerBody.password, 12);
        const newBusOwner = await BusOwner.create({
            ...busOwnerBody,
            password: hashedPassword
        });
        newBusOwner.password = '';
        res.status(201).json({
            message: 'New Bus Owner registered successfully.',
            data: newBusOwner
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const superAdminLogin = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { email, password }: { email: string; password: string } = req.body;
        if (!email || !password) {
            return throwError(req, res, 'Email and Password are required', 400);
        }
        if (email !== process.env.SUPER_ADMIN_EMAIL) {
            return throwError(req, res, 'Invalid Credentials', 403);
        }
        const isPasswordValid = await bcrypt.compare(password, process.env.SUPER_ADMIN_PASSWORD as string);
        if (!isPasswordValid) {
            return throwError(req, res, 'Invalid Credentials', 403);
        }
        const token = jwt.sign(
            {
                email: email,
                role: 'superAdmin'
            },
            process.env.JWT_SECRET || '',
            { expiresIn: '1d' }
        );
        res.status(200).json({
            message: 'Super Admin Login Successful',
            token: token,
            role: 'superAdmin'
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export default { userLogin, userRegister, busOwnerLogin, busOwnerRegister };
