import { redirect } from 'next/navigation'

/** Legacy /app entry after login; workspace home is the dashboard. */
export default function AppLegacyRedirect() {
  redirect('/dashboard')
}
