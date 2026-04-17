interface Props {
  slug: string
}

function EmploymentContractPost() {
  return (
    <>
      <p className="lead">Most people get a job offer, skim the contract, and sign it the same day. That is a mistake that can cost you tens of thousands of dollars — in restricted equity, unenforceable bonuses, or an overly broad non-compete that follows you for years.</p>
      <p>This guide walks you through every section of a standard employment contract so you know exactly what to look for before you put your name on it.</p>

      <h2>1. Job Title and Duties</h2>
      <p>This seems obvious, but the language here matters. If your contract says your role is <strong>&ldquo;such other duties as assigned by management,&rdquo;</strong> that clause gives your employer significant flexibility to change your responsibilities without your consent.</p>
      <p><strong>What to check:</strong> Make sure your core responsibilities are described specifically enough that a material change in your role would be a breach of contract.</p>

      <h2>2. Compensation Structure</h2>
      <p>Base salary is rarely the whole picture. Look for how bonuses are described. If the contract says your bonus is &ldquo;at the discretion of management,&rdquo; it is not guaranteed regardless of your performance. The same applies to commission structures — get the calculation method in writing.</p>
      <p><strong>Red flag:</strong> Any language around equity vesting that has a cliff longer than 12 months without an acceleration clause on acquisition.</p>

      <h2>3. Non-Compete Clause</h2>
      <p>This is where most people get hurt. A non-compete restricts where you can work after you leave. Courts vary wildly on enforcement — California largely refuses to enforce them, while other states enforce them strictly.</p>
      <p><strong>What is reasonable:</strong> 6–12 months, geographically limited to your actual market, limited to direct competitors in your specific field.</p>
      <p><strong>What is a red flag:</strong> 24+ months, nationwide scope, covering any company that &ldquo;competes in any way&rdquo; with your employer.</p>
      <p>Always ask to reduce the duration and narrow the scope. Most employers will negotiate this.</p>

      <h2>4. Non-Solicitation Clause</h2>
      <p>Different from a non-compete, this restricts you from recruiting your colleagues or contacting your former clients. A 12-month non-solicitation for direct reports is standard. Five years covering all clients is not.</p>

      <h2>5. Intellectual Property Assignment</h2>
      <p>This clause assigns ownership of anything you create while employed — sometimes even on your own time. Look for language that limits the assignment to work done <strong>within the scope of your employment</strong> and <strong>using company resources.</strong></p>
      <p><strong>Critical ask:</strong> Request a carve-out for personal projects you work on outside work hours on your own equipment. Many companies will agree to this in writing.</p>

      <h2>6. Termination Conditions</h2>
      <p>At-will employment means either party can terminate without cause. But look carefully at what triggers &ldquo;for cause&rdquo; termination — it often affects your severance, equity vesting, and eligibility for unemployment benefits.</p>
      <p>Also check your notice period. If you are required to give 60 days notice but the company can terminate you with 2 weeks, that asymmetry is worth pushing back on.</p>

      <h2>7. Severance and Change of Control</h2>
      <p>Many contracts are silent on severance for senior roles. If you are negotiating for a director or above position, ask for explicit severance terms — typically 3–6 months base salary for involuntary termination without cause.</p>
      <p>Change of control acceleration clauses protect your unvested equity if the company is acquired. These are standard at senior levels and worth requesting if absent.</p>

      <h2>8. Dispute Resolution</h2>
      <p>Mandatory arbitration clauses require you to resolve disputes through a private arbitration process rather than in court. This often favors employers. If you see this clause, note that it may prevent you from joining class action lawsuits.</p>

      <h2>The Bottom Line</h2>
      <p>Employment contracts are negotiable more often than people think. The key is knowing what you are reading before you respond. Tools like Clarifyr can flag the clauses above automatically and compare them against benchmarks from thousands of similar contracts — so you know whether what you are seeing is standard or a red flag worth pushing back on.</p>
    </>
  )
}

function NdaRedFlagsPost() {
  return (
    <>
      <p className="lead">Most NDAs are signed without being read. That is understandable — they look standard, they come at a busy moment, and the language is deliberately opaque. But several clauses that appear routine can legally bind you in ways you would not agree to if you understood them.</p>
      <p>Here are the seven clauses to look for in any NDA before you sign.</p>

      <h2>1. Unreasonably Long Duration</h2>
      <p>NDAs that never expire — or last 10+ years — are aggressive. The standard for most business NDAs is 2–5 years. For genuinely sensitive trade secrets, perpetual terms can be justified, but they should be limited to specifically defined categories of information, not &ldquo;any information disclosed.&rdquo;</p>
      <p><strong>Push back:</strong> Ask for a 3-year term with a carve-out for trade secrets that can remain confidential indefinitely.</p>

      <h2>2. Overly Broad Definition of &ldquo;Confidential Information&rdquo;</h2>
      <p>Some NDAs define confidential information as &ldquo;all information disclosed in any form, whether or not marked as confidential.&rdquo; That means a casual conversation is covered. A verbal suggestion in a meeting. An email you received but never opened.</p>
      <p><strong>Standard language</strong> limits confidential information to material that is marked, or that a reasonable person would understand to be confidential.</p>

      <h2>3. Unilateral vs. Mutual Obligations</h2>
      <p>In a mutual NDA, both parties agree to keep each other&apos;s information confidential. In a one-sided NDA, only you are bound. When an NDA is one-sided in a context where both parties are sharing sensitive information, that asymmetry is worth flagging.</p>

      <h2>4. Residuals Clause</h2>
      <p>A residuals clause allows the receiving party to use information that is retained in the &ldquo;unaided memory&rdquo; of their employees after the NDA ends. This is a significant carve-out that large technology companies often insert as a matter of course. It effectively limits your practical protection.</p>

      <h2>5. Return or Destruction with No Confirmation</h2>
      <p>Most NDAs require that confidential materials be returned or destroyed upon request. The red flag is when there is no certification requirement — no obligation to confirm that destruction actually happened. Insist on a written certification clause.</p>

      <h2>6. Overly Broad Non-Solicitation</h2>
      <p>Many NDAs bundle in a non-solicitation clause that prevents you from hiring the other party&apos;s employees or contacting their customers. In a standard NDA context, this is overreach. These terms belong in a separate agreement negotiated independently.</p>

      <h2>7. Mandatory Arbitration Without Carve-Out for Injunctive Relief</h2>
      <p>Arbitration clauses in NDAs are common, but the absence of a carve-out for injunctive relief is a red flag. If your confidential information is actively being misused, you need the ability to seek an emergency court injunction — not wait months for arbitration to begin.</p>

      <h2>How to Use This Information</h2>
      <p>Most NDA negotiations happen quickly and under pressure. Before you respond to any NDA, run it through a tool like Clarifyr to automatically flag these clauses, compare their terms to benchmarks, and get specific language you can use to push back — in minutes, not days.</p>
    </>
  )
}

function NonCompetePost() {
  return (
    <>
      <p className="lead">Non-compete clauses are in the majority of employment contracts in the United States — and most of them are broader than they legally need to be. Understanding exactly what yours says, and how enforceable it actually is, gives you leverage you probably did not know you had.</p>

      <h2>What a Non-Compete Clause Actually Does</h2>
      <p>A non-compete agreement (also called a covenant not to compete) restricts where you can work — or what kind of work you can do — after you leave an employer. In practice, this means you may be legally prohibited from working for a competitor for a defined period of time and within a defined geography.</p>
      <p>The key word is &ldquo;may.&rdquo; Enforceability varies dramatically by state.</p>

      <h2>Enforceability: The State-by-State Reality</h2>
      <p><strong>California, Minnesota, North Dakota, and Oklahoma</strong> effectively ban employee non-competes. If you live in California, a non-compete clause is almost certainly unenforceable against you regardless of what your contract says.</p>
      <p><strong>Most other states</strong> enforce non-competes if they meet a reasonableness standard: the restriction must be limited in duration, geography, and scope to what is necessary to protect a legitimate business interest.</p>
      <p><strong>Florida</strong> is a notable outlier — courts there heavily favor enforcement and will often blue-pencil (rewrite) overbroad clauses to make them enforceable rather than void them.</p>

      <h2>What Makes a Non-Compete Reasonable?</h2>
      <p>Courts generally look at three factors:</p>
      <ul>
        <li><strong>Duration:</strong> 6–12 months is considered standard. 24 months is the upper edge of what courts typically enforce. Anything beyond that is aggressive and often unenforceable.</li>
        <li><strong>Geography:</strong> The restriction should be limited to the territory where you actually worked or where the employer operates. A nationwide clause for a regional sales rep is likely overbroad.</li>
        <li><strong>Scope:</strong> The restricted activities should be specific. &ldquo;Any company that competes with Employer in any way&rdquo; is far too broad. &ldquo;Direct competitors in the enterprise SaaS security market&rdquo; is defensible.</li>
      </ul>

      <h2>How to Negotiate a Non-Compete Down</h2>
      <p>Non-competes are negotiated far more often than people realize. Here is a practical approach:</p>
      <p><strong>Step 1: Benchmark it.</strong> Know whether your clause is standard or aggressive relative to your industry. A tool like Clarifyr can compare your specific clause against thousands of similar contracts and tell you the exact percentile — giving you a factual basis for pushback.</p>
      <p><strong>Step 2: Make a specific counter-proposal.</strong> Do not just say &ldquo;this seems broad.&rdquo; Propose specific replacement language: &ldquo;I am comfortable with a 12-month restriction limited to direct competitors in [specific category] within my current sales territory.&rdquo;</p>
      <p><strong>Step 3: Ask for garden leave.</strong> If the employer insists on a long restriction, ask for garden leave — compensation during the restricted period. Many employers will reduce the term rather than pay for it.</p>
      <p><strong>Step 4: Document the business justification.</strong> Ask the employer to explain what specific business interest the clause is protecting. This creates a record that may matter if the clause is ever litigated.</p>

      <h2>What If You Already Signed?</h2>
      <p>Signed non-competes are not automatically enforceable. If your clause is overbroad, courts in most states will either refuse to enforce it or modify it to a reasonable scope. Consult an employment attorney in your state before assuming you are bound.</p>
      <p>The most important thing you can do before signing is understand what you are agreeing to — and whether it is standard for your role and industry. That is exactly what Clarifyr is built to help you do.</p>
    </>
  )
}

function FreelanceContractPost() {
  return (
    <>
      <p className="lead">Freelance contracts protect you from the most common project disasters: scope creep, late payment, IP disputes, and liability exposure. Before you start any client engagement, run through this checklist to make sure your contract has what it needs.</p>

      <h2>1. Scope of Work — Specific and Bounded</h2>
      <p>The scope section is the most important part of any freelance contract. It should describe exactly what you will deliver, in what format, by when — and equally importantly, what is <em>not</em> included. Vague scope language is the root cause of most client disputes.</p>
      <p><strong>Red flag:</strong> &ldquo;Ongoing support as needed&rdquo; or &ldquo;additional work as reasonably requested&rdquo; with no change order process defined.</p>

      <h2>2. Payment Terms and Late Fees</h2>
      <p>Your contract should specify: the total fee, the payment schedule (deposit, milestones, final), the payment method, and the due date. It should also include a late payment clause — typically 1.5% per month on overdue balances — and what happens if payment is not received (work pauses, ownership does not transfer).</p>

      <h2>3. Intellectual Property Transfer</h2>
      <p>By default, you own the work you create as a freelancer. Copyright transfers to the client only when explicitly assigned in writing. Make sure your contract specifies exactly when that transfer happens — typically upon receipt of final payment — and what rights are being transferred (all rights vs. limited license).</p>
      <p><strong>Important:</strong> If the contract says work is &ldquo;work made for hire,&rdquo; the client owns it from the moment of creation. Understand this clause before signing.</p>

      <h2>4. Revision and Approval Process</h2>
      <p>Define how many revision rounds are included and what happens when the client requests changes beyond that. Without this, &ldquo;just one more small change&rdquo; can turn a two-week project into a three-month ordeal.</p>

      <h2>5. Kill Fee</h2>
      <p>If the client cancels the project after work has begun, a kill fee ensures you are compensated for time already spent. Standard kill fees are 25–50% of the remaining contract value, triggered upon written cancellation.</p>

      <h2>6. Confidentiality</h2>
      <p>If you will have access to sensitive client information, a mutual NDA protects both parties. Make sure the confidentiality clause is mutual — not one-sided — and has a defined term rather than perpetual obligations.</p>

      <h2>7. Liability Cap</h2>
      <p>Your liability for errors, delays, or damages should be capped — typically at the total fees paid under the contract. Without a liability cap, a single project could expose you to claims far exceeding what you earned.</p>

      <h2>8. Dispute Resolution</h2>
      <p>Specify the governing law (your state, not the client&apos;s) and the dispute resolution process. For most freelance projects, a simple mediation-first clause is sufficient and avoids expensive litigation.</p>

      <h2>9. Portfolio Rights</h2>
      <p>Many clients want all rights, including the right to prevent you from showing the work in your portfolio. If being able to display the work matters to you, negotiate this explicitly — it is often easy to obtain.</p>

      <h2>10. Independent Contractor Status</h2>
      <p>Your contract should explicitly state that you are an independent contractor, not an employee. This affects taxes, benefits eligibility, and intellectual property ownership. Make sure this language is unambiguous.</p>

      <h2>Before You Start Any Project</h2>
      <p>Do not rely on a client&apos;s standard contract being fair — it is written to protect them. Upload any contract you receive to Clarifyr to get an instant risk score and see exactly which clauses are aggressive before you negotiate or sign.</p>
    </>
  )
}

const CONTENT_MAP: Record<string, () => React.ReactElement> = {
  'how-to-read-employment-contract': EmploymentContractPost,
  'nda-red-flag-clauses':            NdaRedFlagsPost,
  'non-compete-clause-explained':    NonCompetePost,
  'freelance-contract-checklist':    FreelanceContractPost,
}

export default function BlogPostContent({ slug }: Readonly<Props>) {
  const Component = CONTENT_MAP[slug]
  if (!Component) return null
  return <Component />
}
