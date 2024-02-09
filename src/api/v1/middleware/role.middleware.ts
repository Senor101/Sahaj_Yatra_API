import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import throwError from '../utils/throwError.util';

const checkRole = async (req: Request, res: Response, next: NextFunction, role: string) => {
    try {
        if (res.locals.user.role !== role) return throwError(req, res, 'Unauthorized', 401);
        return next();
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) return throwError(req, res, 'Missing auth header', 401);
        const token = authorization.split(' ')[1];
        if (!token) return throwError(req, res, 'Missing auth token, try logging in again', 401);
        if (!process.env.JWT_SECRET) return throwError(req, res, 'Server Error', 500);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return throwError(req, res, 'Invalid Token', 401);

        if (typeof decoded !== 'object') return throwError(req, res, 'Invalid Token', 401);

        if (!decoded.role || !decoded.id) return throwError(req, res, 'Invalid Token, Try loggin in again', 401);
        res.locals.user = decoded;

        return next();
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const isSuperAdmin = async (req: Request, res: Response, next: NextFunction) => checkRole(req, res, next, 'superAdmin');
const isBusOwner = async (req: Request, res: Response, next: NextFunction) => checkRole(req, res, next, 'busOwner');
const isUser = async (req: Request, res: Response, next: NextFunction) => checkRole(req, res, next, 'user');

export { isSuperAdmin, isBusOwner, isUser, validateToken };
