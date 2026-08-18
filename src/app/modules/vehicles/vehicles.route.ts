import express from "express";
import { VehiclesController } from "./vehicles.controller";

const router = express.Router();

router.get("/", VehiclesController.getAllVehicles);
router.get("/:id", VehiclesController.getVehicleById);
router.post("/", VehiclesController.createNewVehicle);
router.put("/:id", VehiclesController.updateVehicle);
router.delete("/:id", VehiclesController.deleteVehicle);

export const VehiclesRoutes = router;
 