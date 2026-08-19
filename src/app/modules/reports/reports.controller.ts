import { Request, Response } from 'express';
import ReportService from './reports.service';
import { catchAsync } from '../../shared/catchAsync';

class ReportController {
  private reportService: ReportService;

  constructor(reportService: ReportService) {
    this.reportService = reportService;
  }

  getRentalReport = catchAsync(async (req: Request, res: Response) => {
    const { month, vehicle_id } = req.query;

    const result = await this.reportService.getRentalReport(
      month as string,
      vehicle_id ? Number(vehicle_id) : undefined,
    );

    res.status(200).json({
      success: true,
      message: 'Rental report retrieved successfully',
      data: result,
    });
  });
}

export default ReportController;
