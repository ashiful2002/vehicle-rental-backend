import { NextFunction, Request, RequestHandler, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";
import { catchAsync } from "../../shared/catchAsync";
import status from "http-status";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.createUser(req.body);
  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await AuthService.loginUser(payload);

  res.cookie("access_token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User logged in successfull",
    data: result.user,
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  // const result = await AuthService.logoutUser();
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User log out successfully",
    data: null,
  });
});

export const AuthController = {
  createUser,
  loginUser,
  logoutUser,
};
