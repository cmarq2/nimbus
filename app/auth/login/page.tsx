'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getUser } from '@/lib/data'

const inputCls =
  'w-full border border-white/10 bg-white/[0.05] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please enter your email and password.')
      return
    }
    setLoading(true)
    const user = getUser()
    if (!user || user.email !== form.email) {
      setError('No account found. Please sign up first.')
      setLoading(false)
      return
    }
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Blobs */}
      <div className="absolute top-[-80px] right-[-80px] w-80 h-80 bg-violet-600/15 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-[-80px] left-[-80px] w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl animate-blob-2" />
      <div className="absolute inset-0 bg-dot-grid" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 justify-center mb-8">
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="absolute inset-0 rounded-xl logo-gradient" />
            <svg className="relative z-10" width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path d="M2 11L5 4L7 8L9 5.5L12 11H2Z" fill="white" />
            </svg>
          </div>
          <span className="font-bold text-white tracking-tight text-lg">Nimbus</span>
        </Link>

        <div className="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-8 backdrop-blur-sm">
          <h1 className="text-xl font-black text-white mb-1 tracking-tight">Welcome back</h1>
          <p className="text-sm text-slate-400 mb-6">Log in to your Nimbus account</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
              <input
                name="email"
                type="email"
                placeholder="jane@acme.com"
                value={form.email}
                onChange={handleChange}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className={inputCls}
              />
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="shimmer-btn relative w-full text-white font-semibold py-3 rounded-xl text-sm transition-all hover:scale-[1.02] disabled:opacity-60 disabled:scale-100 mt-1"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 55%, #ec4899 100%)' }}
            >
              {loading ? 'Logging in…' : 'Log in →'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-5">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
