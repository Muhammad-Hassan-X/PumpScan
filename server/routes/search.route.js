import { Router } from "express";
import { fetchAndAnalyzeToken } from "../middlewares/index.js";
const router = Router();
router.get('/', fetchAndAnalyzeToken);
export default router;
