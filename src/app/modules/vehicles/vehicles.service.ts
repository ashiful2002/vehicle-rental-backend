import {
  Vehicle,
  CreateVehicleInput,
  UpdateVehicleInput,
} from "./vehicles.interface";
import { db } from "../../config/database.ts";
import AppError from "../../errorHelpers/AppError.ts";
import status from "http-status";

const getAllVehicles = async ({
  query,
}: {
  query: Record<string, unknown>;
}) => {
  const result = await db("vehicles").whereNull("deleted_at").select("*");

  return result;
};

const getVehicleById = async (id: string) => {
  const result = await db("vehicles")
    .where({
      id: Number(id),
    })
    .whereNull("deleted_at")
    .first();

  return result;
};
const createNewVehicles = async ({ body }: { body: CreateVehicleInput }) => {
  const [newVehicle] = await db("vehicles")
    .insert({
      name: body.name,
      plate_number: body.plate_number,
      category: body.category,
      daily_rate: body.daily_rate,
      photo_path: body.photo_path ?? null,
    })
    .returning([
      "id",
      "name",
      "plate_number",
      "category",
      "daily_rate",
      "photo_path",
      "deleted_at",
      "updated_at",
    ]);
  return newVehicle;
};

const updateVehicle = async ({
  id,
  body,
}: {
  id: string;
  body: UpdateVehicleInput;
}) => {
  const [updatedVehicle] = await db("vehicles")
    .where({
      id: Number(id),
    })
    .whereNull("deleted_at")
    .update({
      ...body,
      updated_at: new Date(),
    })
    .returning([
      "id",
      "name",
      "plate_number",
      "category",
      "daily_rate",
      "photo_path",
      "deleted_at",
      "created_at",
      "updated_at",
    ]);
  if (!updatedVehicle) {
    throw new AppError(status.NOT_FOUND, "Vehicle not found");
  }
  return updatedVehicle;
};
const deleteVehicle = async (id: string) => {
  const [] = await db("vehicles")
    .where({ id: Number(id) })
    .whereNull("deleted_at")
    .update({
      deleted_at: new Date(),
      updated_at: new Date(),
    })
    .returning([
      "id",
      "name",
      "plate_number",
      "category",
      "daily_rate",
      "photo_path",
      "deleted_at",
      "created_at",
      "updated_at",
    ]);

  if (!deleteVehicle) {
    throw new AppError(status.NOT_FOUND, "Vehicle not found");
  }
  return deleteVehicle;
};

export const VehiclesServices = {
  getAllVehicles,
  getVehicleById,
  createNewVehicles,
  updateVehicle,
  deleteVehicle,
};
