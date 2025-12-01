import 'dotenv/config';
import { PORT } from "./config/env.config.js";
import { StatusCodes } from "http-status-codes";
import express from "express";
import { responseHandler, apiLimiter, verifyAuth } from "./middlewares/index.js";
import cors from "cors";
import { authRoute, historyRoute, profileRoute, searchRoute, watchListRoute, } from "./routes/index.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(responseHandler);
app.use(apiLimiter);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/profile", verifyAuth, profileRoute);
app.use("/api/v1/history", verifyAuth, historyRoute);
app.use("/api/v1/watch-list", verifyAuth, watchListRoute);
app.use("/api/v1/tokens",verifyAuth,  searchRoute);
app.get("/Test-route", (req, res) => {
    return res.sendResponse(StatusCodes.OK, true, "Server is running....", null, null);
});
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:8080/api/v1`);
});
