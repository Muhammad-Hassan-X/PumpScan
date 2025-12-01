import { supabase } from "../config/supabase.config.js";
import { StatusCodes } from "http-status-codes";
export const deleteHistory = async (req, res) => {
    const { user } = req.userId;
    if (!user) {
        return res.sendResponse(StatusCodes.UNAUTHORIZED, false, "User ID is required", null, "User ID is required");
    }
    const { data: historyData, error: errorDeleteHistory } = await supabase
        .from("history")
        .delete()
        .eq("user_id", user)
        .eq("id", req.params.id);
    if (errorDeleteHistory) {
        return res.sendResponse(StatusCodes.INTERNAL_SERVER_ERROR, false, "Error deleting history", null, errorDeleteHistory);
    }
    return res.sendResponse(StatusCodes.OK, true, "History deleted successfully", historyData, null);
};

export const getHistory = async (req, res) => {
  const user_id = req.userId;
  console.log(user_id);
  
  console.log("Logged in userId:", req.userId);

  const { data, error } = await supabase
  .from("history")
  .select(`
    *,
    token:token_id (*)
  `)
  .eq("user_id", user_id)
  .order("searched_at", { ascending: false });
 // latest first

  if (error) {
    console.error("History fetch error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch history",
      error,
    });
  }

  return res.json({
    success: true,
    data,
  });
};
