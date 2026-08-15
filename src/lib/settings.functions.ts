import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type SiteSettings = Record<string, string>;

export const defaultSettings: SiteSettings = {
  recovered_total: "412000000",
  claims_resolved: "61840",
  recovery_rate: "87",
  avg_days: "19",
  rate_savings_apy: "3.75",
  rate_certificate_apy: "3.65",
  rate_card_apr: "4.00",
  rate_loan_apr: "15.49",
  support_phone: "1-800-RESTITUTE",
  support_email: "claims@restitutebanking.com",
  routing_number: "251480576",
};

export const getSiteSettings = createServerFn({ method: "GET" }).handler(async () => {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) return defaultSettings;

  const client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });

  const { data, error } = await client.from("site_settings").select("key, value");
  if (error || !data) return defaultSettings;

  const merged: SiteSettings = { ...defaultSettings };
  for (const row of data) merged[row.key] = row.value;
  return merged;
});
