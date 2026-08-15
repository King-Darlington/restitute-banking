import fs from 'fs';
const target = './src/lib/admin.server.ts';
const content = `import { supabaseAdmin } from '@/integrations/supabase/client.server'

export const DEFAULT_ADMIN_EMAIL = 'admin@restitutebanking.com'
export const DEFAULT_ADMIN_PASSWORD = 'Restitute@Admin2026'

/**
 * Ensures the built-in staff account exists, the WordPress-style way:
 * one known administrator that can sign in at /admin on a fresh install.
 */
export async function ensureBuiltInAdmin() {
  const supabase = supabaseAdmin

  const { data: list, error: listError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 })
  if (listError) {
    return { ok: false, message: listError.message }
  }

  let user = list?.users.find((u) => u.email?.toLowerCase() === DEFAULT_ADMIN_EMAIL)

  if (!user) {
    const { data: created, error: createError } = await supabase.auth.admin.createUser({
      email: DEFAULT_ADMIN_EMAIL,
      password: DEFAULT_ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: { first_name: 'Restitute', last_name: 'Administrator' },
    })
    if (createError) return { ok: false, message: createError.message }
    user = created.user ?? undefined
  }

  if (!user) return { ok: false, message: 'Could not provision the administrator account.' }

  const { error: upsertError } = await supabase.from('user_roles').upsert(
    { user_id: user.id, role: 'admin' },
    { onConflict: 'user_id,role' },
  )

  if (upsertError) {
    return { ok: false, message: upsertError.message }
  }

  return { ok: true, message: 'ready' }
}

export async function adminAccountExists() {
  const supabase = supabaseAdmin
  const { data: list, error } = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 })

  if (error) {
    throw error
  }

  return list?.users.some((user) => user.email?.toLowerCase() === DEFAULT_ADMIN_EMAIL) ?? false
}
`;
fs.writeFileSync(target, content, 'utf8');
console.log('wrote', target);
