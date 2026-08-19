import { z } from "zod";

export const createVehicleZodSchema = z.object({
  name: z
    .string()
    .min(2, "Vehicle name must be at least 2 characters")
    .max(100, "Vehicle name cannot exceed 100 characters"),

  plate_number: z
    .string()
    .min(3, "Plate number is required")
    .max(20, "Plate number cannot exceed 20 characters"),

  category: z.enum(["sedan", "suv", "van", "truck"], {
    message: "Category must be sedan, suv, van, or truck",
  }),

  daily_rate: z.coerce.number().positive("Daily rate must be greater than 0"),
  photo_path: z.string().nullable().optional(),
});

export const updateVehicleZodSchema = createVehicleZodSchema.partial();
