import express, { Application, Request, Response } from "express";
import cors from "cors";

import { notFound } from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
 

app.use("/api/v1/payments/webhook", express.raw({ type: "application/json" }));
app.use(express.json());

// application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("MMDB movie rateing platform");
});

app.use(notFound);

export default app;
