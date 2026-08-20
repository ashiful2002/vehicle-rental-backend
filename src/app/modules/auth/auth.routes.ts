import express from "express";
import { db } from "../../config/database";
import AuthService from "./auth.service";
import AuthController from "./auth.controller";
import { loginJoiSchema, registerJoiSchema } from "./auth.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";

const router = express.Router();

const authService = new AuthService(db);
const authController = new AuthController(authService);

router.post(
  "/register",
  validateRequest(registerJoiSchema),
  authController.createUser,
);
router.post(
  "/login",
  validateRequest(loginJoiSchema),
  authController.loginUser,
);
router.post("/logout", authController.logoutUser);

export const AuthRoutes = router;
