import { Request, Response } from "express";
import { supabase } from "../config/supabase.config.js";
import { StatusCodes } from "http-status-codes";

export const getAlerts = async (req: Request, res: Response) => {
  const user = req.userId;
  if (!user)
    return res.sendResponse(StatusCodes.UNAUTHORIZED, false, "Unauthorized");

  const { data, error } = await supabase
    .from("alerts")
    .select("*")
    .eq("user_id", user)
    .order("created_at", { ascending: false });

  if (error) {
    return res.sendResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      "Error fetching alerts",
      null,
      error,
    );
  }
  return res.sendResponse(StatusCodes.OK, true, "Fetched successful", data);
};
