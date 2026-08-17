import express from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth.ts";
 
const router = express.Router();

router.post("/login", AuthController.loginUser);
router.post("/register", AuthController.createUser);



export const AuthRoutes = router;
