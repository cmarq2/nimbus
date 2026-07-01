'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getUser, getTests, getSubmissions, seedSampleData, deleteTest } from '@/lib/data'
import type { Test } from '@/lib/types'

const categoryStyle: Record<string, string> = {
  behavioral: 'bg-blue-50 text-blue-700 border-blue-100',
  aptitude:   'bg-violet-50 text-violet-700 border-violet-100',
  logical:    'bg-emerald-50 text-emerald-700 border-emerald-100',
  mixed:      'bg-amber-50 text-amber-700 border-amber-100',
}

const categoryDot: Record<string, string> = {
  behavioral: 'bg-blue-400',
  aptitude:   'bg-violet-400',
  logical:    'bg-emerald-400',
  mixed:      'bg-amber-400',
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
          ? 'border-emerald-200 text-emerald-700 bg-emerald-50'
          : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      {copied ? (
        <>
          <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
    { label: 'Tests Created', value: tests.length, icon: '📋', accent: 'bg-indigo-50 border-indigo-100' },
    { label: 'Active Tests', value: activeTests, icon: '✅', accent: 'bg-violet-50 border-violet-100' },
    { label: 'Submissions', value: totalSubmissions, icon: '👥', accent: 'bg-emerald-50 border-emerald-100' },
  ]

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your assessments and track candidates</p>
        </div>
        <Link
          href="/dashboard/create-test"
          className="shimmer-btn relative flex items-center gap-2 text-white font-bold px-4 py-2.5 rounded-xl text-sm shadow-lg shadow-indigo-500/20 hover:scale-105 transition-transform duration-200"
          style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #db2777 100%)' }}
        >
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
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
            className={`bg-white border rounded-2xl p-5 card-shadow ${s.accent}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg">{s.icon}</span>
              <div className="text-3xl font-black text-gradient-stat">{s.value}</div>
            </div>
            <div className="text-sm font-semibold text-slate-700">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tests list */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Your Tests</h2>
          <span className="text-xs text-slate-400">{tests.length} total</span>
        </div>

        {tests.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
            <div className="text-3xl mb-3">📋</div>
            <p className="font-bold text-slate-900 mb-1">No tests yet</p>
            <p className="text-sm text-slate-500 mb-5">Create your first assessment to get started</p>
            <Link
              href="/dashboard/create-test"
              className="shimmer-btn inline-flex items-center gap-2 text-white font-semibold text-sm px-5 py-2.5 rounded-xl"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
            >
              Create test
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {tests.map(test => {
              const submissions = getSubmissions(test.id)
              const testUrl = `${origin}/test/${test.id}`
              const catStyle = categoryStyle[test.type] ?? categoryStyle.mixed
              const dotColor = categoryDot[test.type] ?? categoryDot.mixed

              return (
                <div
                  key={test.id}
                  className="group relative bg-white border border-slate-200 rounded-2xl p-5 card-shadow card-shadow-hover"
                >
                  {/* Color left accent */}
                  <div className={`absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full ${dotColor}`} />

                  <div className="flex items-start justify-between gap-4 pl-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border capitalize ${catStyle}`}>
                          {test.type}
                        </span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                          test.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            : 'bg-slate-50 text-slate-500 border-slate-200'
                        }`}>
                          {test.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1 text-[15px]">{test.title}</h3>
                      <p className="text-sm text-slate-500 line-clamp-1 mb-3">{test.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span>{test.questions.length} questions</span>
                        {test.timeLimit && <span>{test.timeLimit} min</span>}
                        <span>{submissions.length} submission{submissions.length !== 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <CopyButton text={testUrl} />
                      <Link
                        href={`/dashboard/tests/${test.id}`}
                        className="text-xs font-medium text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors"
                      >
                        Results
                      </Link>
                      <button
                        onClick={() => handleDelete(test.id)}
                        className="text-xs font-medium text-slate-400 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all"
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
