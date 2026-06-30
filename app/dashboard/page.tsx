'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getUser, getTests, getSubmissions, seedSampleData, deleteTest } from '@/lib/data'
import type { Test } from '@/lib/types'

const categoryColors: Record<string, string> = {
  behavioral: 'bg-blue-50 text-blue-700',
  aptitude: 'bg-violet-50 text-violet-700',
  logical: 'bg-emerald-50 text-emerald-700',
  mixed: 'bg-amber-50 text-amber-700',
}

const statusColors: Record<string, string> = {
  active: 'bg-green-50 text-green-700',
  draft: 'bg-slate-100 text-slate-600',
}

function Badge({ label, cls }: { label: string; cls: string }) {
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-md capitalize ${cls}`}>{label}</span>
  )
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
      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 border border-slate-200 px-2.5 py-1.5 rounded-lg transition-colors hover:bg-slate-50"
    >
      {copied ? (
        <>
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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

  const totalSubmissions = tests.reduce(
    (acc, t) => acc + getSubmissions(t.id).length,
    0,
  )
  const activeTests = tests.filter(t => t.status === 'active').length

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your assessments and track candidates</p>
        </div>
        <Link
          href="/dashboard/create-test"
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          New Test
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Tests Created', value: tests.length },
          { label: 'Active Tests', value: activeTests },
          { label: 'Total Submissions', value: totalSubmissions },
        ].map(s => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="text-2xl font-bold text-slate-900 mb-1">{s.value}</div>
            <div className="text-sm text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tests */}
      <div>
        <h2 className="text-sm font-semibold text-slate-900 mb-3">Your Tests</h2>

        {tests.length === 0 ? (
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
            <div className="text-3xl mb-3">📋</div>
            <p className="font-medium text-slate-900 mb-1">No tests yet</p>
            <p className="text-sm text-slate-500 mb-4">Create your first assessment to get started</p>
            <Link
              href="/dashboard/create-test"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              Create test
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {tests.map(test => {
              const submissions = getSubmissions(test.id)
              const testUrl = `${origin}/test/${test.id}`
              return (
                <div
                  key={test.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge label={test.type} cls={categoryColors[test.type]} />
                        <Badge label={test.status} cls={statusColors[test.status]} />
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-1">{test.title}</h3>
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
                        className="text-xs text-slate-700 border border-slate-200 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        View results
                      </Link>
                      <button
                        onClick={() => handleDelete(test.id)}
                        className="text-xs text-red-500 hover:text-red-700 border border-slate-200 px-2.5 py-1.5 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors"
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
