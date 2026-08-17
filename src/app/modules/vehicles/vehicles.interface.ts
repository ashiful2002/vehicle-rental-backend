export type VehicleCategory = "sedan" | "suv" | "van" | "truck";
export interface Vehicle {
  id: number;
  name: string;
  plate_number: string;
  category: VehicleCategory;
  daily_rate: number; // decimal - represented as number in TS; use string if you need precise decimal handling (e.g. via a decimal library)
  photo_path: string | null;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateVehicleInput {
  name: string;
  plate_number: string;
  category: string;
  daily_rate: number;
  photo_path?: string;
}

export interface UpdateVehicleInput {
  name?: string;
  plate_number?: string;
  category?: string;
  daily_rate?: number;
  photo_path?: string;
}
