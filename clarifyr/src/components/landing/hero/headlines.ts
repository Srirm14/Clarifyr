export type HeadlineSeg = { t: string; b: boolean; br?: boolean }

export const HERO_HEADLINES: HeadlineSeg[][] = [
  [
    { t: 'Every contract ', b: false },
    { t: 'hides risks.', b: true, br: true },
    { t: ' We find them in ', b: false },
    { t: '30 seconds.', b: true },
  ],
  [
    { t: 'Signing blind ', b: false },
    { t: 'costs money.', b: true, br: true },
    { t: ' AI analysis ', b: false },
    { t: 'costs nothing.', b: true },
  ],
  [{ t: "That NDA you're about to sign? ", b: false, br: true }, { t: 'Read it first.', b: true }],
  [
    { t: 'Know your ', b: false },
    { t: 'leverage', b: true, br: true },
    { t: ' before you negotiate. ', b: false },
    { t: "We'll find it.", b: true },
  ],
  [
    { t: 'Legal jargon ', b: true },
    { t: 'translated into ', b: false, br: true },
    { t: 'plain English.', b: true },
    { t: ' Instantly.', b: false },
  ],
  [{ t: "Your employer's lawyer wrote it. ", b: false, br: true }, { t: 'You should understand it.', b: true }],
  [{ t: '50,000+ contracts analyzed. ', b: false, br: true }, { t: "We've seen every trick.", b: true }],
  [
    { t: 'That non-compete? It might be ', b: false },
    { t: 'unenforceable.', b: true, br: true },
    { t: " Let's check.", b: false },
  ],
  [
    { t: 'Risky clauses ', b: true },
    { t: 'flagged. Plain English. ', b: false, br: true },
    { t: 'Done in 30s.', b: true },
  ],
  [{ t: 'Upload. Analyze. ', b: false, br: true }, { t: 'Negotiate with confidence.', b: true }],
] as const

