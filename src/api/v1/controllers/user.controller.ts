import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import throwError from "../utils/throwError.util";
import bcrypt from "bcrypt";

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find().select("-password").lean();
        return res.status(200).json({
            message: "Users fetched succesfully",
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
        const requiredUser = await User.findById(userID).select("-password").lean();
        if (!requiredUser) return throwError(req, res, "User not found.", 404);
        return res.status(200).json({
            message: "User fetched Succesfully",
            data: requiredUser
        });
    } catch (error) {
        next(error);
    }
};

const getUnverifiedUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const unverifiedUsers = await User.find({ isVerified: false }).select("-password").lean();
        return res.status(200).json({
            message: "Unverified Users fetched succesfully",
            count: unverifiedUsers.length,
            data: unverifiedUsers
        });
    } catch (error) {
        next(error);
    }
};

const getVerifiedUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const verifiedUsers = await User.find({ isVerified: true }).select("-password").lean();
        return res.status(200).json({
            message: "Verified Users fetched successfully",
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
const verifyUserController = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const userId = req.params.id;
        const { rfidNumber } = req.body;
        if (!rfidNumber) return throwError(req, res, "RFID tag number is required", 400);

        const existingUser = await User.findById(userId).select("-password").lean();

        if (!existingUser) return throwError(req, res, "User not fond", 404);
        if (existingUser.isVerified) return throwError(req, res, "User already Verified", 400);

        existingUser.rfidNumber = rfidNumber;
        existingUser.isVerified = true;
        await existingUser.save();
        return res.status(200).json({
            message: "RFID assigned to user",
            data: existingUser
        });
    } catch (error) {
        next(error);
    }
};

// when the user leaves the bus, scan rfid tag
const deductBusFareController = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { rfid, latitude, longitude } = req.query;
        // calculate distance base fare from current and last geo location
        //deduct amount

        // minimum amount to get ride service
        const minimumAmount = 50;

        if (!rfid) return throwError(req, res, "RFID tag required in query", 400);
        if (!latitude || !longitude) return throwError(req, res, "Latitude and Longitude are required!", 400);
        const existingUser = await User.findOne({ rfidNumber: rfid });
        if (!existingUser) return throwError(req, res, "Invalid RFID TAG", 404);

        const parsedLatitude: number = +latitude;
        const parsedLongitude: number = +longitude;

        const onBoardStatus = existingUser.onBoard;

        let requiredResponse: { valid: boolean; message: string; newAmount: number } = { valid: false, message: "", newAmount: 0 };
        if (!onBoardStatus) {
            // User is getting inside the bus
            if (existingUser.amount >= minimumAmount) {
                requiredResponse.message = "Valid User";
                requiredResponse.valid = true;
                requiredResponse.newAmount = existingUser.amount;
            } else {
                return res.status(400).json({
                    message: "Not enough balance",
                    valid: false
                });
            }
            existingUser.location.lastLatitude = parsedLatitude;
            existingUser.location.lastLongitude = parsedLongitude;
            existingUser.onBoard = true;
        } else {
            // User is getting out of the bus.
            existingUser.location.currentLatitude = parsedLatitude;
            existingUser.location.currentLongitude = parsedLongitude;
            existingUser.onBoard = false;
            // TODO: calculate fare based on difference in latitude and longitude
            const totalDistance = getDistanceFromLatLonInKm(
                existingUser.location.lastLatitude,
                existingUser.location.lastLongitude,
                existingUser.location.currentLatitude,
                existingUser.location.currentLongitude
            );
            let calculatedFare: number = 10 * totalDistance;
            existingUser.amount -= calculatedFare;
            requiredResponse.message = "Get out of the bus";
            requiredResponse.valid = true;
            requiredResponse.newAmount = existingUser.amount;
        }
        await existingUser.save();
        return res.status(200).json(requiredResponse);
    } catch (error) {
        next(error);
    }
};

const updateUserDetailController = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { username, email, phoneNumber, password } = req.body;
        const userId = req.params.id;
        const requiredUser = await User.findById(userId);
        if (!requiredUser) return throwError(req, res, "User not found", 404);
        requiredUser.username = username ? username : requiredUser.username;
        requiredUser.email = email ? email : requiredUser.email;
        requiredUser.phoneNumber = phoneNumber ? phoneNumber : requiredUser.phoneNumber;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            requiredUser.password = hashedPassword;
        }
        await requiredUser.save();
        return res.status(200).json({
            message: "User details updated Successfully",
            data: requiredUser
        });
    } catch (error) {
        next(error);
    }
};

export default {
    getAllUsers,
    getUnverifiedUsers,
    getVerifiedUsers,
    deductBusFareController,
    verifyUserController,
    getIndividualUserController,
    updateUserDetailController
};
