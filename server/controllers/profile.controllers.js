import { supabase } from "../config/supabase.config.js";
import { StatusCodes } from "http-status-codes";
export const getProfile = async (req, res) => {
    req.userId = req.params.id;
    if (!req.params.id) {
        return res.sendResponse(StatusCodes.UNAUTHORIZED, false, "User ID is required", null, "User ID is required");
    }
    const { data: profileData, error: profileError } = await supabase.from("profiles").select("*").eq("id", req.params.id).single();
    if (profileError) {
        return res.sendResponse(StatusCodes.INTERNAL_SERVER_ERROR, false, "Error getting profile", null, profileError);
    }
    return res.sendResponse(StatusCodes.OK, true, "Profile fetched successfully", profileData, null);
};
