import express from "express";
import { VehiclesController } from "./vehicles.controller";
import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createVehicleJoiSchema,
  updateVehicleJoiSchema,
} from "./vehicles.validation";
import auth from "../../middlewares/auth";

const router = express.Router();
router.use(auth);

router.post(
  "/",
  multerUpload.single("file"),
  validateRequest(createVehicleJoiSchema),
  VehiclesController.createNewVehicle,
);
router.get("/", VehiclesController.getAllVehicles);
router.get("/:id", VehiclesController.getVehicleById);
router.put(
  "/:id",
  multerUpload.single("file"),
  validateRequest(updateVehicleJoiSchema),
  VehiclesController.updateVehicle,
);
router.delete("/:id", VehiclesController.deleteVehicle);

export const VehiclesRoutes = router;
