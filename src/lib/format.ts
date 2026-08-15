export function money(value: number | string | null | undefined, currency = "USD") {
  const amount = typeof value === "string" ? Number(value) : (value ?? 0);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(Number.isFinite(amount) ? amount : 0);
}

export function compactMoney(value: number, currency = "USD") {
  // Deterministic across server/client runtimes (ICU compact rules differ).
  const symbol = currency === "USD" ? "$" : currency === "GBP" ? "£" : currency === "EUR" ? "€" : "";
  const abs = Math.abs(value);
  const units: [number, string][] = [
    [1_000_000_000, "B"],
    [1_000_000, "M"],
    [1_000, "K"],
  ];
  for (const [size, suffix] of units) {
    if (abs >= size) {
      const scaled = value / size;
      const text = Math.abs(scaled) >= 100 ? Math.round(scaled).toString() : scaled.toFixed(1).replace(/\.0$/, "");
      return `${symbol}${text}${suffix}`;
    }
  }
  return `${symbol}${Math.round(value)}`;
}

export function shortDate(value: string | Date | null | undefined) {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function dateTime(value: string | Date | null | undefined) {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
