import {
  Vehicle,
  CreateVehicleInput,
  UpdateVehicleInput,
  VehicleCategory,
} from "./vehicles.interface";
import { db } from "../../config/database.ts";
import AppError from "../../errorHelpers/AppError.ts";
import status from "http-status";

const getAllVehicles = async ({
  query, 
}: {
  query: Record<string, unknown>;
}) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const offset = (page - 1) * limit;

  const search = query.search as string | undefined;
  const category = query.category as VehicleCategory | undefined;

  const baseQuery = db("vehicles").whereNull("deleted_at");

  if (search) {
    baseQuery.whereILike("name", `%${search}%`);
  }
  if (category) {
    baseQuery.where("category", category);
  }
  // Total number of matching vehicles
  const [{ count }] = await baseQuery.clone().count("* as count");

  // Paginated vehicles
  const vehicles = await baseQuery
    .clone()
    .select("*")
    .limit(limit)
    .offset(offset)
    .orderBy("created_at", "desc");

  return {
    meta: {
      page,
      limit,
      total: Number(count),
      totalPages: Math.ceil(Number(count) / limit),
    },
    data: vehicles,
  };
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
