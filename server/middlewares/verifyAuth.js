import { supabase } from "../config/supabase.config.js";
import { StatusCodes } from "http-status-codes";
export const verifyAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.sendResponse(StatusCodes.UNAUTHORIZED, false, "Missing or invalid authorization header", null, "Unauthorized");
    }
    const token = authHeader.split(" ")[1];
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) {
        return res.sendResponse(StatusCodes.UNAUTHORIZED, false, "Invalid or expired token", null, "Unauthorized");
    }
    req.userId = data.user.id;
    next();
};
