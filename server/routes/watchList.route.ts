import { Router } from "express";
import { getWatchList, addWatchList, deleteWatchList } from "../controllers/index.js";
const router = Router();
router.get("/", getWatchList);
router.post("/", addWatchList);
router.delete("/", deleteWatchList);

export default router;
