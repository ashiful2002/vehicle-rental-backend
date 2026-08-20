import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { Request, Response } from "express";
import { VehiclesServices } from "./vehicles.service";

class VehiclesControllerClass {
  createNewVehicle = catchAsync(async (req: Request, res: Response) => {
    const payload = {
      ...req.body,
      photo_path: req.file?.path,
    };

    const result = await VehiclesServices.createNewVehicles(payload);

    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "Vehicle created successfully",
      data: result,
    });
  });

  getAllVehicles = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const result = await VehiclesServices.getAllVehicles({ query });

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Get all vehicles successfully",
      meta: result.meta,
      data: result.data,
    });
  });

  getVehicleById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await VehiclesServices.getVehicleById(id as string);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Get vehicle by id successfully",
      data: result,
    });
  });

  updateVehicle = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    const result = await VehiclesServices.updateVehicle({
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

  deleteVehicle = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await VehiclesServices.deleteVehicle(id as string);

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Vehicle deleted successfully",
      data: result,
    });
  });
}

export const VehiclesController = new VehiclesControllerClass();