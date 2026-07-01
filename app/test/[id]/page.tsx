'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getTestById, saveSubmission, generateId } from '@/lib/data'
import type { Test, Answer, Submission } from '@/lib/types'

const inputCls =
  'w-full border border-white/10 bg-white/[0.04] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all'

type Phase = 'intro' | 'taking'

const categoryStyle: Record<string, string> = {
  behavioral: 'bg-blue-500/15 text-blue-300 border border-blue-500/25',
  aptitude:   'bg-violet-500/15 text-violet-300 border border-violet-500/25',
  logical:    'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25',
}

export default function TakeTestPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [test, setTest] = useState<Test | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [phase, setPhase] = useState<Phase>('intro')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [introError, setIntroError] = useState('')

  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [startedAt] = useState(new Date().toISOString())
  const [submissionId] = useState(generateId())

  useEffect(() => {
    const t = getTestById(id)
    if (!t) { setNotFound(true); return }
    setTest(t)
    if (t.timeLimit) setTimeLeft(t.timeLimit * 60)
  }, [id])

  const submitTest = useCallback(
    (finalAnswers: Answer[], forcedTime?: boolean) => {
      if (!test) return
      const mcQuestions = test.questions.filter(q => q.type === 'multiple-choice')
      let correct = 0
      for (const q of mcQuestions) {
        const ans = finalAnswers.find(a => a.questionId === q.id)
        if (ans && ans.value === q.correctOptionId) correct++
      }
      const score =
        mcQuestions.length > 0 ? Math.round((correct / mcQuestions.length) * 100) : undefined

      const submission: Submission = {
        id: submissionId,
        testId: test.id,
        candidateName: name,
        candidateEmail: email,
        answers: finalAnswers,
        score,
        totalQuestions: test.questions.length,
        correctAnswers: correct,
        startedAt,
        completedAt: new Date().toISOString(),
        status: 'completed',
      }
      saveSubmission(submission)
      router.push(
        `/test/${id}/complete?score=${score ?? 'none'}&name=${encodeURIComponent(name)}&forced=${forcedTime ? '1' : '0'}`,
      )
    },
    [test, name, email, submissionId, startedAt, id, router],
  )

  useEffect(() => {
    if (phase !== 'taking' || timeLeft === null) return
    if (timeLeft <= 0) {
      const saved = [...answers]
      if (currentAnswer && test) {
        const q = test.questions[currentIdx]
        if (!saved.find(a => a.questionId === q.id))
          saved.push({ questionId: q.id, value: currentAnswer })
      }
      submitTest(saved, true)
      return
    }
    const timer = setTimeout(() => setTimeLeft(t => (t ?? 0) - 1), 1000)
    return () => clearTimeout(timer)
  }, [phase, timeLeft, answers, currentAnswer, currentIdx, test, submitTest])

  function startTest() {
    if (!name.trim() || !email.trim()) { setIntroError('Please enter your name and email.'); return }
    setPhase('taking')
  }

  function saveCurrentAndGo(next: number | 'submit') {
    const question = test!.questions[currentIdx]
    let updated = [...answers]
    if (currentAnswer) {
      const idx = updated.findIndex(a => a.questionId === question.id)
      const entry = { questionId: question.id, value: currentAnswer }
      if (idx >= 0) updated[idx] = entry
      else updated = [...updated, entry]
      setAnswers(updated)
    }
    if (next === 'submit') {
      submitTest(updated)
    } else {
      setCurrentIdx(next)
      const existingAnswer = updated.find(a => a.questionId === test!.questions[next].id)
      setCurrentAnswer(existingAnswer?.value ?? '')
    }
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h1 className="text-xl font-semibold text-white mb-2">Test not found</h1>
          <p className="text-slate-400 text-sm">This link may be invalid or the test was removed.</p>
        </div>
      </div>
    )
  }

  if (!test) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-indigo-500/40 border-t-indigo-400 rounded-full animate-spin" />
      </div>
    )
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  /* ── Intro screen ── */
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Blobs */}
        <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-[-100px] right-[-100px] w-72 h-72 bg-violet-600/15 rounded-full blur-3xl animate-blob-2" />
        <div className="absolute inset-0 bg-dot-grid" />

        <div className="relative z-10 bg-white/[0.04] border border-white/[0.08] rounded-3xl p-8 w-full max-w-md backdrop-blur-sm">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-7">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg logo-gradient" />
              <svg className="relative z-10" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L5 4L7 8L9 5.5L12 11H2Z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-white tracking-tight">Nimbus</span>
          </div>

          <h1 className="text-xl font-bold text-white mb-2">{test.title}</h1>
          {test.description && (
            <p className="text-sm text-slate-400 mb-5 leading-relaxed">{test.description}</p>
          )}

          <div className="flex gap-3 mb-6">
            <span className="text-xs font-medium text-slate-400 border border-white/10 bg-white/[0.04] px-3 py-1.5 rounded-lg">
              {test.questions.length} questions
            </span>
            {test.timeLimit && (
              <span className="text-xs font-medium text-slate-400 border border-white/10 bg-white/[0.04] px-3 py-1.5 rounded-lg">
                {test.timeLimit} min limit
              </span>
            )}
          </div>

          <div className="flex flex-col gap-4 mb-5">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Your name</label>
              <input
                placeholder="Jane Smith"
                value={name}
                onChange={e => { setName(e.target.value); setIntroError('') }}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Your email</label>
              <input
                type="email"
                placeholder="jane@email.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setIntroError('') }}
                className={inputCls}
              />
            </div>
          </div>

          {introError && <p className="text-xs text-red-400 mb-3">{introError}</p>}

          <button
            onClick={startTest}
            className="shimmer-btn relative w-full text-white font-semibold py-3 rounded-xl text-sm transition-all hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 55%, #ec4899 100%)' }}
          >
            Begin assessment →
          </button>

          <p className="text-xs text-slate-600 text-center mt-4">
            Your answers will be sent directly to the employer.
          </p>
        </div>
      </div>
    )
  }

  /* ── Test-taking screen ── */
  const question = test.questions[currentIdx]
  const isLast = currentIdx === test.questions.length - 1
  const progress = (currentIdx / test.questions.length) * 100
  const isTimeLow = timeLeft !== null && timeLeft < 60

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-slate-950/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg logo-gradient" />
              <svg className="relative z-10" width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L5 4L7 8L9 5.5L12 11H2Z" fill="white" />
              </svg>
            </div>
            <span className="text-sm font-bold text-white">Nimbus</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500">
              {currentIdx + 1} <span className="text-slate-700">/</span> {test.questions.length}
            </span>
            {timeLeft !== null && (
              <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                isTimeLow
                  ? 'text-red-400 border-red-500/30 bg-red-500/10'
                  : 'text-slate-400 border-white/10 bg-white/[0.04]'
              }`}>
                {formatTime(timeLeft)}
              </span>
            )}
          </div>
        </div>
        {/* Gradient progress bar */}
        <div className="h-0.5 bg-white/[0.04]">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)',
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-4">
          <span className={`text-[11px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-lg ${
            categoryStyle[question.category] ?? categoryStyle.logical
          }`}>
            {question.category}
          </span>
        </div>

        <h2 className="text-xl font-semibold text-white mb-8 leading-snug">{question.text}</h2>

        {question.type === 'open-ended' ? (
          <textarea
            rows={5}
            placeholder="Type your answer here…"
            value={currentAnswer}
            onChange={e => setCurrentAnswer(e.target.value)}
            className={`${inputCls} resize-none`}
          />
        ) : (
          <div className="flex flex-col gap-3">
            {question.options?.map(opt => {
              const selected = currentAnswer === opt.id
              return (
                <label
                  key={opt.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                    selected
                      ? 'border-indigo-500/50 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
                      : 'border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    selected ? 'border-indigo-400 bg-indigo-500/20' : 'border-slate-600'
                  }`}>
                    {selected && <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />}
                  </div>
                  <input
                    type="radio"
                    className="sr-only"
                    name="answer"
                    value={opt.id}
                    checked={selected}
                    onChange={() => setCurrentAnswer(opt.id)}
                  />
                  <span className={`text-sm leading-relaxed ${selected ? 'text-white' : 'text-slate-300'}`}>
                    {opt.text}
                  </span>
                </label>
              )
            })}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={() => { if (currentIdx > 0) saveCurrentAndGo(currentIdx - 1) }}
            disabled={currentIdx === 0}
            className="text-sm text-slate-500 hover:text-slate-300 disabled:opacity-0 transition-colors font-medium"
          >
            ← Previous
          </button>

          <button
            onClick={() => saveCurrentAndGo(isLast ? 'submit' : currentIdx + 1)}
            className="shimmer-btn relative text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 55%, #ec4899 100%)' }}
          >
            {isLast ? 'Submit assessment' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}
