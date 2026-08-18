export interface VehicleReport {
  id: number;
  name: string;
  total_bookings: number;
  days_rented: number;
  revenue: number;
}
export interface RentalReportResult {
  month: string;
  vehicles: VehicleReport[];
  top_vehicle: VehicleReport | null;
}

export interface VehicleReport {
  id: number;
  name: string;
  total_bookings: number;
  days_rented: number;
  revenue: number;
}

export interface RentalReportResult {
  month: string;
  vehicles: VehicleReport[];
  top_vehicle: VehicleReport | null;
}
