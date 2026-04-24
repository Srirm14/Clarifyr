'use client'

import * as React from 'react'

/**
 * A boolean that turns true on demand and resets after `durationMs` (e.g. “Saved” feedback).
 */
export function useEphemeralFlag(durationMs: number) {
  const [on, setOn] = React.useState(false)
  const t = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(
    () => () => {
      if (t.current) clearTimeout(t.current)
    },
    [],
  )

  const flash = React.useCallback(() => {
    setOn(true)
    if (t.current) clearTimeout(t.current)
    t.current = setTimeout(() => setOn(false), durationMs)
  }, [durationMs])

  return { on, flash } as const
}
