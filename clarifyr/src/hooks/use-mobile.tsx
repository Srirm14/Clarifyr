import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Keep SSR + first client render deterministic to avoid hydration mismatch.
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    // Schedule initial sync after mount (avoid setState directly in effect body).
    const id = window.setTimeout(onChange, 0)
    return () => {
      window.clearTimeout(id)
      mql.removeEventListener("change", onChange)
    }
  }, [])

  return isMobile
}
