import { Request, Response } from "express";
import status from "http-status";
import AuthService from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";
import { catchAsync } from "../../shared/catchAsync";

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  // arrow function class fields keep `this` bound correctly
  // when Express calls these as plain callbacks
  
  createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await this.authService.createUser(req.body);
    sendResponse(res, {
      httpStatusCode: status.CREATED,
      success: true,
      message: "User created successfully",
      data: result,
    });
  });

  loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await this.authService.loginUser(req.body);

    res.cookie("access_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "User logged in successfully",
      data: result.user,
    });
  });

  logoutUser = catchAsync(async (_req: Request, res: Response) => {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "User logged out successfully",
      data: null,
    });
  });
}

export default AuthController;