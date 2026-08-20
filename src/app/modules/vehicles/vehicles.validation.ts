import Joi from "joi";

export const createVehicleJoiSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.min": "Vehicle name must be at least 2 characters",
    "string.max": "Vehicle name cannot exceed 100 characters",
    "any.required": "Vehicle name is required",
  }),

  plate_number: Joi.string().min(3).max(50).required().messages({
    "string.min": "Plate number is required",
    "string.max": "Plate number cannot exceed 20 characters",
    "any.required": "Plate number is required",
  }),

  category: Joi.string()
    .valid("sedan", "suv", "van", "truck")
    .required()
    .messages({
      "any.only": "Category must be sedan, suv, van, or truck",
      "any.required": "Category is required",
    }),

  daily_rate: Joi.number().positive().required().messages({
    "number.base": "Daily rate must be a number",
    "number.positive": "Daily rate must be greater than 0",
    "any.required": "Daily rate is required",
  }),

  photo_path: Joi.string().allow(null).optional(),
});


export const updateVehicleJoiSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional().messages({
    "string.min": "Vehicle name must be at least 2 characters",
    "string.max": "Vehicle name cannot exceed 100 characters",
  }),

  plate_number: Joi.string().min(3).max(20).optional().messages({
    "string.min": "Plate number must be at least 3 characters",
    "string.max": "Plate number cannot exceed 20 characters",
  }),

  category: Joi.string()
    .valid("sedan", "suv", "van", "truck")
    .optional()
    .messages({
      "any.only": "Category must be sedan, suv, van, or truck",
    }),

  daily_rate: Joi.number().positive().optional().messages({
    "number.base": "Daily rate must be a number",
    "number.positive": "Daily rate must be greater than 0",
  }),

  photo_path: Joi.string().allow(null, "").optional(),
}).min(1); // Ensures at least one field is provided for update






// import { z } from 'zod';

// export const createVehicleZodSchema = z.object({
//   name: z
//     .string()
//     .min(2, 'Vehicle name must be at least 2 characters')
//     .max(100, 'Vehicle name cannot exceed 100 characters'),

//   plate_number: z
//     .string()
//     .min(3, 'Plate number is required')
//     .max(20, 'Plate number cannot exceed 20 characters'),

//   category: z.enum(['sedan', 'suv', 'van', 'truck'], {
//     message: 'Category must be sedan, suv, van, or truck',
//   }),

//   daily_rate: z.coerce.number().positive('Daily rate must be greater than 0'),
//   photo_path: z.string().nullable().optional(),
// });

// export const updateVehicleZodSchema = createVehicleZodSchema.partial();
