import { StatusCodes } from "http-status-codes";
import { supabase } from "../config/supabase.config.js";
export const searchToken = async (req, res) => {
    const { query } = req.params;
    const { data, error } = await supabase.from("tokens").select("*").eq("name", query).single();
    if (error) {
        return res.sendResponse(StatusCodes.INTERNAL_SERVER_ERROR, false, "Error searching token", null, error.message);
    }
    return res.sendResponse(StatusCodes.OK, true, "Token searched successfully", data, null);
};
