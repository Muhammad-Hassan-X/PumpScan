import { Request, Response, NextFunction } from "express";
import { supabase } from "../config/supabase.config.js";
import { StatusCodes } from "http-status-codes";

/**
 * Get profile data and include "Total Scans" from the history table
 */
export const getProfile = async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    return res.sendResponse(
      StatusCodes.BAD_REQUEST,
      false,
      "User ID is required",
      null,
      "User ID is required",
    );
  }

  // 1️⃣ Get profile basic info
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (profileError) {
    return res.sendResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      "Error getting profile",
      null,
      profileError,
    );
  }

  // 2️⃣ Get Total Scans count from history table
  const { count: scanCount, error: historyError } = await supabase
    .from("history")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  // 3️⃣ Get Watchlist count
  const { count: watchlistCount, error: watchlistError } = await supabase
      .from("wishlist")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

  return res.sendResponse(
    StatusCodes.OK,
    true,
    "Profile fetched successfully",
    {
        ...profileData,
        total_scans: scanCount || 0,
        watchlist_count: watchlistCount || 0
    },
    null,
  );
};

/**
 * Update user profile details
 */
export const updateProfile = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { full_name } = req.body;

    if (!userId) {
        return res.sendResponse(StatusCodes.BAD_REQUEST, false, "User ID is required", null, null);
    }

    const { data: updatedData, error: updateError } = await supabase
        .from("profiles")
        .update({ full_name, updated_at: new Date().toISOString() })
        .eq("id", userId)
        .select()
        .single();

    if (updateError) {
        return res.sendResponse(StatusCodes.INTERNAL_SERVER_ERROR, false, "Error updating profile", null, updateError);
    }

    return res.sendResponse(StatusCodes.OK, true, "Profile updated successfully", updatedData, null);
};
