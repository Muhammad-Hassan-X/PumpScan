
export function mapTokenInfoToEntity(tokenInfo, safetyReport) {
    // Ensure tokenInfo and safetyReport exist
    if (!tokenInfo || !tokenInfo.token || !tokenInfo.coinGecko) {
        throw new Error("Invalid tokenInfo object");
    }

    const token = tokenInfo.token;
    const cg = tokenInfo.coinGecko;

    return {
        // NOT NULL columns — provide defaults if missing
        name: token.name || "Unknown Token",
        symbol: token.symbol || "N/A",
        
        address: token.address || null, // optional in table

        // numeric fields — fallback to 0 if missing
        market_cap: token.marketCapUsd ?? 0,
        liquidity: token.liquidityUsd ?? 0,
        price: Number(token.priceUsd) || 0,
        volume_24h: token.volume24h ?? 0,
        price_change_24h: null, // keep null if API doesn't provide

        // risk data
        risk_score: safetyReport?.score ?? 0,
        risk_level: safetyReport?.label || "Unknown",

        // arrays — default empty
        listed_exchanges: cg.exchanges?.map(e => e.exchange) || [],
        websites: cg.websites || [],
        socialLinks: cg.socials ? Object.values(cg.socials).filter(Boolean) : [],
    };
}
