import { Router } from "express";
import { getWatchList, addWatchList, deleteWatchList } from "../controllers/index.js";
const router = Router();
router.get("/:id", getWatchList);
router.post("/:id", addWatchList);
router.delete("/:id", deleteWatchList);
export default router;
