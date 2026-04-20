export const DEMO_CREDENTIALS = {
  email: 'test@gmail.com',
  password: 'test123',
} as const

const STORAGE_KEY = 'clarifyr:demo-session'

export type DemoSession = {
  email: string
  createdAt: number
}

export function getDemoSession(): DemoSession | null {
  if (globalThis.window === undefined) return null
  try {
    const raw = globalThis.window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<DemoSession>
    if (!parsed?.email || typeof parsed.createdAt !== 'number') return null
    return { email: parsed.email, createdAt: parsed.createdAt }
  } catch {
    return null
  }
}

export function setDemoSession(email: string) {
  if (globalThis.window === undefined) return
  const session: DemoSession = { email, createdAt: Date.now() }
  globalThis.window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function clearDemoSession() {
  if (globalThis.window === undefined) return
  globalThis.window.localStorage.removeItem(STORAGE_KEY)
}

