import { Router } from "express";

import busController from "../controllers/bus.controller";

const router = Router();

router.get('/', busController.getAllBusesController);

router.post("/", busController.registerBus);

router.get("/:busID/location", busController.getBusLocation);

// update your bus location with request from nodemcu providing latitude and longitude in queries
router.get("/:busID/location", busController.updateBusCurrentLocation);

export default router;
