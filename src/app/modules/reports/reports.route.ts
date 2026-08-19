import express from "express";
import ReportService from "./reports.service";
import ReportController from "./reports.controller";
import { db } from "../../config/database";

const router = express.Router();

const reportService = new ReportService(db);
const reportController = new ReportController(reportService);

router.get("/rentals", reportController.getRentalReport);

export const ReportRoutes = router;
 