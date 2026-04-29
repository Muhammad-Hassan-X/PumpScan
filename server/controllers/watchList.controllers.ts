import { Request, Response, NextFunction } from "express";
import { supabase } from "../config/supabase.config.js";
import { StatusCodes } from "http-status-codes";

export const getWatchList = async (req: Request, res: Response) => {
    const user = req.userId;
    if (!user) {
        return res.sendResponse(StatusCodes.UNAUTHORIZED, false, "User ID is required", null, "User ID is required");
    }

    // ⭐ Joined with tokens table to get real Name, Symbol, and Image
    const { data: watchListData, error: watchListError } = await supabase
        .from("wishlist")
        .select(`
            *,
            tokens (
                name,
                symbol,
                image,
                risk_score,
                risk_label
            )
        `)
        .eq("user_id", user)
        .order("created_at", { ascending: false });

    if (watchListError) {
        return res.sendResponse(StatusCodes.INTERNAL_SERVER_ERROR, false, "Error getting watch list", null, watchListError);
    }
    return res.sendResponse(StatusCodes.OK, true, "Watch list fetched successfully", watchListData, null);
};

export const addWatchList = async (req: Request, res: Response) => {
    const user = req.userId;
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

export const deleteWatchList = async (req: Request, res: Response) => {
    const user = req.userId;
    const { id, address } = req.query; 

    if (!user) {
        return res.sendResponse(StatusCodes.UNAUTHORIZED, false, "User ID is required", null, "User ID is required");
    }

    let query = supabase.from("wishlist").delete().eq("user_id", user);

    if (id) {
        query = query.eq("id", id);
    } else if (address) {
        query = query.eq("token_address", address);
    } else {
        return res.sendResponse(StatusCodes.BAD_REQUEST, false, "ID or Address is required", null, null);
    }

    const { error: watchListError } = await query;
    
    if (watchListError) {
        return res.sendResponse(StatusCodes.INTERNAL_SERVER_ERROR, false, "Error deleting watch list", null, watchListError);
    }
    return res.sendResponse(StatusCodes.OK, true, "Watch list updated successfully", null, null);
};
