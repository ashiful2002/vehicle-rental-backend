import express from "express";
import { VehiclesController } from "./vehicles.controller";
import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middlewares/validateRequest";
import { createVehicleZodSchema } from "./vehicles.validation";

const router = express.Router();

router.post(
  "/",
  multerUpload.single("file"),
  validateRequest(createVehicleZodSchema),
  VehiclesController.createNewVehicle
);
router.get("/", VehiclesController.getAllVehicles);
router.get("/:id", VehiclesController.getVehicleById);
router.put("/:id", VehiclesController.updateVehicle);
router.delete("/:id", VehiclesController.deleteVehicle);

export const VehiclesRoutes = router;
