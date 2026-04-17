import Link from 'next/link'
import * as Icons from 'lucide-react'
import { FOOTER_COLUMNS, SOCIAL_LINKS } from '@/lib/constants'

function SocialIcon({ name, ...props }: { name: string; size?: number; className?: string }) {
  const Icon = (Icons as unknown as Record<
    string,
    React.ComponentType<{ size?: number; className?: string }>
  >)[name]
  return Icon ? <Icon {...props} /> : null
}

export default function Footer() {
  return (
    <footer id="footer" className="bg-white py-16">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <p className="text-xl font-bold tracking-tight text-zinc-950">
              Clarif<span className="text-brand">yr</span>
            </p>
            <p className="text-body-sm text-zinc-500 mt-3 leading-relaxed max-w-[180px]">
              AI-powered legal clarity for everyone.
            </p>
          </div>

          {FOOTER_COLUMNS.map(col => (
            <div key={col.heading}>
              <p className="text-micro font-semibold uppercase tracking-wider text-zinc-900 mb-4">
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row
                        items-center justify-between gap-4">
          <p className="text-caption text-zinc-400">
            © 2025 Clarifyr Inc. Built for Digital Nomads.
          </p>
          <div className="flex items-center gap-1">
            {SOCIAL_LINKS.map(social => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-1.5 text-zinc-400 hover:text-zinc-700 transition-colors rounded-md"
              >
                <SocialIcon name={social.icon} size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
