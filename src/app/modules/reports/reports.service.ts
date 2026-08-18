import { Knex } from "knex";
import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { RentalReportResult, VehicleReport } from "./reports.interface";

class ReportService {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  private validateMonth(month: string): void {
    if (!month || !/^\d{4}-\d{2}$/.test(month)) {
      throw new AppError(status.BAD_REQUEST, "month must be in YYYY-MM format");
    }
  }

  private getMonthBoundaries(month: string): {
    monthStart: string;
    monthEnd: string;
  } {
    const monthStart = `${month}-01`;
    const [year, m] = month.split("-").map(Number);
    // day 0 of next month = last day of this month
    const monthEnd = new Date(year, m, 0).toISOString().slice(0, 10);
    return { monthStart, monthEnd };
  }

  async getRentalReport(
    month: string,
    vehicleId?: number
  ): Promise<RentalReportResult> {
    this.validateMonth(month);
    const { monthStart, monthEnd } = this.getMonthBoundaries(month);

    let vehicleFilter = "";
    // bindings order MUST match the order "?" appears in the SQL below
    const bindings: (string | number)[] = [
      monthEnd,
      monthStart,
      monthEnd,
      monthStart,
      monthEnd,
      monthStart,
    ];

    if (vehicleId) {
      vehicleFilter = "AND r.vehicle_id = ?";
      bindings.push(vehicleId);
    }

    const sql = `
      SELECT
        v.id AS id,
        v.name AS name,
        COUNT(r.id)::int AS total_bookings,
        SUM(LEAST(r.end_date, ?::date) - GREATEST(r.start_date, ?::date) + 1)::int AS days_rented,
        SUM((LEAST(r.end_date, ?::date) - GREATEST(r.start_date, ?::date) + 1) * v.daily_rate)::numeric AS revenue
      FROM rentals r
      JOIN vehicles v ON v.id = r.vehicle_id
      WHERE r.start_date <= ?::date
        AND r.end_date >= ?::date
        AND r.status != 'cancelled'
        ${vehicleFilter}
      GROUP BY v.id, v.name
      ORDER BY revenue DESC
    `;

    const result = await this.db.raw(sql, bindings);

    const vehicles: VehicleReport[] = result.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      total_bookings: row.total_bookings,
      days_rented: row.days_rented,
      revenue: Number(row.revenue),
    }));

    // already sorted by revenue DESC, so first row is the top vehicle
    const topVehicle = vehicles.length > 0 ? vehicles[0] : null;

    return { month, vehicles, top_vehicle: topVehicle };
  }
}

export default ReportService;
