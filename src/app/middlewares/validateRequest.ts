import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import status from 'http-status';
import AppError from '../errorHelpers/AppError';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      // If data is sent as a stringified JSON inside req.body.data, parse it
      let payload = req.body;
      if (req.body && typeof req.body.data === 'string') {
        try {
          payload = JSON.parse(req.body.data);
        } catch {
          // fallback if parsing fails
        }
      }

      const validatedData = await schema.validateAsync(payload, {
        abortEarly: false,
        stripUnknown: true,
        convert: true,
      });

      req.body = validatedData;
      next();
    } catch (error: unknown) {
      const err = error as {
        details?: Array<{ message: string }>;
        message?: string;
      };
      const errorMessage = err.details
        ? err.details.map((d: { message: string }) => d.message).join(', ')
        : err.message || 'Validation failed';

      next(new AppError(status.BAD_REQUEST, errorMessage));
    }
  };
};
// import { NextFunction, Request, Response } from 'express';
// import z from 'zod';

// export const validateRequest = (zodSchema: z.ZodObject) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (req.body.data) {
//       req.body = JSON.parse(req.body.data);
//     }

//     const parsedResult = zodSchema.safeParse(req.body);

//     if (!parsedResult.success) {
//       return next(parsedResult.error);
//     }

//     req.body = parsedResult.data;

//     next();
//   };
// };
