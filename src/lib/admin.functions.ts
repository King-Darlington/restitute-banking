import { createServerFn } from '@tanstack/react-start'

export const seedBuiltInAdmin = createServerFn({ method: 'POST' }).handler(async () => {
  const { ensureBuiltInAdmin } = await import('./admin.server')
  return ensureBuiltInAdmin()
})

export const checkBuiltInAdmin = createServerFn({ method: 'POST' }).handler(async () => {
  const { adminAccountExists } = await import('./admin.server')
  return { exists: await adminAccountExists() }
})