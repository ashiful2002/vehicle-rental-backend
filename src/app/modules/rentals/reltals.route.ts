import express from "express";
import auth from "../../middlewares/auth";
import { RentalController } from "./reltals.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createRentalValidationSchema,
  updateRentalValidationSchema,
} from "./rentals.validation";

const router = express.Router();
router.use(auth);

router.post(
  "/",
  validateRequest(createRentalValidationSchema),
  RentalController.createRental,
);
router.get("/", RentalController.getAllRentals);
router.get("/:id", RentalController.getRentalById);
router.put(
  "/:id",
  validateRequest(updateRentalValidationSchema),
  RentalController.updateRentals,
);
router.delete("/:id", RentalController.deleteRentals);

export const RentalRoutes = router;
