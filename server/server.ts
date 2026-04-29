import "dotenv/config";
import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");
import { PORT } from "./config/env.config.js";

process.on("unhandledRejection", (reason, promise) => {
  console.error("🚨 Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("🚨 Uncaught Exception:", err);
});

import { StatusCodes } from "http-status-codes";
import express from "express";
import {
  responseHandler,
  apiLimiter,
  verifyAuth,
} from "./middlewares/index.js";
import cors from "cors";
import {
  authRoute,
  historyRoute,
  profileRoute,
  searchRoute,
  watchListRoute,
  alertsRoute,
} from "./routes/index.js";
import { startAlertsCron } from "./services/alerts.cron.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
app.use(responseHandler);
app.use(apiLimiter);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/profile", verifyAuth, profileRoute);
app.use("/api/v1/history", verifyAuth, historyRoute);
app.use("/api/v1/watch-list", verifyAuth, watchListRoute);

// Public token routes (trending, global)
// We'll pass the router and let it handle which sub-routes need auth internally or just define public ones here.
// For now, let's make searchRoute handle its own auth or split it.
app.use("/api/v1/tokens", searchRoute); 

app.use("/api/v1/alerts", verifyAuth, alertsRoute);


app.get("/Test-route", (req, res) => {
  return res.sendResponse(
    StatusCodes.OK,
    true,
    "Server is running....",
    null,
    null,
  );
});

app.listen(Number(PORT), "0.0.0.0", () => {
  startAlertsCron();
  console.log(`Server is running on port http://localhost:8080/api/v1`);
});
