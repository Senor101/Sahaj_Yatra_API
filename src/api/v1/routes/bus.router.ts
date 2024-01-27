import { Router } from "express";

import busController from "../controllers/bus.controller";

const router = Router();

router.get("/", busController.getBuses);

router.post("/", busController.registerBus);

router.get("/:busID/location", busController.getBusLocation);

router.put("/:busID", busController.updateBusCurrentLocation);

export default router;
