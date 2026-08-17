import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth = (...roles: any[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.method === "OPTIONS") {
        return next();
      }
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access. Token not found",
        });
      }

      const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

      const decoded = jwt.verify(token, "sadf") as JwtPayload;

      const userData = await {
        email: decoded.email,
        role: decoded.role,
      };

      if (!userData) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You are not authorized",
        });
      }

      req.user = {
        id: userData.id,
        email: userData.email,
        role: userData.role,
      };
      next();
    } catch (error) {
      next(error);
    }
  };
};
export default auth;
