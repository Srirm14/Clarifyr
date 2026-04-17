'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AuthModalProps } from '@/types/landing'

function GoogleButton({ onClick }: Readonly<{ onClick: () => void }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-10 flex items-center justify-center gap-2.5
                 border border-zinc-200 rounded-lg text-sm font-medium
                 text-zinc-700 hover:bg-zinc-50 transition-colors"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
        <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
        <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/>
        <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"/>
      </svg>
      Continue with Google
    </button>
  )
}

function Field({
  id,
  label,
  type,
  placeholder,
  extra,
}: Readonly<{
  id:          string
  label:       string
  type:        string
  placeholder: string
  extra?:      React.ReactNode
}>) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-sm font-medium text-zinc-700">
          {label}
        </Label>
        {extra}
      </div>
      <Input id={id} type={type} placeholder={placeholder} className="input-base w-full" />
    </div>
  )
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [tab, setTab] = useState<'signup' | 'login'>('signup')

  const handleSubmit = (e: { preventDefault(): void }) => e.preventDefault()
  const handleGoogle = () => console.log('Google SSO')

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-modal rounded-2xl p-0 overflow-hidden border border-zinc-200 gap-0">
        <DialogTitle className="sr-only">Sign in to Clarifyr</DialogTitle>
        <div className="p-6 pb-0 flex items-start justify-between">
          <div>
            <p className="text-[18px] font-bold tracking-tight text-zinc-950">
              Clarif<span className="text-brand">yr</span>
            </p>
            <p className="text-[12px] text-zinc-400 mt-0.5">Legal clarity for everyone</p>
          </div>
          <DialogClose className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors">
            <X size={16} />
          </DialogClose>
        </div>

        <div className="p-6">
          <div className="w-full grid grid-cols-2 mb-5 bg-zinc-100 rounded-lg p-1">
            {(['signup', 'login'] as const).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  'rounded-md text-sm font-medium py-1.5 transition-all',
                  tab === t
                    ? 'bg-white shadow-sm text-zinc-900'
                    : 'text-zinc-500 hover:text-zinc-700',
                )}
              >
                {t === 'signup' ? 'Sign Up' : 'Log In'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {tab === 'signup' ? (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <Field id="name"     label="Full name"  type="text"     placeholder="Jane Smith" />
                  <Field id="email"    label="Work email" type="email"    placeholder="jane@company.com" />
                  <Field id="password" label="Password"   type="password" placeholder="Min. 8 characters" />
                  <button type="submit" className="btn-primary w-full h-10 mt-1">
                    Create account
                  </button>
                  <div className="flex items-center gap-3 my-4">
                    <Separator className="flex-1" />
                    <span className="text-xs text-zinc-400">or</span>
                    <Separator className="flex-1" />
                  </div>
                  <GoogleButton onClick={handleGoogle} />
                  <p className="text-xs text-zinc-400 text-center mt-4">
                    No credit card · 3 free analyses included
                  </p>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <Field id="login-email"    label="Email"    type="email"    placeholder="jane@company.com" />
                  <Field
                    id="login-password"
                    label="Password"
                    type="password"
                    placeholder="Your password"
                    extra={
                      <button type="button" className="text-xs text-brand hover:text-brand-dark transition-colors">
                        Forgot password?
                      </button>
                    }
                  />
                  <button type="submit" className="btn-primary w-full h-10 mt-1">
                    Log In
                  </button>
                  <div className="flex items-center gap-3 my-4">
                    <Separator className="flex-1" />
                    <span className="text-xs text-zinc-400">or</span>
                    <Separator className="flex-1" />
                  </div>
                  <GoogleButton onClick={handleGoogle} />
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
