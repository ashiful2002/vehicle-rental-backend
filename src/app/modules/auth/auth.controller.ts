import { NextFunction, Request, RequestHandler, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse.ts";
import { catchAsync } from "../../shared/catchAsync";
import status from "http-status";
import AppError from "../../errorHelpers/AppError.ts";

const createUser = catchAsync(async (req: Request, res: Response) => {
  //   const result = await AuthService.createUser(req.body);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "User created successfully",
    data: "sadf",
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  //   const payload = req.body;
  //   const result = await AuthService.loginUser(payload);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User logged in successfull",
    data: "sadf",
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.body;
  //   console.log(token, "token from controller");

  //   const result = await AuthService.logoutUser(token);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User log out successfull",
    data: "result",
  });
});

export const AuthController = {
  createUser,
  loginUser,
  logoutUser,
};
