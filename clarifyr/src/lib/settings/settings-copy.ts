/** User-visible strings for the Settings feature (single place for i18n later). */
export const settingsCopy = {
  page: {
    title: 'Settings',
    description: 'Account, plan usage, documents, and sign out.',
  },
  a11y: { tabList: 'Settings sections' },
  account: {
    leadTitle: 'Profile',
    leadBody: 'Only your display name is editable here. Email and plan are reference in this preview.',
    label: 'Display name',
    fieldHint: 'Shown in the sidebar and in exports when you use them.',
    save: 'Save',
    saved: 'Saved',
    planLabel: 'Plan',
  },
  usage: {
    leadTitle: 'Document allowance',
    leadBody: 'New uploads in the current period (Pro). Resets on your billing date in production.',
    sublabel: 'Documents this period',
    remaining: (n: number) => `${n} remaining`,
    footnote: 'Same limits as the sidebar. Fixed numbers in this demo.',
  },
  documents: {
    leadTitle: 'How documents are handled',
    leadBody: 'Storage and analysis behavior for your PDFs in the product.',
    p1: 'Your PDFs stay in private storage. Each time you open one, we use a short-lived link in the viewer—never a public or permanent URL.',
    p2: 'Analysis and chat are kept per document for speed. The model runs on first upload only; when you return, you get saved results and a fresh link for the file.',
  },
  session: {
    leadTitle: 'Sign out',
    leadBody:
      'End this preview session and return to the site. Your demo session and local display name for this tab are cleared.',
    logOut: 'Log out',
  },
} as const
