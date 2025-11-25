import { Router } from "express";
import { getProfile } from "../controllers/index.js";
const router = Router();
router.get("/:id", getProfile);
export default router;
