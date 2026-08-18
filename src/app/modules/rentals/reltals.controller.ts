import { Request, Response } from "express";
import status from "http-status";

import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { RentalServices } from "./reltals.service";

const getAllRentals = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await RentalServices.getAllRentals({ query });

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Get all Rentals successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getRentalById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RentalServices.getRentalById(id as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Get Rental by id successfully",
    data: result,
  });
});

const createRental = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await RentalServices.createRental({ body });

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Rental created successfully",
    data: result,
  });
});

const updateRentals = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;

  const result = await RentalServices.updateRentals({
    id: id as string,
    body,
  });

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Vehicle updated successfully",
    data: result,
  });
});

const deleteRentals = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RentalServices.deleteRentals(id as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Vehicle deleted successfully",
    data: result,
  });
});

export const RentalsController = {
  getAllRentals,
  getRentalById,
  createRental,
  updateRentals,
  deleteRentals,
};
