import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError.ts";
import status from "http-status";
// import { jwtUtils } from "../../utils/jwt";
// import { tokenUtils } from "../../utils/token";

interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface ILoginUserPayload {
  email: string;
  password: string;
}
const createUser = async (payload: IRegisterPayload) => {};

const loginUser = async (payload: ILoginUserPayload) => {};

const logoutUser = async (token: string) => {};

export const AuthService = {
  createUser,
  loginUser,
  logoutUser,
};
