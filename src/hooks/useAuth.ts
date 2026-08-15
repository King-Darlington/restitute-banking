import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AuthState = {
  session: Session | null;
  user: User | null;
  loading: boolean;
};

export function useAuth(): AuthState {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return { session, user: session?.user ?? null, loading };
}

export function useIsStaff() {
  const { user, loading } = useAuth();
  const [isStaff, setIsStaff] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    if (!user) {
      setIsStaff(loading ? null : false);
      return;
    }
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (!active) return;
        const roles = (data ?? []).map((row) => row.role);
        setIsStaff(roles.includes("admin") || roles.includes("staff"));
      });
    return () => {
      active = false;
    };
  }, [user, loading]);

  return { isStaff, loading: loading || isStaff === null, user };
}
