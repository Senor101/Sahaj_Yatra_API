import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import throwError from '../utils/throwError.util';
import bcrypt from 'bcrypt'

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

const getIndividualUserController = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const userID = req.params.id;
        const requiredUser = await User.findById(userID);
        if(!requiredUser) return throwError(req, res, "User not found.", 404);
        return res.status(200).json({
            message: 'User fetched Succesfully',
            data:requiredUser
        })
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


// // initial request when a user enters a bus and scans rfid tag
// const checkValidity = async(req:Request, res:Response, next: NextFunction) : Promise<Response | void> => {
//     try{
//         const {rfid, latitude, longitude} = req.query;
//         // check if rfid is valid and has minimum balance
//         return res.status(200).json({
//             valid:true,
//         })
//     }catch(error){
//         next(error)
//     }
// }

//verify and assign rfid tag to requesting user
const verifyUserController = async (req: Request, res: Response, next:NextFunction) : Promise<Response | void> => {
    try{

    }catch(error){
        next(error)
    }
}

// when the user leaves the bus, scan rfid tag
const deductBusFareController = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { rfid, latitude, longitude } = req.query;
        // calculate distance base fare from current and last geo location
        //deduct amount
        return res.status(200).json({
            message: ''
        });
    } catch (error) {
        next(error);
    }
};

const updateUserDetailController = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const {username, email, phoneNumber, password} = req.body;
        const userId = req.params.id;
        const requiredUser = await User.findById(userId);
        if(!requiredUser) return throwError(req, res, "User not found", 404);
        requiredUser.username = username ? username: requiredUser.username;
        requiredUser.email = email ? email: requiredUser.email;
        requiredUser.phoneNumber = phoneNumber ? phoneNumber :requiredUser.phoneNumber;
        if(password){
            const hashedPassword = await bcrypt.hash(password, 10);
            requiredUser.password = hashedPassword
        }
        await requiredUser.save();
        return res.status(200).json({
            message: "User details updated Successfully",
            data:requiredUser
        })
    } catch (error) {
        next(error);
    }
};


export default { getAllUsers, 
    getUnverifiedUsers, 
    getVerifiedUsers, 
    deductBusFareController,
    verifyUserController,
    getIndividualUserController,
    updateUserDetailController
};
