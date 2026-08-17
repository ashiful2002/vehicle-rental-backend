import {
  Vehicle,
  CreateVehicleInput,
  UpdateVehicleInput,
} from "./vehicles.interface";
const getAllVehicles = async ({
  query,
}: {
  query: Record<string, unknown>;
}) => {
  const result = await [
    {
      title: "Toyota premio ",
      desc: "Premio 2010 model G package",
    },
    query,
  ];

  return result;
};

const getVehicleById = async (id: string) => {
  const result = await [
    {
      title: "Toyota premio ",
      desc: "Premio 2010 model G package",
    },
    id,
  ];

  return result;
};
const createNewVehicles = async ({ body }: { body: CreateVehicleInput }) => {
  const result = await [
    {
      title: "Toyota premio ",
      desc: "Premio 2010 model G package",
    },
    body,
  ];

  return result;
};
const updateVehicle = async ({
  id,
  body,
}: {
  id: string;
  body: UpdateVehicleInput;
}) => {
  const result = await [
    {
      title: "Toyota premio ",
      desc: "Premio 2010 model G package",
    },
    id,
    body,
  ];

  return result;
};
const deleteVehicle = async (id: string) => {
  const result = await [id];

  return result;
};

export const VehiclesServices = {
  getAllVehicles,
  getVehicleById,
  createNewVehicles,
  updateVehicle,
  deleteVehicle,
};
