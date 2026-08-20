import Joi from "joi";

export const createRentalValidationSchema = Joi.object({
  vehicle_id: Joi.number().integer().positive().required().messages({
    "number.base": "Vehicle ID must be a number",
    "number.integer": "Vehicle ID must be an integer",
    "number.positive": "Vehicle ID must be a positive number",
    "any.required": "Vehicle ID is required",
  }),

  customer_name: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Customer name is required",
    "string.min": "Customer name must be at least 2 characters",
    "string.max": "Customer name cannot exceed 100 characters",
    "any.required": "Customer name is required",
  }),

  customer_phone: Joi.string()
    .trim()
    .pattern(/^(?:\+?88)?01[3-9]\d{8}$/)
    .required()
    .messages({
      "string.empty": "Customer phone is required",
      "string.pattern.base": "Please provide a valid Bangladeshi phone number",
      "any.required": "Customer phone is required",
    }),

  start_date: Joi.date().iso().required().messages({
    "date.base": "Start date must be a valid date",
    "date.format": "Start date must be in ISO format",
    "any.required": "Start date is required",
  }),

  end_date: Joi.date().iso().min(Joi.ref("start_date")).required().messages({
    "date.base": "End date must be a valid date",
    "date.format": "End date must be in ISO format",
    "date.min": "End date must be after or equal to start date",
    "any.required": "End date is required",
  }),
});

export const updateRentalValidationSchema = Joi.object({
  vehicle_id: Joi.number().integer().positive().messages({
    "number.base": "Vehicle ID must be a number",
    "number.integer": "Vehicle ID must be an integer",
    "number.positive": "Vehicle ID must be a positive number",
  }),

  customer_name: Joi.string().trim().min(2).max(100).messages({
    "string.min": "Customer name must be at least 2 characters",
    "string.max": "Customer name cannot exceed 100 characters",
  }),

  customer_phone: Joi.string()
    .trim()
    .pattern(/^(?:\+?88)?01[3-9]\d{8}$/)
    .messages({
      "string.pattern.base": "Please provide a valid Bangladeshi phone number",
    }),

  start_date: Joi.date().iso().messages({
    "date.base": "Start date must be a valid date",
    "date.format": "Start date must be in ISO format",
  }),

  end_date: Joi.date().iso().messages({
    "date.base": "End date must be a valid date",
    "date.format": "End date must be in ISO format",
  }),

  status: Joi.string()
    .valid("booked", "ongoing", "completed", "cancelled")
    .messages({
      "any.only":
        "Status must be one of: booked, ongoing, completed, cancelled",
    }),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required for update",
  });
