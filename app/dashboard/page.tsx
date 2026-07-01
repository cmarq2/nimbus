'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getUser, getTests, getSubmissions, seedSampleData, deleteTest } from '@/lib/data'
import type { Test } from '@/lib/types'

const categoryColors: Record<string, { pill: string; dot: string }> = {
  behavioral: { pill: 'bg-blue-500/15 text-blue-300 border-blue-500/25', dot: 'bg-blue-400' },
  aptitude:   { pill: 'bg-violet-500/15 text-violet-300 border-violet-500/25', dot: 'bg-violet-400' },
  logical:    { pill: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25', dot: 'bg-emerald-400' },
  mixed:      { pill: 'bg-amber-500/15 text-amber-300 border-amber-500/25', dot: 'bg-amber-400' },
}

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
      className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all duration-200 ${
        copied
          ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
          : 'border-white/10 text-slate-400 hover:text-white hover:border-white/25 hover:bg-white/5'
      }`}
    >
      {copied ? (
        <>
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
          Copy link
        </>
      )}
    </button>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const [tests, setTests] = useState<Test[]>([])
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    const user = getUser()
    if (!user) { router.push('/auth/login'); return }
    seedSampleData(user.id)
    setTests(getTests(user.id))
    setOrigin(window.location.origin)
  }, [router])

  function handleDelete(testId: string) {
    const user = getUser()
    if (!user) return
    if (!confirm('Delete this test? This cannot be undone.')) return
    deleteTest(testId, user.id)
    setTests(getTests(user.id))
  }

  const totalSubmissions = tests.reduce((acc, t) => acc + getSubmissions(t.id).length, 0)
  const activeTests = tests.filter(t => t.status === 'active').length

  const stats = [
    { label: 'Tests Created', value: tests.length, gradient: 'from-indigo-500 to-violet-500' },
    { label: 'Active Tests', value: activeTests, gradient: 'from-violet-500 to-fuchsia-500' },
    { label: 'Total Submissions', value: totalSubmissions, gradient: 'from-fuchsia-500 to-pink-500' },
  ]

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Overview</h1>
          <p className="text-sm text-slate-400 mt-1">Manage your assessments and track candidates</p>
        </div>
        <Link
          href="/dashboard/create-test"
          className="shimmer-btn relative flex items-center gap-2 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 55%, #ec4899 100%)' }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          New Test
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map(s => (
          <div
            key={s.label}
            className="relative rounded-2xl p-5 border border-white/[0.08] bg-white/[0.04] overflow-hidden group hover:border-white/15 transition-all duration-300"
          >
            {/* Glow orb in top-right */}
            <div className={`absolute top-[-20px] right-[-20px] w-20 h-20 bg-gradient-to-br ${s.gradient} rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity`} />
            <div className={`text-3xl font-black mb-1.5 text-gradient-stat animate-count-up`}>
              {s.value}
            </div>
            <div className="text-sm text-slate-400 relative z-10">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tests list */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-widest">Your Tests</h2>
          <span className="text-xs text-slate-500">{tests.length} total</span>
        </div>

        {tests.length === 0 ? (
          <div className="border border-dashed border-white/10 rounded-2xl p-12 text-center">
            <div className="text-3xl mb-3">📋</div>
            <p className="font-semibold text-white mb-1">No tests yet</p>
            <p className="text-sm text-slate-400 mb-5">Create your first assessment to get started</p>
            <Link
              href="/dashboard/create-test"
              className="inline-flex items-center gap-2 text-white font-medium text-sm px-5 py-2.5 rounded-xl"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
            >
              Create test
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {tests.map(test => {
              const submissions = getSubmissions(test.id)
              const testUrl = `${origin}/test/${test.id}`
              const cat = categoryColors[test.type] ?? categoryColors.mixed

              return (
                <div
                  key={test.id}
                  className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300 p-5"
                >
                  {/* Color dot accent */}
                  <div className={`absolute left-0 top-6 bottom-6 w-0.5 rounded-r-full ${cat.dot} opacity-60`} />

                  <div className="flex items-start justify-between gap-4 pl-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border capitalize ${cat.pill}`}>
                          {test.type}
                        </span>
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                          test.status === 'active'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                            : 'bg-slate-700/50 text-slate-400 border border-white/10'
                        }`}>
                          {test.status}
                        </span>
                      </div>
                      <h3 className="font-semibold text-white mb-1 text-[15px]">{test.title}</h3>
                      <p className="text-sm text-slate-500 line-clamp-1 mb-3">{test.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-600">
                        <span>{test.questions.length} questions</span>
                        {test.timeLimit && <span>{test.timeLimit} min</span>}
                        <span>{submissions.length} submission{submissions.length !== 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <CopyButton text={testUrl} />
                      <Link
                        href={`/dashboard/tests/${test.id}`}
                        className="text-xs font-medium text-slate-300 border border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/5 hover:border-white/25 hover:text-white transition-all"
                      >
                        Results
                      </Link>
                      <button
                        onClick={() => handleDelete(test.id)}
                        className="text-xs font-medium text-slate-600 border border-white/[0.06] px-3 py-1.5 rounded-lg hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
