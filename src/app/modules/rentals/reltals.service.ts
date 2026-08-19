import { db } from '../../config/database';
import AppError from '../../errorHelpers/AppError';
import status from 'http-status';
import { CreateRentalInput, UpdateRentalInput } from './rentals.interface';

const getAllRentals = async ({ query }: { query: Record<string, unknown> }) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const offset = (page - 1) * limit;

  const vehicleId = query.vehicle_id ? Number(query.vehicle_id) : undefined;

  const status = query.status as string | undefined;

  const startDate = query.start_date as string;
  const endDate = query.end_date as string;
  const search = query.search as string | undefined;

  const baseQuery = db('rentals');

  // filters
  if (vehicleId) {
    baseQuery.where('vehicle_id', vehicleId);
  }
  // status filter
  if (status) {
    baseQuery.where('status', status);
  }

  // date range
  if (startDate && endDate) {
    baseQuery
      .where('start_date', '<=', endDate)
      .where('end_date', '>=', startDate);
  } else if (startDate) {
    baseQuery.where('end_date', '>=', startDate);
  } else if (endDate) {
    baseQuery.where('start_date', '<=', endDate);
  }
  // search by name and phone number
  if (search) {
    baseQuery.where((builder) => {
      builder.whereILike('customer_name', `%${search}%`);
      builder.orWhereILike('customer_phone', `%${search}%`);
    });
  }
  const [{ count }] = await baseQuery.clone().clearSelect().count('* as count');

  const rentals = await baseQuery
    .clone()
    .select('*')
    .orderBy('created_at', 'desc')
    .limit(limit)
    .offset(offset);

  return {
    meta: {
      page,
      limit,
      total: Number(count),
      totalPages: Math.ceil(Number(count) / limit),
    },
    data: rentals,
  };
};

const getRentalById = async (id: string) => {
  const result = await db('rentals')
    .where({
      id: id,
    })
    // .whereNull("deleted_at")
    .first();

  return result;
};
const createRental = async ({ body }: { body: CreateRentalInput }) => {
  const { vehicle_id, customer_name, customer_phone, start_date, end_date } =
    body;
  // date check
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  if (startDate > endDate) {
    throw new AppError(status.BAD_REQUEST, 'End Date Must be after start date');
  }

  // if vehicle exists
  const vehicle = await db('vehicles')
    .where({
      id: vehicle_id,
    })
    .whereNull('deleted_at')
    .first();

  if (!vehicle) {
    throw new AppError(status.NOT_FOUND, 'Vehicle not found');
  }
  // free rental check
  const existingRental = await db('rentals')
    .where('vehicle_id', vehicle_id)
    .whereIn('status', ['booked', 'ongoing'])
    .where('start_date', '<=', end_date)
    .where('end_date', '>=', start_date)
    .first();

  if (existingRental) {
    throw new AppError(
      status.CONFLICT,
      'Vehicle is already rented for the selected dates',
    );
  }

  // calculation
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  const rentalDays =
    Math.floor((endDate.getTime() - startDate.getTime()) / millisecondsPerDay) +
    1;

  // total amount

  const totalAmount = Number(vehicle.daily_rate) * rentalDays;
  // create new rentals
  const [newRental] = await db('rentals')
    .insert({
      vehicle_id,
      customer_name,
      customer_phone,
      start_date,
      end_date,
      total_amount: totalAmount,
      status: 'booked',
    })
    .returning('*');
  return newRental;
};

// update rentals
const updateRentals = async ({
  id,
  body,
}: {
  id: string;
  body: UpdateRentalInput;
}) => {
  const rentalId = Number(id);
  console.log(id, 'raw id', rentalId, 'RentalId');

  const existingRental = await db('rentals').where({ id: rentalId }).first();

  if (!existingRental) {
    throw new AppError(status.NOT_FOUND, 'Rental not found');
  }

  const vehicleId = body.vehicle_id ?? existingRental.vehicle_id;
  const startDate = body.start_date ?? existingRental.start_date;
  const endDate = body.end_date ?? existingRental.end_date;

  // 3. Validate dates
  if (new Date(startDate) > new Date(endDate)) {
    throw new AppError(
      status.BAD_REQUEST,
      'Start date cannot be after end date',
    );
  }

  // 4. Check rental overlap
  const overlappingRental = await db('rentals')
    .where('vehicle_id', vehicleId)
    .where('id', '!=', rentalId)
    .whereIn('status', ['booked', 'ongoing'])
    .where('start_date', '<=', endDate)
    .where('end_date', '>=', startDate)
    .first();

  if (overlappingRental) {
    throw new AppError(
      status.CONFLICT,
      'Vehicle is already rented during this period',
    );
  }
  const [rentalUpdate] = await db('rentals')
    .where({
      id: Number(id),
    })
    // .whereNull("deleted_at")
    .update({
      ...body,
      updated_at: new Date(),
    })
    .returning([
      'id',
      'vehicle_id',
      'customer_name',
      'customer_phone',
      'start_date',
      'end_date',
      'total_amount',
      'status',
      'created_at',
      'updated_at',
    ]);
  if (!rentalUpdate) {
    throw new AppError(status.NOT_FOUND, 'Rental update failed');
  }
  return rentalUpdate;
};
// delete rentals
const deleteRentals = async (id: string) => {
  const [deleteRental] = await db('rentals')
    .where({ id: Number(id) })
    .del()
    .returning([
      'id',
      'vehicle_id',
      'customer_name',
      'customer_phone',
      'start_date',
      'end_date',
      'total_amount',
      'status',
      'created_at',
      'updated_at',
    ]);

  if (!deleteRental) {
    throw new AppError(status.NOT_FOUND, 'Failed to delete rental');
  }
  return deleteRental;
};

export const RentalServices = {
  getAllRentals,
  getRentalById,
  createRental,
  updateRentals,
  deleteRentals,
};
