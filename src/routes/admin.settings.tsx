import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminShell, AdminCard } from "@/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin", "settings"],
    queryFn: async () => {
      const { data: rows } = await supabase
        .from("site_settings")
        .select("*")
        .order("grouping")
        .order("label");
      return rows ?? [];
    },
  });

  const rows = data ?? [];
  const groups = [...new Set(rows.map((row) => row.grouping))];

  async function save(key: string, value: string) {
    await supabase.from("site_settings").update({ value }).eq("key", key);
    await queryClient.invalidateQueries({ queryKey: ["admin", "settings"] });
  }

  return (
    <AdminShell
      title="Settings"
      subtitle="Numbers and contact details published across the public site."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {groups.map((group) => (
          <AdminCard key={group} title={group}>
            <div className="space-y-3">
              {rows
                .filter((row) => row.grouping === group)
                .map((row) => (
                  <label key={row.key} className="block">
                    <span className="text-xs font-medium text-muted-foreground">{row.label}</span>
                    <input
                      defaultValue={row.value}
                      onBlur={(e) => save(row.key, e.target.value)}
                      className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </label>
                ))}
            </div>
          </AdminCard>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Changes save when you leave a field and appear on the public site immediately.
      </p>
    </AdminShell>
  );
}