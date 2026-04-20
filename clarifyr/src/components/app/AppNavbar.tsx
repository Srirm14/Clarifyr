'use client'

import * as React from 'react'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

interface AppNavbarProps {
  breadcrumbs: { label: string; href?: string }[]
}

export default function AppNavbar({ breadcrumbs }: Readonly<AppNavbarProps>) {
  return (
    <header
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-zinc-200
                 h-14 flex items-center px-4 gap-3 shrink-0"
    >
      <SidebarTrigger
        className="w-8 h-8 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors -ml-1"
      />

      <Separator orientation="vertical" className="h-5 bg-zinc-200" />

      <Breadcrumb className="flex-1">
        <BreadcrumbList>
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1
            return (
              <React.Fragment key={crumb.label}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="text-[13px] font-medium text-zinc-900">
                      {crumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      href={crumb.href ?? '#'}
                      className="text-[13px] text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                      {crumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator className="text-zinc-300" />}
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}

