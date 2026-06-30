'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function CompletionContent() {
  const params = useSearchParams()
  const name = params.get('name') ?? 'Candidate'
  const scoreParam = params.get('score')
  const forced = params.get('forced') === '1'
  const score = scoreParam && scoreParam !== 'none' ? parseInt(scoreParam) : null

  const scoreColor =
    score === null ? '' : score >= 70 ? 'text-emerald-600' : score >= 50 ? 'text-amber-600' : 'text-red-500'

  const scoreLabel =
    score === null
      ? null
      : score >= 70
      ? 'Great performance!'
      : score >= 50
      ? 'Good effort!'
      : 'Keep practicing!'

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-10 w-full max-w-md shadow-sm text-center">
        {/* Icon */}
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" fill="none" stroke="#059669" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          {forced ? 'Time&apos;s up!' : 'Assessment complete!'}
        </h1>
        <p className="text-slate-500 mb-6">
          {forced
            ? `Your time ran out, ${name.split(' ')[0]}. Your answers have been submitted.`
            : `Well done, ${name.split(' ')[0]}. Your responses have been submitted.`}
        </p>

        {score !== null && (
          <div className="bg-slate-50 rounded-xl p-6 mb-6">
            <div className={`text-5xl font-bold mb-1 ${scoreColor}`}>{score}%</div>
            <div className="text-sm text-slate-500">{scoreLabel}</div>
            <div className="text-xs text-slate-400 mt-1">Score on scored questions</div>
          </div>
        )}

        <div className="bg-blue-50 rounded-xl p-4 text-left">
          <p className="text-sm text-blue-800 font-medium mb-1">What happens next?</p>
          <p className="text-xs text-blue-700 leading-relaxed">
            The employer will review your assessment and reach out if you move forward in the process.
          </p>
        </div>

        <div className="mt-6 flex items-center gap-2 justify-center">
          <div className="w-5 h-5 bg-slate-900 rounded-md flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
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
        <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
      </div>
    }>
      <CompletionContent />
    </Suspense>
  )
}
