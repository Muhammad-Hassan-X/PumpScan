import { Router } from "express";
import { getAlerts } from "../controllers/index.js";


const router = Router();
router.get("/", getAlerts);
export default router;
