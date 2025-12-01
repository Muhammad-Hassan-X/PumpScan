import { StatusCodes } from "http-status-codes";
import { getFullTokenInfo } from "../services/index.js";
import { analyzeTokenSafety, mapTokenInfoToEntity } from "../utilities/index.js";
import { supabase } from "../config/supabase.config.js";


export const fetchAndAnalyzeToken = async (req, res) => {
    try {
        const query = req.query.q;
        // Validate query input
        if (!query || query.trim() === "") {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Token query (name, symbol, or address) is required.",
            });
        }
        // 1️⃣ Fetch full token information
        const tokenInfo = await getFullTokenInfo(query);
        if (!tokenInfo?.success || !tokenInfo.data) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: tokenInfo?.message || "Token not found",
            });
        }
        // 2️⃣ Analyze token safety
        const safetyReport = analyzeTokenSafety(tokenInfo.data);
        // sending data to the supabase 
        const row = mapTokenInfoToEntity(tokenInfo.data, safetyReport)
        const { data: token, error: tokenError } = await supabase
            .from("tokens")
            .upsert(row, { onConflict: "address" })
            .select()
            .single();

        

        const user_id = req.userId

        const { error: historyError } = await supabase.from("history").insert(
            {
                user_id,
                token_id: token.id,
                searched_at: new Date().toISOString()
            }
        )


        if (tokenError) console.error("Token error:", tokenError);
        if (historyError) console.error("History error:", historyError);

        // 3️⃣ Return clean, typed JSON response
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Data fetched successfully",
            data: {
                token: tokenInfo.data.token,
                coinGecko: tokenInfo.data.coinGecko,
                security: tokenInfo.data.security,
                safetyReport,
            },
        });
    }
    catch (error) {
        const err = error;
        console.error("🚨 fetchAndAnalyzeToken error:", err.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};
