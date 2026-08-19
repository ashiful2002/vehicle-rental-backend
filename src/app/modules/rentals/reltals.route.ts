import express from 'express';
import { RentalsController } from './reltals.controller';

const router = express.Router();

router.get('/', RentalsController.getAllRentals);
router.get('/:id', RentalsController.getRentalById);
router.post('/', RentalsController.createRental);
router.put('/:id', RentalsController.updateRentals);
router.delete('/:id', RentalsController.deleteRentals);

export const RentalRoutes = router;
