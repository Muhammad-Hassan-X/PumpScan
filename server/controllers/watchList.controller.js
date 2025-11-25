import { supabase } from "../config/supabase.config.js";
import { StatusCodes } from "http-status-codes";
export const getWatchList = async (req, res) => {
    const { user } = req.userId;
    if (!user) {
        return res.sendResponse(StatusCodes.UNAUTHORIZED, false, "User ID is required", null, "User ID is required");
    }
    const { data: watchListData, error: watchListError } = await supabase
        .from("wishlist")
        .select("*")
        .eq("user_id", user)
        .order("created_at", { ascending: false });
    if (watchListError) {
        return res.sendResponse(StatusCodes.INTERNAL_SERVER_ERROR, false, "Error getting watch list", null, watchListError);
    }
    return res.sendResponse(StatusCodes.OK, true, "Watch list fetched successfully", watchListData, null);
};
export const addWatchList = async (req, res) => {
    const { user } = req.userId;
    if (!user) {
        return res.sendResponse(StatusCodes.UNAUTHORIZED, false, "User ID is required", null, "User ID is required");
    }
    const { data: watchListData, error: watchListError } = await supabase
        .from("wishlist")
        .insert({ user_id: user, ...req.body });
    if (watchListError) {
        return res.sendResponse(StatusCodes.INTERNAL_SERVER_ERROR, false, "Error adding watch list", null, watchListError);
    }
    return res.sendResponse(StatusCodes.OK, true, "Watch list added successfully", watchListData, null);
};
export const deleteWatchList = async (req, res) => {
    const { user } = req.userId;
    if (!user) {
        return res.sendResponse(StatusCodes.UNAUTHORIZED, false, "User ID is required", null, "User ID is required");
    }
    const { data: watchListData, error: watchListError } = await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", user)
        .eq("id", req.params.id);
    if (watchListError) {
        return res.sendResponse(StatusCodes.INTERNAL_SERVER_ERROR, false, "Error deleting watch list", null, watchListError);
    }
    return res.sendResponse(StatusCodes.OK, true, "Watch list deleted successfully", watchListData, null);
};
