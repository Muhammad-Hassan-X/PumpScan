export type NumberUnit = "K" | "M" | "B" | "T";

export interface FormatNumberOptions {
  decimals?: number;
  trimZeros?: boolean;
}

export function formatNumber(
  value: number,
  options: FormatNumberOptions = {}
): string {
  const { decimals = 2, trimZeros = true } = options;

  if (value === null || value === undefined || isNaN(value)) {
    return "0";
  }

  const absValue = Math.abs(value);

  let formatted: string;

  if (absValue >= 1_000_000_000_000) {
    formatted = (value / 1_000_000_000_000).toFixed(decimals) + "T";
  } else if (absValue >= 1_000_000_000) {
    formatted = (value / 1_000_000_000).toFixed(decimals) + "B";
  } else if (absValue >= 1_000_000) {
    formatted = (value / 1_000_000).toFixed(decimals) + "M";
  } else if (absValue >= 1_000) {
    formatted = (value / 1_000).toFixed(decimals) + "K";
  } else {
    formatted = value.toFixed(decimals);
  }

  return trimZeros
    ? formatted.replace(/\.0+$|(\.\d*[1-9])0+$/, "$1")
    : formatted;
}
