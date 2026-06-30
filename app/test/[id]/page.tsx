'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getTestById, saveSubmission, generateId } from '@/lib/data'
import type { Test, Answer, Submission } from '@/lib/types'

const inputCls =
  'w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors'

type Phase = 'intro' | 'taking'

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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h1 className="text-xl font-semibold text-slate-900 mb-2">Test not found</h1>
          <p className="text-slate-500 text-sm">This link may be invalid or the test was removed.</p>
        </div>
      </div>
    )
  }

  if (!test) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
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
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 w-full max-w-md shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L5 4L7 8L9 5.5L12 11H2Z" fill="white" />
              </svg>
            </div>
            <span className="font-semibold text-slate-900">Nimbus</span>
          </div>

          <h1 className="text-xl font-bold text-slate-900 mb-1">{test.title}</h1>
          {test.description && (
            <p className="text-sm text-slate-500 mb-5 leading-relaxed">{test.description}</p>
          )}

          <div className="flex gap-4 text-sm text-slate-500 mb-6">
            <span>{test.questions.length} questions</span>
            {test.timeLimit && <span>{test.timeLimit} min limit</span>}
          </div>

          <div className="flex flex-col gap-4 mb-5">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Your name</label>
              <input
                placeholder="Jane Smith"
                value={name}
                onChange={e => { setName(e.target.value); setIntroError('') }}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Your email</label>
              <input
                type="email"
                placeholder="jane@email.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setIntroError('') }}
                className={inputCls}
              />
            </div>
          </div>

          {introError && <p className="text-xs text-red-600 mb-3">{introError}</p>}

          <button
            onClick={startTest}
            className="w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Begin assessment →
          </button>

          <p className="text-xs text-slate-400 text-center mt-4">
            Your answers will be sent directly to the employer.
          </p>
        </div>
      </div>
    )
  }

  /* ── Test-taking screen ── */
  const question = test.questions[currentIdx]
  const isLast = currentIdx === test.questions.length - 1
  const progress = ((currentIdx) / test.questions.length) * 100

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L5 4L7 8L9 5.5L12 11H2Z" fill="white" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-slate-900">Nimbus</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500">
              {currentIdx + 1} / {test.questions.length}
            </span>
            {timeLeft !== null && (
              <span className={`text-xs font-mono font-medium ${timeLeft < 60 ? 'text-red-600' : 'text-slate-600'}`}>
                {formatTime(timeLeft)}
              </span>
            )}
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-slate-100">
          <div
            className="h-full bg-slate-900 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-2">
          <span className={`text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded ${
            question.category === 'behavioral'
              ? 'text-blue-600 bg-blue-50'
              : question.category === 'aptitude'
              ? 'text-violet-600 bg-violet-50'
              : 'text-emerald-600 bg-emerald-50'
          }`}>
            {question.category}
          </span>
        </div>

        <h2 className="text-xl font-semibold text-slate-900 mb-8 leading-snug">{question.text}</h2>

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
            {question.options?.map(opt => (
              <label
                key={opt.id}
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                  currentAnswer === opt.id
                    ? 'border-slate-900 bg-slate-50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  currentAnswer === opt.id ? 'border-slate-900' : 'border-slate-300'
                }`}>
                  {currentAnswer === opt.id && (
                    <div className="w-2 h-2 rounded-full bg-slate-900" />
                  )}
                </div>
                <input
                  type="radio"
                  className="sr-only"
                  name="answer"
                  value={opt.id}
                  checked={currentAnswer === opt.id}
                  onChange={() => setCurrentAnswer(opt.id)}
                />
                <span className="text-sm text-slate-800">{opt.text}</span>
              </label>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={() => {
              if (currentIdx > 0) saveCurrentAndGo(currentIdx - 1)
            }}
            disabled={currentIdx === 0}
            className="text-sm text-slate-500 hover:text-slate-800 disabled:opacity-0 transition-colors"
          >
            ← Previous
          </button>

          <button
            onClick={() => saveCurrentAndGo(isLast ? 'submit' : currentIdx + 1)}
            className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            {isLast ? 'Submit assessment' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}
