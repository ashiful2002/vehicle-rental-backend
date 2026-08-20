import { Request, Response } from 'express';
import status from 'http-status';

import { catchAsync } from '../../shared/catchAsync';
import { sendResponse } from '../../shared/sendResponse';
import { RentalService } from './reltals.service';

class rentalController {
  getAllRentals = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const result = await RentalService.getAllRentals({ query });

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: 'Get all Rentals successfully',
      meta: result.meta,
      data: result.data,
    });
  });

  getRentalById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await RentalService.getRentalById(id as string);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: 'Get Rental by id successfully',
      data: result,
    });
  });

  createRental = catchAsync(async (req: Request, res: Response) => {
    const body = req.body;
    const result = await RentalService.createRental({ body });

    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: 'Rental created successfully',
      data: result,
    });
  });

  updateRentals = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    const result = await RentalService.updateRentals({
      id: id as string,
      body,
    });

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: 'Vehicle updated successfully',
      data: result,
    });
  });

  deleteRentals = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await RentalService.deleteRentals(id as string);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: 'Vehicle deleted successfully',
      data: result,
    });
  });
}

export const RentalController = new rentalController();
