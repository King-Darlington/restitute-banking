import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminGate } from "@/admin/AdminGate";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Staff console — Restitute Banking" },
      { name: "description", content: "Restricted Restitute Banking back office for recovery staff." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Staff console — Restitute Banking" },
      { property: "og:description", content: "Restricted Restitute Banking back office." },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <AdminGate>
      <Outlet />
    </AdminGate>
  );
}