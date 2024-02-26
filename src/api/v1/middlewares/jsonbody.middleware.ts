import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const checkValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation Error",
            errors: errors.array().map((error) => {
                return { msg: error.msg };
            })
        });
    }
    next();
};

export default checkValidation;
