import { Request, Response, NextFunction } from 'express'

import { IBus, Bus, BusOwner } from '../models/bus.model'
import throwError from '../utils/throwError.util'

const getBusesForIndividualBusOwnerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const busOwnerID = res.locals.user.id
    const busOwner = await BusOwner.findById(busOwnerID).lean()
    if (!busOwner) {
      return throwError(req, res, 'Invalid Bus Owner', 404)
    }
    const buses = await Bus.find({ busOwner: busOwnerID }).lean()
    return res.status(200).json({
      message: 'Buses fetched Succesfully',
      data: buses,
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const getIndividualBusController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const busId = req.params.busId
    const requiredBus = await Bus.findById(busId).lean()
    if (!requiredBus) return throwError(req, res, 'Bus not found', 404)
    return res.status(200).json({
      message: 'Bus fetched successfully',
      data: requiredBus,
    })
  } catch (error) {
    next(error)
  }
}

const getAllBusesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const buses = await Bus.find().lean()
    return res.status(200).json({
      message: 'Buses fetched',
      count: buses.length,
      data: buses,
    })
  } catch (error) {
    next(error)
  }
}

const registerBus = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const busBody: IBus = req.body
    const busOwnerId = res.locals.user.id
    const existingBus = await Bus.findOne({
      busNumber: busBody.busNumber,
    }).lean()
    if (existingBus) {
      return throwError(req, res, 'Bus with provided bus number exists.', 409)
    }
    const newBus = await Bus.create({ ...busBody, busOwner: busOwnerId })
    const owner = await BusOwner.findById(busOwnerId)
    owner?.buses?.push(newBus)
    await owner?.save()
    return res.status(201).json({
      message: 'New Bus registered',
      data: newBus,
    })
  } catch (error) {
    next(error)
  }
}

const getBusLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const busId = req.params.busId
    const requiredBus: IBus | null = await Bus.findById(busId).lean()
    if (!requiredBus) {
      return throwError(req, res, 'BUS with given ID not found', 404)
    }
    return res.status(200).json({
      message: 'Current Bus location fetched',
      data: requiredBus.currentLocation,
    })
  } catch (error) {
    next(error)
  }
}

const updateBusCurrentLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    let { busId, latitude, longitude } = req.query
    if (!busId) return throwError(req, res, 'Bus ID is required!', 400)
    const requiredBus = await Bus.findById(busId)
    if (!latitude || !longitude)
      return throwError(req, res, 'Latitude and Longitude are required!', 400)
    if (!requiredBus) {
      return throwError(req, res, 'BUS with given ID not found', 404)
    }
    const parsedLatitude: number = +latitude
    const parsedLongitude: number = +longitude
    const newLocation = {
      latitude: parsedLatitude,
      longitude: parsedLongitude,
    }
    requiredBus.currentLocation = newLocation
    await requiredBus.save()
    return res.status(200).json({
      message: 'Current Bus location updated.',
      data: requiredBus,
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export default {
  getBusesForIndividualBusOwnerController,
  getIndividualBusController,
  registerBus,
  getBusLocation,
  updateBusCurrentLocation,
  getAllBusesController,
}
