import cron from "node-cron";
import { supabase } from "../config/supabase.config.js";
import { getFullTokenInfo } from "./tokenInfo.service.js";
import {
  analyzeTokenSafety,
  mapTokenInfoToEntity,
} from "../utilities/index.js";

// Run every 10 minutes
export const startAlertsCron = () => {
  console.log("Starting alerts cron job...");
  cron.schedule("*/10 * * * *", async () => {
    try {
      console.log("Running alerts check...");

      // Get all unique tokens that people have in their wishlists
      const { data: wishlists, error: wishError } = await supabase
        .from("wishlist")
        .select("user_id, token_id, tokens!inner(address, price, risk_score)");

      if (wishError || !wishlists) {
        console.error("Cron Error fetching wishlists:", wishError);
        return;
      }

      // Group by token address to avoid duplicate fetches
      const uniqueTokens = new Map<string, any[]>();
      for (const item of wishlists) {
        const oldToken: any = Array.isArray(item.tokens)
          ? item.tokens[0]
          : item.tokens;
        const address = oldToken.address;
        if (!uniqueTokens.has(address)) {
          uniqueTokens.set(address, []);
        }
        uniqueTokens.get(address)?.push({ ...item, oldToken });
      }

      for (const [address, items] of uniqueTokens.entries()) {
        const tokenInfo = await getFullTokenInfo(address);
        if (!tokenInfo?.success || !tokenInfo.data) continue;

        const safetyReport = analyzeTokenSafety(tokenInfo.data);
        const newData = mapTokenInfoToEntity(
          tokenInfo.data,
          safetyReport,
        ) as any;

        // Compare with previous values
        const oldToken = items[0].oldToken; // Contains old price, risk_score
        const oldPrice = oldToken.price || 0;
        const newPrice = newData.price || 0;

        const oldScore = oldToken.risk_score || 0;
        const newScore = newData.risk_score || 0;

        const priceDiffPct =
          oldPrice === 0 ? 0 : ((newPrice - oldPrice) / oldPrice) * 100;
        const scoreDiff = newScore - oldScore;

        // Alerts generation
        let alertMessage = null;
        let alertType = null;

        if (Math.abs(priceDiffPct) >= 10) {
          alertType = priceDiffPct > 0 ? "PRICE_UP" : "PRICE_DOWN";
          alertMessage = `Token ${newData.symbol} moved ${priceDiffPct.toFixed(1)}% to $${newPrice}.`;
        } else if (Math.abs(scoreDiff) >= 15) {
          alertType = "RISK_CHANGED";
          alertMessage = `Token ${newData.symbol} risk score changed by ${scoreDiff}. New score: ${newScore}.`;
        }

        if (alertMessage) {
          // Update the actual token row so next cron matches the new price
          await supabase
            .from("tokens")
            .update({
              price: newPrice,
              price_change_24h: newData.price_change_24h,
              risk_score: newScore,
              risk_label: newData.risk_label,
            })
            .eq("address", address);

          // Notify all users who have this token in their wishlist
          const alertsToInsert = items.map((item) => ({
            user_id: item.user_id,
            token_id: item.token_id,
            alert_type: alertType,
            message: alertMessage,
            is_read: false,
          }));

          await supabase.from("alerts").insert(alertsToInsert);
          console.log(
            `Alerts generated for ${newData.symbol}: ${alertMessage}`,
          );
        }
      }
    } catch (error) {
      console.error("Alerts Cron Exception:", error);
    }
  });
};
