'use client'

import { useState } from 'react'
import Link from 'next/link'

const inputCls =
  'w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all bg-white'

export default function SignupPage() {
  const [form, setForm]       = useState({ name: '', company: '', email: '', password: '' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [pending, setPending] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
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
    try {
      await fetch('/api/notify-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, company: form.company, email: form.email }),
      })
      setPending(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #f8fafc 0%, #eff6ff 40%, #faf5ff 70%, #f8fafc 100%)' }}
    >
      <div className="absolute top-[-60px] right-[-60px] w-80 h-80 bg-gradient-to-bl from-indigo-100 to-transparent rounded-full blur-3xl opacity-70 animate-blob pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[-60px] w-72 h-72 bg-gradient-to-tr from-violet-100 to-transparent rounded-full blur-3xl opacity-60 animate-blob-2 pointer-events-none" />
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 justify-center mb-8">
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="absolute inset-0 rounded-xl logo-gradient" />
            <svg className="relative z-10" width="17" height="17" viewBox="0 0 14 14" fill="none">
              <path d="M2 11L5 4L7 8L9 5.5L12 11H2Z" fill="white" />
            </svg>
          </div>
          <span className="font-black text-slate-900 tracking-tight text-xl">Nimbus</span>
        </Link>

        {pending ? (
          /* ── Pending screen ── */
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/60 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center">
              <svg width="26" height="26" fill="none" stroke="#4f46e5" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" strokeLinecap="round" />
              </svg>
            </div>
            <h1 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Account under review</h1>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Thanks for signing up, <strong className="text-slate-700">{form.name.split(' ')[0]}</strong>! Your request has been received. You&apos;ll get an email at <strong className="text-slate-700">{form.email}</strong> once your account is approved.
            </p>
            <Link href="/" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
              Back to home
            </Link>
          </div>
        ) : (
          /* ── Signup form ── */
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-200/60">
            <h1 className="text-xl font-black text-slate-900 mb-1 tracking-tight">Create your account</h1>
            <p className="text-sm text-slate-500 mb-6">Start assessing candidates for free</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Full name</label>
                <input name="name" placeholder="Jane Smith" value={form.name} onChange={handleChange} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Company</label>
                <input name="company" placeholder="Acme Inc." value={form.company} onChange={handleChange} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Work email</label>
                <input name="email" type="email" placeholder="jane@acme.com" value={form.email} onChange={handleChange} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Password</label>
                <input name="password" type="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} className={inputCls} />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <p className="text-xs text-red-600 font-medium">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="shimmer-btn relative w-full text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-indigo-500/20 hover:scale-[1.02] disabled:opacity-60 disabled:scale-100 transition-all mt-1"
                style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #db2777 100%)' }}
              >
                {loading ? 'Submitting…' : 'Request access →'}
              </button>
            </form>

            <p className="text-center text-xs text-slate-500 mt-6">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
                Log in
              </Link>
            </p>
          </div>
        )}

        <p className="text-center text-xs text-slate-400 mt-5">
          No credit card required · Free forever for small teams
        </p>
      </div>
    </div>
  )
}
