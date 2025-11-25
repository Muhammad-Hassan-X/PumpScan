import { Router } from "express";
import { fetchAndAnalyzeToken } from "../controllers/index.js";
const router = Router();
router.get('/', fetchAndAnalyzeToken);
export default router;
