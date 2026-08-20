import express from 'express';
import auth from '../../middlewares/auth';
import { RentalController } from './reltals.controller';

const router = express.Router();
router.use(auth);

router.get('/', RentalController.getAllRentals);
router.get('/:id', RentalController.getRentalById);
router.post('/', RentalController.createRental);
router.put('/:id', RentalController.updateRentals);
router.delete('/:id', RentalController.deleteRentals);

export const RentalRoutes = router;
