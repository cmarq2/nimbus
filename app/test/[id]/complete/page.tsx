'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function CompletionContent() {
  const params = useSearchParams()
  const name = params.get('name') ?? 'Candidate'
  const scoreParam = params.get('score')
  const forced = params.get('forced') === '1'
  const score = scoreParam && scoreParam !== 'none' ? parseInt(scoreParam) : null

  const scoreConfig =
    score === null
      ? null
      : score >= 70
      ? { label: 'Great performance!', gradient: 'from-emerald-500 to-teal-400', glow: 'glow-emerald', text: 'text-emerald-400' }
      : score >= 50
      ? { label: 'Good effort!', gradient: 'from-amber-500 to-yellow-400', glow: 'glow-violet', text: 'text-amber-400' }
      : { label: 'Keep practicing!', gradient: 'from-red-500 to-pink-400', glow: 'glow-fuchsia', text: 'text-red-400' }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-[-80px] left-[-80px] w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 bg-violet-600/15 rounded-full blur-3xl animate-blob-2" />
      <div className="absolute inset-0 bg-dot-grid" />

      <div className="relative z-10 bg-white/[0.04] border border-white/[0.08] rounded-3xl p-10 w-full max-w-md backdrop-blur-sm text-center">
        {/* Success icon */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 opacity-20 animate-pulse-glow" />
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-indigo-500/30 to-violet-500/30 border border-indigo-500/30 flex items-center justify-center">
            {forced ? (
              <svg width="24" height="24" fill="none" stroke="#818cf8" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M12 8v4l3 3M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" stroke="#818cf8" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        </div>

        <h1 className="text-2xl font-black text-white mb-2">
          {forced ? "Time's up!" : 'Assessment complete!'}
        </h1>
        <p className="text-slate-400 mb-7 text-sm leading-relaxed">
          {forced
            ? `Your time ran out, ${name.split(' ')[0]}. Your answers have been submitted.`
            : `Well done, ${name.split(' ')[0]}. Your responses have been recorded.`}
        </p>

        {score !== null && scoreConfig && (
          <div className="mb-7 relative rounded-2xl overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${scoreConfig.gradient} opacity-10`} />
            <div className={`relative border border-white/[0.08] rounded-2xl p-6`}>
              <div className={`text-5xl font-black mb-1 ${scoreConfig.text}`}>{score}%</div>
              <div className="text-sm font-semibold text-white mb-0.5">{scoreConfig.label}</div>
              <div className="text-xs text-slate-500">Score on scored questions</div>
            </div>
          </div>
        )}

        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4 text-left mb-6">
          <p className="text-sm text-indigo-300 font-semibold mb-1">What happens next?</p>
          <p className="text-xs text-indigo-400/70 leading-relaxed">
            The employer will review your assessment and reach out if you move forward in the hiring process.
          </p>
        </div>

        {/* Powered by */}
        <div className="flex items-center justify-center gap-2">
          <div className="relative w-5 h-5 flex items-center justify-center">
            <div className="absolute inset-0 rounded-md logo-gradient opacity-80" />
            <svg className="relative z-10" width="10" height="10" viewBox="0 0 14 14" fill="none">
              <path d="M2 11L5 4L7 8L9 5.5L12 11H2Z" fill="white" />
            </svg>
          </div>
          <span className="text-xs text-slate-600">Powered by Nimbus</span>
        </div>
      </div>
    </div>
  )
}

export default function CompletePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin" />
      </div>
    }>
      <CompletionContent />
    </Suspense>
  )
}
