
export function mapTokenInfoToEntity(tokenInfo, safetyReport) {
    // Ensure tokenInfo and safetyReport exist
    if (!tokenInfo || !tokenInfo.token || !tokenInfo.coinGecko) {
        throw new Error("Invalid tokenInfo object");
    }

    const token = tokenInfo.token;
    const cg = tokenInfo.coinGecko;

    return {
        name: token.name || "Unknown Token",
        symbol: token.symbol || "N/A",
        address: token.address || `unknown_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`, 
        image: tokenInfo.coinGecko?.image || null,
        market_cap: token.marketCapUsd ?? 0,
        liquidity: token.liquidityUsd ?? 0,
        price: Number(token.priceUsd) || 0,
        price_change_24h: token.priceChange24h ?? null,
        risk_score: safetyReport?.score ?? 0,
        risk_label: safetyReport?.label || "Unknown",
        risk_reasons: safetyReport?.report || {},
    };
}
