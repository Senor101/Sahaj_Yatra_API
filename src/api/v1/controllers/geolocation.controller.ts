import { Request, Response, NextFunction } from "express";

const geoLocationController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
  } catch (error) {
    next(error);
  }
};

export default { geoLocationController };
