import { Router } from "express";
import { deleteHistory, getHistory } from "../controllers/index.js";
const router = Router();
router.delete("/:id", deleteHistory);
router.get("/",getHistory );
export default router;
