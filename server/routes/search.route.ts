import { Router } from "express";
import { fetchAndAnalyzeToken } from "../controllers/index.js";
import { getTopTokens, getGlobalData } from "../services/tokenInfo.service.js";
import { verifyAuth } from "../middlewares/index.js";

const router = Router();

// Public route (data fetching)
// Authentication is handled inside the controller to optionally save history
router.get('/', fetchAndAnalyzeToken);

// Public routes (trending, global)
router.get('/trending', async (req, res) => {
    const result = await getTopTokens();

    if (!result.success) {
        return res.sendResponse(500, false, result.message || "Failed to fetch trending tokens", null, result.message);
    }

    return res.sendResponse(200, true, "Trending tokens fetched successfully", result.data, null);
});

router.get('/global', async (req, res) => {
    const result = await getGlobalData();

    if (!result.success) {
        return res.sendResponse(500, false, result.message || "Failed to fetch global data", null, result.message);
    }

    return res.sendResponse(200, true, "Global data fetched successfully", result.data, null);
});

export default router;


