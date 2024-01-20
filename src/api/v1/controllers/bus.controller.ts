import { Request, Response, NextFunction } from "express";

const getBuses = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
  } catch (error) {
    next(error);
  }
};

const registerBus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
  } catch (error) {
    next(error);
  }
};

export default { getBuses, registerBus };
