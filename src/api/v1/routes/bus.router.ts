import { Router } from "express";

import busController from "../controllers/bus.controller";
import { isBusOwner, validateToken } from "../middleware/role.middleware";

const router = Router();

router.get("/", busController.getAllBusesController);

router.post("/", validateToken, isBusOwner, busController.registerBus);

// update your bus location with request from nodemcu providing latitude and longitude in queries
router.get("/location", busController.updateBusCurrentLocation);

router.get("/:busId", busController.getIndividualBusController);

router.get("/:busId/location", busController.getBusLocation);

export default router;
