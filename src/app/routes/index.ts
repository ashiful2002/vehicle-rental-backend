import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { VehiclesRoutes } from "../modules/vehicles/vehicles.route";
import { RentalRoutes } from "../modules/rentals/reltals.route";

const router = Router();

const routerManager = [
  { path: "/auth", route: AuthRoutes },
  { path: "/vehicles", route: VehiclesRoutes },
  { path: "/rentals", route: RentalRoutes },
];

routerManager.forEach((r) => router.use(r.path, r.route));
export default router;
