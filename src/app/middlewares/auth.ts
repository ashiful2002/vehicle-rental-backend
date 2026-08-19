import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized access. Token not found",
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
