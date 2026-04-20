export type Category = { id: string; name: string }

const KEY = 'clarifyr-categories-v1'

const DEFAULTS: Category[] = [
  { id: 'legal', name: 'Legal' },
  { id: 'employment', name: 'Employment' },
  { id: 'nda', name: 'NDA' },
  { id: 'resume', name: 'Resume' },
  { id: 'finance', name: 'Finance' },
  { id: 'real-estate', name: 'Real Estate' },
  { id: 'other', name: 'Other' },
]

function normalizeName(s: string) {
  return s.trim().replaceAll(/\s+/g, ' ').slice(0, 32)
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replaceAll(/[^a-z0-9\s-]/g, '')
    .replaceAll(/\s+/g, '-')
    .replaceAll(/-+/g, '-')
    .slice(0, 40)
}

function safeParse(raw: string | null): Category[] | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return null
    const items = parsed
      .map(v => (v && typeof v === 'object' ? (v as Record<string, unknown>) : null))
      .filter(Boolean)
      .map(o => {
        const id = typeof o?.id === 'string' ? o.id : ''
        const name = typeof o?.name === 'string' ? o.name : ''
        return { id, name }
      })
      .filter(c => c.id && c.name)
    return items.length ? items : null
  } catch {
    return null
  }
}

export function loadCategories(): Category[] {
  if (globalThis.window === undefined) return DEFAULTS
  const parsed = safeParse(globalThis.window.localStorage.getItem(KEY))
  return parsed ?? DEFAULTS
}

export function saveCategories(next: Category[]) {
  if (globalThis.window === undefined) return
  globalThis.window.localStorage.setItem(KEY, JSON.stringify(next))
}

export function createCategory(name: string) {
  const clean = normalizeName(name)
  if (!clean) return null

  const existing = loadCategories()
  const id = slugify(clean) || crypto.randomUUID()

  const dup = existing.find(c => c.name.toLowerCase() === clean.toLowerCase() || c.id === id)
  if (dup) return dup

  const next = [{ id, name: clean }, ...existing.filter(c => c.id !== 'other')]
  // Keep "Other" at the end if it exists.
  const other = existing.find(c => c.id === 'other')
  if (other) next.push(other)
  saveCategories(next)
  return { id, name: clean }
}

