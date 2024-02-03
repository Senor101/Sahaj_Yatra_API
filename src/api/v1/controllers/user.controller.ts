import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            message: 'Users fetched succesfully',
            count: users.length,
            data: users
        });
    } catch (error) {
        next(error);
    }
};

const getUnverifiedUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const unverifiedUsers = await User.find({ isVerified: false });
        return res.status(200).json({
            message: 'Unverified Users fetched succesfully',
            count: unverifiedUsers.length,
            data: unverifiedUsers
        });
    } catch (error) {
        next(error);
    }
};

const getVerifiedUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const verifiedUsers = await User.find({ isVerified: true });
        return res.status(200).json({
            message: 'Verified Users fetched successfully',
            count: verifiedUsers.length,
            data: verifiedUsers
        });
    } catch (error) {
        next(error);
    }
};

export default { getAllUsers, getUnverifiedUsers, getVerifiedUsers };
