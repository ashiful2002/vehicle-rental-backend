import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import status from "http-status";

import AppError from "../../errorHelpers/AppError.ts";
import { db } from "../../config/database.ts";

import {
  ILoginUserPayload,
  IRegisterPayload,
  Staff,
} from "./auth.interface.ts";

const JWT_SECRET = process.env.JWT_SECRET || "jwt-secret-key";
const JWT_EXPIRES_IN = "1d";

const createUser = async (payload: IRegisterPayload) => {
  const { name, email, password } = payload;
  const existingUser = await db("staff").where({ email }).first();

  if (existingUser) {
    throw new AppError(status.CONFLICT, "User already in database");
  }

  const password_hash = await bcrypt.hash(password, 10);

  const [newStaff] = await db("staff")
    .insert({
      name,
      email,
      password_hash,
    })
    .returning(["id", "name", "email", "created_at", "updated_at"]);

  return newStaff;
};

const loginUser = async (payload: ILoginUserPayload) => {
  const { email, password } = payload;

  const user = await db("staff").where({ email }).first();

  if (!user) {
    throw new AppError(status.UNAUTHORIZED, "Invalid email and password");
  }
  const isPassValid = await bcrypt.compare(password, user.password_hash);

  if (!isPassValid) {
    throw new AppError(status.UNAUTHORIZED, "Invalid email and password");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );

  const { password_hash: _passwardHash, ...safeUser } = user;

  return {
    user: safeUser,
    token,
  };
};

const logoutUser = async (token: string) => {
  if (!token) {
    throw new AppError(status.BAD_REQUEST, "Token is required");
  }
};

export const AuthService = {
  createUser,
  loginUser,
  logoutUser,
};
