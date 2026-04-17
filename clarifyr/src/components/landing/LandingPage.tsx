'use client'

import { useState } from 'react'
import Navbar    from './Navbar'
import AuthModal from './AuthModal'
import Hero        from './sections/Hero'
import SocialProof from './sections/SocialProof'
import Problem     from './sections/Problem'
import Features    from './sections/Features'
import HowItWorks  from './sections/HowItWorks'
import Demo        from './sections/Demo'
import Pricing     from './sections/Pricing'
import FAQ         from './sections/FAQ'
import FinalCTA    from './sections/FinalCTA'
import Footer      from './sections/Footer'

export default function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false)
  const openAuth  = () => setAuthOpen(true)
  const closeAuth = () => setAuthOpen(false)

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar    onCTAClick={openAuth} />
      <main>
        <Hero        onCTAClick={openAuth} />
        <SocialProof />
        <Problem />
        <Features />
        <HowItWorks  onCTAClick={openAuth} />
        <Demo        onCTAClick={openAuth} />
        <Pricing     onCTAClick={openAuth} />
        <FAQ />
        <FinalCTA    onCTAClick={openAuth} />
      </main>
      <Footer />
      <AuthModal open={authOpen} onClose={closeAuth} />
    </div>
  )
}
