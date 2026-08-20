import express from "express";
import { RentalsController } from "./reltals.controller";
import auth from "../../middlewares/auth";

const router = express.Router();
router.use(auth);


router.get("/", RentalsController.getAllRentals);
router.get("/:id", RentalsController.getRentalById);
router.post("/", RentalsController.createRental);
router.put("/:id", RentalsController.updateRentals);
router.delete("/:id", RentalsController.deleteRentals);

export const RentalRoutes = router;
