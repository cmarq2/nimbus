'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { saveUser, generateId } from '@/lib/data'

const inputCls =
  'w-full border border-white/10 bg-white/[0.05] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', company: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.company || !form.email || !form.password) {
      setError('All fields are required.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    saveUser({ id: generateId(), name: form.name, company: form.company, email: form.email })
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-violet-600/15 rounded-full blur-3xl animate-blob-2" />
      <div className="absolute top-[40%] right-[20%] w-56 h-56 bg-fuchsia-600/10 rounded-full blur-3xl animate-blob-3" />
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
          <h1 className="text-xl font-black text-white mb-1 tracking-tight">Create your account</h1>
          <p className="text-sm text-slate-400 mb-6">Start assessing candidates for free</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Full name</label>
              <input name="name" placeholder="Jane Smith" value={form.name} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Company</label>
              <input name="company" placeholder="Acme Inc." value={form.company} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Work email</label>
              <input name="email" type="email" placeholder="jane@acme.com" value={form.email} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
              <input name="password" type="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} className={inputCls} />
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="shimmer-btn relative w-full text-white font-semibold py-3 rounded-xl text-sm transition-all hover:scale-[1.02] disabled:opacity-60 disabled:scale-100 mt-1"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 55%, #ec4899 100%)' }}
            >
              {loading ? 'Creating account…' : 'Create account →'}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-5">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
