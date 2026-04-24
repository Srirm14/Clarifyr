'use client'

import * as React from 'react'

export const WORKSPACE_DISPLAY_NAME_STORAGE_KEY = 'clarifyr_display_name' as const
const STORAGE_KEY = WORKSPACE_DISPLAY_NAME_STORAGE_KEY
export const WORKSPACE_DISPLAY_NAME_EVENT = 'clarifyr:display-name-updated'

/** Clears the persisted display name (e.g. on sign out). */
export function clearWorkspaceDisplayNameStorage() {
  if (typeof globalThis === 'undefined' || !('localStorage' in globalThis)) return
  try {
    globalThis.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

export function getWorkspaceDisplayName(fallback: string): string {
  if (typeof window === 'undefined') return fallback
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v == null) return fallback
    const t = v.trim()
    if (t.length > 0) return t
  } catch {
    // ignore
  }
  return fallback
}

function initialsFromName(name: string, fallback: string): string {
  const n = (name || fallback).trim()
  if (!n) return '??'
  const parts = n.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0]![0]!}${parts[1]![0]!}`.toUpperCase()
  }
  const one = parts[0]!
  if (one.length >= 2) return one.slice(0, 2).toUpperCase()
  return one.charAt(0)!.toUpperCase()
}

function persistName(input: string, fallback: string): string {
  const next = (input.trim() || fallback).slice(0, 120)
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, next)
      window.dispatchEvent(
        new CustomEvent(WORKSPACE_DISPLAY_NAME_EVENT, { detail: next } as CustomEventInit<string>),
      )
    } catch {
      // ignore
    }
  }
  return next
}

/**
 * Display name in the app shell (Settings + sidebar). Persists in localStorage in this preview.
 */
export function useWorkspaceDisplayName(fallback: string) {
  const [name, setName] = React.useState(() => getWorkspaceDisplayName(fallback))
  const [initials, setInitials] = React.useState(() => initialsFromName(getWorkspaceDisplayName(fallback), fallback))

  const saveDisplayName = React.useCallback((value: string) => {
    const next = persistName(value, fallback)
    setName(next)
    setInitials(initialsFromName(next, fallback))
    return next
  }, [fallback])

  React.useEffect(() => {
    const sync = () => {
      const next = getWorkspaceDisplayName(fallback)
      setName(next)
      setInitials(initialsFromName(next, fallback))
    }
    const onEvent = (e: Event) => {
      const d = (e as CustomEvent<string>).detail
      if (typeof d === 'string') {
        setName(d)
        setInitials(initialsFromName(d, fallback))
        return
      }
      sync()
    }
    window.addEventListener('storage', sync)
    window.addEventListener(WORKSPACE_DISPLAY_NAME_EVENT, onEvent)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener(WORKSPACE_DISPLAY_NAME_EVENT, onEvent)
    }
  }, [fallback])

  return { displayName: name, saveDisplayName, initials, fallback }
}
