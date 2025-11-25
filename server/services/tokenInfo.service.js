import axios from "axios";
// @ts-ignore
import { GoPlus, ErrorCode } from "@goplus/sdk-node";
/**
 * Get full token information combining:
 *  - DexScreener (pair, price, liquidity)
 *  - CoinGecko (socials, exchange listings)
 *  - GoPlus (security, honeypot, etc.)
 */
export const getFullTokenInfo = async (query) => {
    try {
        // 1️⃣ DEXSCREENER — get token + chain + liquidity
        let tokenAddress = null;
        let chainId = null;
        let tokenName = "";
        let tokenSymbol = "";
        let pair = null;
        try {
            const dexUrl = `https://api.dexscreener.com/latest/dex/search/?q=${query}`;
            const { data: dexData } = await axios.get(dexUrl);
            if (dexData?.pairs?.length) {
                const preferredExchanges = [
                    "uniswap",
                    "pancakeswap",
                    "sushiswap",
                    "okx",
                    "kucoin",
                    "gate.io",
                    "mexc",
                ];
                pair =
                    dexData.pairs.find((p) => preferredExchanges.some((ex) => p.dexId?.toLowerCase().includes(ex))) || dexData.pairs[0];
                tokenAddress = pair?.baseToken?.address || null;
                chainId = pair?.chainId || null;
                tokenName = pair?.baseToken?.name || query;
                tokenSymbol = pair?.baseToken?.symbol || query.toUpperCase();
            }
        }
        catch (dexErr) {
            console.warn("DexScreener fetch failed:", dexErr);
        }
        // 2️⃣ COINGECKO — get ID, socials, exchange listings, MARKET CAP
        let coinGeckoId = "";
        let exchangeListings = [];
        let websites = [];
        let socials = {};
        let marketCapUsd = null; // ⭐ ADDED
        try {
            const cgSearch = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);
            if (cgSearch.data?.coins?.length > 0) {
                const firstCoin = cgSearch.data.coins[0];
                coinGeckoId = firstCoin.id;
                tokenName ||= firstCoin.name;
                tokenSymbol ||= firstCoin.symbol.toUpperCase();
                // Exchange listings
                const tickersRes = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinGeckoId}/tickers`);
                const tickers = tickersRes.data?.tickers || [];
                const targetExchanges = ["Binance", "OKX", "KuCoin", "Gate.io", "MEXC"];
                exchangeListings = tickers
                    .filter((t) => targetExchanges.includes(t.market?.name))
                    .filter((t) => t.target?.toUpperCase() === "USDT")
                    .map((t) => ({
                    exchange: t.market.name,
                    pair: `${t.base}/${t.target}`,
                    price: t.last,
                    volume: t.volume,
                }));
                // Social links + ⭐ MARKET CAP
                const cgData = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinGeckoId}`);
                const links = cgData.data?.links || {};
                websites = links.homepage?.filter((url) => url) || [];
                socials = {
                    twitter: links.twitter_screen_name
                        ? `https://twitter.com/${links.twitter_screen_name}`
                        : null,
                    telegram: links.telegram_channel_identifier
                        ? `https://t.me/${links.telegram_channel_identifier}`
                        : null,
                    discord: links.chat_url?.find((url) => url.includes("discord")) || null,
                    reddit: links.subreddit_url || null,
                    github: links.repos_url?.github?.[0] || null,
                    facebook: links.facebook_username
                        ? `https://facebook.com/${links.facebook_username}`
                        : null,
                };
                // ⭐⭐⭐ MARKET CAP HERE ⭐⭐⭐
                marketCapUsd =
                    cgData.data?.market_data?.market_cap?.usd ??
                        null;
            }
        }
        catch (cgErr) {
            console.warn("CoinGecko fetch failed:", cgErr);
        }
        // 3️⃣ GOPLUS — security
        const chainMap = {
            ethereum: "1",
            bsc: "56",
            polygon: "137",
            avalanche: "43114",
            arbitrum: "42161",
            optimism: "10",
            base: "8453",
            fantom: "250",
            cronos: "25",
            linea: "59144",
        };
        const normalizedChainId = chainId ? chainId.toLowerCase() : "";
        const mappedChainId = chainMap[normalizedChainId] || (/^\d+$/.test(chainId || "") ? chainId : "1");
        let securityData = null;
        if (tokenAddress) {
            try {
                const secRes = await GoPlus.tokenSecurity(mappedChainId, [tokenAddress], 30);
                if (secRes.code === ErrorCode.SUCCESS) {
                    const sec = secRes.result[tokenAddress.toLowerCase()];
                    if (sec) {
                        securityData = {
                            is_open_source: sec.is_open_source,
                            is_honeypot: sec.is_honeypot,
                            buy_tax: sec.buy_tax,
                            sell_tax: sec.sell_tax,
                            total_supply: sec.total_supply,
                            creator_address: sec.creator_address,
                            owner_address: sec.owner_address,
                            lp_holders: sec.lp_holders,
                            trust_list: sec.trust_list,
                        };
                    }
                }
            }
            catch (err) {
                console.warn("GoPlus fetch failed:", err.message);
            }
        }
        return {
            success: true,
            data: {
                token: {
                    name: tokenName,
                    symbol: tokenSymbol,
                    address: tokenAddress,
                    chainId,
                    dexId: pair?.dexId || null,
                    pairAddress: pair?.pairAddress || null,
                    priceUsd: pair?.priceUsd || null,
                    liquidityUsd: pair?.liquidity?.usd || null,
                    volume24h: pair?.volume?.h24 || null,
                    // ⭐ ADDING MARKET CAP TO RESPONSE
                    marketCapUsd,
                },
                coinGecko: {
                    exchanges: exchangeListings,
                    websites,
                    socials,
                },
                security: securityData,
            },
        };
    }
    catch (error) {
        console.error("getFullTokenInfo error:", error.message);
        return { success: false, message: "Failed to fetch token data" };
    }
};
