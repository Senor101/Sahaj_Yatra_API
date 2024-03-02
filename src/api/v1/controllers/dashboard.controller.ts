import { Request, Response, NextFunction } from "express";
import { BusOwner, Bus } from "../models/bus.model";
import throwError from "../utils/throwError.util";

export const getBusownerDashboardController = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const busOwnerId = res.locals.user.id;
    const busOwner = await BusOwner.findById(busOwnerId);
    if(!busOwner) return throwError(req, res, "Invalid Bus Owner", 404);

    const dashboardData = {
      totalDailySale: 100,
      totalYearlySale: 100,
      totalMonthlySale: 100,
      graphData: {
        daily: {
          bus1: 100,
          bus2: 200
        },
        monthly: {
          bus1: 100,
          bus2: 200
        },
        yearly: {
          bus1: 100,
          bus2: 200
        }
      }
    }

    const todayDate = new Date();
    const day = todayDate.getDate();
    const month = todayDate.getMonth();
    const year = todayDate.getFullYear();
    console.log(day, month, year)

    const buses = await Bus.find({busOwner: busOwnerId}).lean();
    const dailySale = buses.map(bus => {
      let sale = 0;
      // bus.sale.map(s => )
    })



    console.log(buses)



    return res.status(200).json({
      message: "Bus Owner dashboard",
      data: dashboardData
    })
  }catch(error){
    console.error(error)
    next(error)
  }
}


export default {
  getBusownerDashboardController
}