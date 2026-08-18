export type RentalStatus = "booked" | "ongoing" | "completed" | "cancelled";

export interface Rental {
  id: number;
  vehicle_id: number;
  customer_name: string;
  customer_phone: string;
  start_date: Date;
  end_date: Date;
  total_amount: number;
  status: RentalStatus;
  created_at: Date;
  updated_at: Date;
}

// export interface CreateRentalInput {
//   vehicle_id: number;
//   customer_name: string;
//   customer_phone: string;
//   start_date: Date;
//   end_date: Date;
//   total_amount: number;
//   status?: RentalStatus;
// }
export interface CreateRentalInput {
  vehicle_id: number;
  customer_name: string;
  customer_phone: string;
  start_date: string;
  end_date: string;
}
export interface UpdateRentalInput {
  customer_name?: string;
  customer_phone?: string;
  vehicle_id?: string;
  start_date?: Date;
  end_date?: Date;
  total_amount?: number;
  status?: RentalStatus;
}
