export const analyzeTokenSafety = (data: any) => {
  let score = 0;
  const report: any = {};
  // 1️⃣ GoPlus Security
  const sec = data.security;
  if (!sec) {
    report.security = { score: 0, reason: "No security data" };
  } else {
    let s = 0;
    if (sec.is_honeypot === "1")
      return { score: 0, label: "🚨 Honeypot", report };
    if (sec.is_open_source === "1") s += 5;
    if (Number(sec.buy_tax ?? 0) <= 10 && Number(sec.sell_tax ?? 0) <= 10)
      s += 5;
    const locked =
      sec.lp_holders?.reduce(
        (sum: number, lp: any) =>
          sum + (lp.is_locked ? parseFloat(lp.percent) : 0),
        0,
      ) ?? 0;
    if (locked >= 80) s += 10;
    if (sec.owner_address === "0x0000000000000000000000000000000000000000")
      s += 5;
    s += 15; // Non-honeypot
    report.security = { score: s, reason: "Security data analyzed" };
    score += s;
  }
  // 2️⃣ Liquidity & Volume
  const liq = data.token.liquidityUsd ?? 0;
  const vol = data.token.volume24h ?? 0;
  let lvScore = 0;
  if (liq > 1_000_000) lvScore += 10;
  if (vol > 100_000) lvScore += 5;
  const ratio = liq / (vol || 1);
  if (ratio >= 0.05 && ratio <= 20) lvScore += 5;
  score += lvScore;
  report.liquidity = { score: lvScore };
  // 3️⃣ Exchanges
  const exchanges = data.coinGecko.exchanges || [];
  let exScore = 0;
  const tier1 = ["binance", "okx", "kucoin", "mexc", "coinbase"];
  if (exchanges.some((e: any) => tier1.includes(e.exchange.toLowerCase())))
    exScore += 10;
  if (exchanges.length >= 3) exScore += 5;
  score += exScore;
  report.exchanges = { score: exScore };
  // 4️⃣ Socials
  const socials = Object.values(data.coinGecko.socials || {}).filter(Boolean);
  let socScore = 0;
  const websites = data.coinGecko.websites || [];
  if (websites.some((w: any) => w.startsWith("https://"))) socScore += 5;
  if (socials.length >= 1) socScore += 5;
  if (socials.length >= 3) socScore += 5;
  score += socScore;
  report.socials = { score: socScore };
  // 5️⃣ Transparency
  let transScore = 0;
  if (sec?.owner_address === "0x0000000000000000000000000000000000000000")
    transScore += 5;
  if (sec?.creator_address && sec.creator_address !== sec.owner_address)
    transScore += 5;
  score += transScore;
  report.transparency = { score: transScore };

  // 6️⃣ Age & Volatility
  let ageVolScore = 0;
  const createdAt = data.token.pairCreatedAt;
  const isNew = createdAt
    ? Date.now() - createdAt < 7 * 24 * 60 * 60 * 1000
    : true; // < 7 days
  if (!isNew) ageVolScore += 10;

  const priceChange = Math.abs(data.token.priceChange24h || 0);
  if (priceChange < 20) ageVolScore += 10;
  else if (priceChange < 50) ageVolScore += 5;

  score += ageVolScore;
  report.ageAndVolatility = { score: ageVolScore, isNew, priceChange };

  // 🧾 Final Label
  let label = "❗ Suspicious";
  if (score >= 80) label = "✅ Safe / Trusted";
  else if (score >= 60) label = "⚠️ Medium Risk";
  else if (score < 40) label = "🚨 Likely Scam";
  return { score, label, report };
};
