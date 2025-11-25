import { Router } from "express";
import { deleteHistory } from "../controllers/index.js";
const router = Router();
router.delete("/:id", deleteHistory);
export default router;
