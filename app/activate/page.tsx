'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { saveUser, generateId } from '@/lib/data'
import Link from 'next/link'

function ActivateContent() {
  const params  = useSearchParams()
  const router  = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    const email   = params.get('email') ?? ''
    const name    = params.get('name') ?? ''
    const company = params.get('company') ?? ''
    const token   = params.get('token') ?? ''

    const qs = new URLSearchParams({ email, name, company, token }).toString()

    fetch(`/api/activate?${qs}`)
      .then(r => r.json())
      .then(data => {
        if (data.ok) {
          saveUser({ id: generateId(), name: data.user.name, company: data.user.company, email: data.user.email })
          setStatus('success')
          setTimeout(() => router.push('/dashboard'), 1800)
        } else {
          setStatus('error')
        }
      })
      .catch(() => setStatus('error'))
  }, [params, router])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #f8fafc 0%, #eff6ff 40%, #faf5ff 70%, #f8fafc 100%)' }}
    >
      <div className="absolute top-[-60px] right-[-60px] w-80 h-80 bg-gradient-to-bl from-indigo-100 to-transparent rounded-full blur-3xl opacity-70 animate-blob pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[-60px] w-72 h-72 bg-gradient-to-tr from-violet-100 to-transparent rounded-full blur-3xl opacity-60 animate-blob-2 pointer-events-none" />
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />

      <div className="relative z-10 bg-white border border-slate-200 rounded-3xl p-10 w-full max-w-sm shadow-xl shadow-slate-200/60 text-center">
        {status === 'loading' && (
          <>
            <div className="w-12 h-12 mx-auto mb-5 rounded-full border-2 border-indigo-100 border-t-indigo-500 animate-spin" />
            <p className="text-slate-600 font-medium">Activating your account…</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <svg width="24" height="24" fill="none" stroke="#16a34a" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-xl font-black text-slate-900 mb-2">Account activated!</h1>
            <p className="text-sm text-slate-500">Taking you to your dashboard…</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
              <svg width="24" height="24" fill="none" stroke="#dc2626" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </div>
            <h1 className="text-xl font-black text-slate-900 mb-2">Link invalid or expired</h1>
            <p className="text-sm text-slate-500 mb-6">This activation link is no longer valid. Please contact support.</p>
            <Link href="/" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
              Back to home
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default function ActivatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    }>
      <ActivateContent />
    </Suspense>
  )
}
