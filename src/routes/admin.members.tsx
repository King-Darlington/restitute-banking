import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AdminShell } from "@/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/members")({
  component: AdminMembers,
});

function AdminMembers() {
  const { data } = useQuery({
    queryKey: ["admin", "members"],
    queryFn: async () => {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, email, phone, country, created_at")
        .order("created_at", { ascending: false });
      return profiles ?? [];
    },
  });

  const members = data ?? [];

  return (
    <AdminShell title="Members" subtitle="Everyone with a Restitute Banking account.">
      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full min-w-[38rem] text-left text-sm">
          <thead className="border-b border-border text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Phone</th>
              <th className="px-4 py-3 font-semibold">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {members.map((member) => (
              <tr key={member.id}>
                <td className="px-4 py-3 font-medium text-foreground">
                  {[member.first_name, member.last_name].filter(Boolean).join(" ") || "—"}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{member.email || "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{member.phone || "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(member.created_at).toLocaleDateString("en-US")}
                </td>
              </tr>
            ))}
            {members.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">
                  No members yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}