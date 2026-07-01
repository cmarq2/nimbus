'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { getUser, clearUser } from '@/lib/data'
import type { User } from '@/lib/types'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const u = getUser()
    if (!u) { router.push('/auth/login'); return }
    setUser(u)
  }, [router])

  function logout() {
    clearUser()
    router.push('/')
  }

  if (!user) return null

  const initials = user.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const navItems = [
    {
      href: '/dashboard',
      label: 'Overview',
      active: pathname === '/dashboard',
      icon: (
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      href: '/dashboard/create-test',
      label: 'Create Test',
      active: pathname === '/dashboard/create-test',
      icon: (
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
      ),
    },
  ]

  return (
    <div className="flex min-h-screen bg-slate-950 overflow-hidden">
      {/* ── SIDEBAR ── */}
      <aside className="w-56 flex-shrink-0 flex flex-col border-r border-white/[0.06] bg-slate-950 relative">
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent pointer-events-none" />

        {/* Logo */}
        <div className="px-5 h-16 flex items-center border-b border-white/[0.06]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
              <div className="absolute inset-0 rounded-lg logo-gradient" />
              <svg className="relative z-10" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L5 4L7 8L9 5.5L12 11H2Z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-white tracking-tight text-[15px]">Nimbus</span>
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                item.active
                  ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={item.active ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}>
                {item.icon}
              </span>
              {item.label}
              {item.active && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse-glow" />
              )}
            </Link>
          ))}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
            <div className="w-8 h-8 rounded-lg logo-gradient flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{user.company}</p>
            </div>
            <button
              onClick={logout}
              title="Sign out"
              className="text-slate-600 hover:text-red-400 transition-colors flex-shrink-0"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex-1 overflow-y-auto bg-slate-900">
        {children}
      </main>
    </div>
  )
}
