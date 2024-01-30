import { Request, Response, NextFunction } from 'express';

import { IBus, Bus, BusOwner, DailyEarning } from '../models/bus.model';
import throwError from '../utils/throwError.util';

const getBuses = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const busOwnerID = req.user;
    const busOwner = await BusOwner.findById(busOwnerID);
    if (!busOwner) {
      return throwError(req, res, 'Invalid Bus Owner', 404);
    }
    return res.status(200).json({
      message: 'Buses fetched Succesfully',
      data: busOwner?.buses,
    });
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
    const existingBus = await Bus.findOne({ busNumber: busBody.busNumber });
    if (existingBus) {
      return throwError(req, res, 'Bus with provided bus number exists.', 409);
    }
    const newBus = await Bus.create(busBody);
    return res.status(201).json({
      message: 'New Bus registered',
      data: newBus,
    });
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
      return throwError(req, res, 'BUS with given ID not found', 404);
    }
    return res.status(200).json({
      message: 'Current Bus location fetched',
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
    const busID = req.params.busID;
    const newLocation: { latitude: number; longitude: number } = req.body;
    const requiredBus = await Bus.findById(busID);
    if (!requiredBus) {
      return throwError(req, res, 'BUS with given ID not found', 404);
    }
    requiredBus.currentLocation = newLocation;
    await requiredBus.save();
    return res.status(200).json({
      message: 'Current Bus location updated.',
      data: requiredBus,
    });
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
