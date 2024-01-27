import { Request, Response, NextFunction } from "express";

import { IBus, Bus, BusOwner, DailyEarning } from "../models/bus.model";
import throwError from "../utils/throwError.util";

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
    const busBody: IBus = req.body;
  } catch (error) {
    next(error);
  }
};

const getBusLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const busID = req.params.busID;
    const requiredBus: IBus | null = await Bus.findById(busID);
    if (!requiredBus) {
      return throwError("BUS with given ID not found", 404);
    }
    return res.status(200).json({
      message: "Current Bus location fetched",
      data: requiredBus.currentLocation,
    });
  } catch (error) {
    next(error);
  }
};

const updateBusCurrentLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
  } catch (error) {
    next(error);
  }
};

export default {
  getBuses,
  registerBus,
  getBusLocation,
  updateBusCurrentLocation,
};
