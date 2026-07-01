'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function CompletionContent() {
  const params = useSearchParams()
  const name   = params.get('name') ?? 'Candidate'
  const forced = params.get('forced') === '1'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #f8fafc 0%, #eff6ff 40%, #faf5ff 70%, #f8fafc 100%)' }}
    >
      <div className="absolute top-[-60px] right-[-60px] w-80 h-80 bg-gradient-to-bl from-indigo-100 to-transparent rounded-full blur-3xl opacity-60 animate-blob pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[-60px] w-72 h-72 bg-gradient-to-tr from-violet-100 to-transparent rounded-full blur-3xl opacity-50 animate-blob-2 pointer-events-none" />
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />

      <div className="relative z-10 bg-white border border-slate-200 rounded-3xl p-10 w-full max-w-md shadow-xl shadow-slate-200/60 text-center">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center">
          <svg width="24" height="24" fill="none" stroke="#4f46e5" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
          Assessment complete!
        </h1>
        <p className="text-slate-500 mb-8 text-sm leading-relaxed">
          {forced
            ? `Time ran out, ${name.split(' ')[0]}. Your answers have been submitted.`
            : `Well done, ${name.split(' ')[0]}. Your responses have been recorded.`}
        </p>

        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-left mb-7">
          <p className="text-sm text-indigo-800 font-bold mb-1">What happens next?</p>
          <p className="text-xs text-indigo-700/80 leading-relaxed">
            The employer will review your assessment and reach out if you move forward in the hiring process.
          </p>
        </div>

        {/* Powered by */}
        <div className="flex items-center justify-center gap-2">
          <div className="relative w-5 h-5 flex items-center justify-center">
            <div className="absolute inset-0 rounded-md logo-gradient" />
            <svg className="relative z-10" width="10" height="10" viewBox="0 0 14 14" fill="none">
              <path d="M2 11L5 4L7 8L9 5.5L12 11H2Z" fill="white" />
            </svg>
          </div>
          <span className="text-xs text-slate-400">Powered by Nimbus</span>
        </div>
      </div>
    </div>
  )
}

export default function CompletePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    }>
      <CompletionContent />
    </Suspense>
  )
}
