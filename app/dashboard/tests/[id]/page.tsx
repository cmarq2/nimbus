'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { getUser, getTestById, getSubmissions } from '@/lib/data'
import type { Test, Submission } from '@/lib/types'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className="flex items-center gap-2 text-sm font-medium text-slate-700 border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
    >
      {copied ? '✓ Copied!' : 'Copy test link'}
    </button>
  )
}

const categoryBadge: Record<string, string> = {
  behavioral: 'bg-blue-50 text-blue-700',
  aptitude: 'bg-violet-50 text-violet-700',
  logical: 'bg-emerald-50 text-emerald-700',
  mixed: 'bg-amber-50 text-amber-700',
}

export default function TestDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [test, setTest] = useState<Test | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [origin, setOrigin] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    const user = getUser()
    if (!user) { router.push('/auth/login'); return }
    const t = getTestById(id)
    if (!t) { router.push('/dashboard'); return }
    setTest(t)
    setSubmissions(getSubmissions(id))
    setOrigin(window.location.origin)
  }, [id, router])

  if (!test) return null

  const testUrl = `${origin}/test/${test.id}`
  const mcQuestions = test.questions.filter(q => q.type === 'multiple-choice')

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/dashboard"
          className="text-slate-400 hover:text-slate-700 transition-colors"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight truncate">{test.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-md capitalize ${categoryBadge[test.type]}`}>
              {test.type}
            </span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${
              test.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-600'
            }`}>
              {test.status}
            </span>
          </div>
        </div>
      </div>

      {/* Share link */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6">
        <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">Share with candidates</p>
        <div className="flex items-center gap-3">
          <code className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 truncate font-mono">
            {testUrl}
          </code>
          <CopyButton text={testUrl} />
        </div>
      </div>

      {/* Questions summary */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6">
        <p className="text-xs font-medium text-slate-500 mb-3 uppercase tracking-wide">
          Questions ({test.questions.length})
        </p>
        <div className="flex flex-col gap-2">
          {test.questions.map((q, i) => (
            <div key={q.id} className="flex items-start gap-3">
              <span className="text-xs text-slate-400 font-medium mt-0.5 w-4 flex-shrink-0">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 line-clamp-1">{q.text}</p>
                <span className={`text-xs font-medium px-1.5 py-0.5 rounded capitalize ${categoryBadge[q.category]}`}>
                  {q.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submissions */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <p className="text-xs font-medium text-slate-500 mb-4 uppercase tracking-wide">
          Submissions ({submissions.length})
        </p>

        {submissions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-slate-500">No submissions yet.</p>
            <p className="text-xs text-slate-400 mt-1">Share the test link above to invite candidates.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {submissions.map(sub => (
              <div key={sub.id} className="border border-slate-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpanded(expanded === sub.id ? null : sub.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
                >
                  <div>
                    <div className="font-medium text-slate-900 text-sm">{sub.candidateName}</div>
                    <div className="text-xs text-slate-500">{sub.candidateEmail}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    {mcQuestions.length > 0 && sub.score !== undefined && (
                      <div className={`text-sm font-semibold ${
                        sub.score >= 70 ? 'text-emerald-600' : sub.score >= 50 ? 'text-amber-600' : 'text-red-500'
                      }`}>
                        {sub.score}%
                      </div>
                    )}
                    <div className="text-xs text-slate-400">
                      {sub.completedAt
                        ? new Date(sub.completedAt).toLocaleDateString()
                        : 'In progress'}
                    </div>
                    <svg
                      width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                      className={`text-slate-400 transition-transform ${expanded === sub.id ? 'rotate-180' : ''}`}
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

                {expanded === sub.id && (
                  <div className="border-t border-slate-100 p-4 bg-slate-50">
                    {test.questions.map((q, i) => {
                      const answer = sub.answers.find(a => a.questionId === q.id)
                      const isCorrect =
                        q.type === 'multiple-choice' && answer?.value === q.correctOptionId
                      const isWrong =
                        q.type === 'multiple-choice' && answer && answer.value !== q.correctOptionId
                      return (
                        <div key={q.id} className="mb-4 last:mb-0">
                          <p className="text-xs font-medium text-slate-500 mb-1">Q{i + 1}. {q.text}</p>
                          {answer ? (
                            <div className={`text-sm px-3 py-2 rounded-lg ${
                              isCorrect
                                ? 'bg-emerald-50 text-emerald-800'
                                : isWrong
                                ? 'bg-red-50 text-red-800'
                                : 'bg-white border border-slate-200 text-slate-700'
                            }`}>
                              {q.type === 'multiple-choice'
                                ? q.options?.find(o => o.id === answer.value)?.text ?? answer.value
                                : answer.value}
                              {isCorrect && <span className="ml-2 text-emerald-600 font-medium">✓ Correct</span>}
                              {isWrong && (
                                <span className="ml-2 text-red-600 font-medium">
                                  ✗ Correct: {q.options?.find(o => o.id === q.correctOptionId)?.text}
                                </span>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-slate-400 italic">No answer</p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
