import { Router } from "express";

import busController from "../controllers/bus.controller";

const router = Router();

router.get("/", busController.getBuses);

router.get("/:busID/location", busController.getBusLocation);

router.post("/", busController.registerBus);


// update your bus location with request from nodemcu providing latitude and longitude in queries
router.get("/:busID", busController.updateBusCurrentLocation);

export default router;
