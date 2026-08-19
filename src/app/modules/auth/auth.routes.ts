import express from 'express';
import { db } from '../../config/database';
import AuthService from './auth.service';
import AuthController from './auth.controller';

const router = express.Router();

// composition root: create instances and wire them here
const authService = new AuthService(db);
const authController = new AuthController(authService);

router.post('/register', authController.createUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);

export const AuthRoutes = router;
