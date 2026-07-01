'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getTestById, saveSubmission, generateId } from '@/lib/data'
import type { Test, Answer, Submission } from '@/lib/types'

const PER_QUESTION_SECONDS = 90
const TIMED_CATEGORIES = new Set(['aptitude', 'logical'])

const inputCls =
  'w-full border border-slate-200 rounded-xl px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all bg-white'

type Phase = 'intro' | 'taking'

const categoryStyle: Record<string, string> = {
  behavioral: 'bg-blue-50 text-blue-700 border-blue-100',
  aptitude:   'bg-violet-50 text-violet-700 border-violet-100',
  logical:    'bg-emerald-50 text-emerald-700 border-emerald-100',
}

function QuestionTimer({ timeLeft, total }: { timeLeft: number; total: number }) {
  const r = 26
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - timeLeft / total)
  const isLow = timeLeft <= 30
  const isVeryLow = timeLeft <= 10
  const color = isVeryLow ? '#ef4444' : isLow ? '#f97316' : '#6366f1'
  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60

  return (
    <div className="flex flex-col items-center gap-0.5 select-none">
      <div className="relative w-14 h-14">
        <svg width="56" height="56" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="28" cy="28" r={r} fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
          <circle
            cx="28" cy="28" r={r}
            fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-[11px] font-black font-mono leading-none ${isVeryLow ? 'text-red-500' : isLow ? 'text-orange-500' : 'text-slate-700'}`}>
            {mins}:{secs.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="text-[9px] text-slate-400 font-semibold tracking-wide uppercase">per q</span>
    </div>
  )
}

export default function TakeTestPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [test, setTest]         = useState<Test | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [phase, setPhase]       = useState<Phase>('intro')
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [introError, setIntroError] = useState('')

  const [currentIdx, setCurrentIdx]       = useState(0)
  const [answers, setAnswers]             = useState<Answer[]>([])
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [timeLeft, setTimeLeft]           = useState<number | null>(null)
  const [questionTimeLeft, setQuestionTimeLeft] = useState<number | null>(null)
  const [startedAt]    = useState(new Date().toISOString())
  const [submissionId] = useState(generateId())

  // Tab-switch count via ref so submitTest never has a stale closure
  const tabSwitchesRef  = useRef(0)
  const [showTabWarning, setShowTabWarning] = useState(false)
  // Prevent double-fire of per-question auto-advance
  const advancingRef = useRef(false)

  useEffect(() => {
    const t = getTestById(id)
    if (!t) { setNotFound(true); return }
    setTest(t)
    if (t.timeLimit) setTimeLeft(t.timeLimit * 60)
  }, [id])

  // ── Submit ──────────────────────────────────────────────────────────
  const submitTest = useCallback(
    (finalAnswers: Answer[], forcedTime?: boolean) => {
      if (!test) return
      const mcQuestions = test.questions.filter(q => q.type === 'multiple-choice')
      let correct = 0
      for (const q of mcQuestions) {
        const ans = finalAnswers.find(a => a.questionId === q.id)
        if (ans && ans.value === q.correctOptionId) correct++
      }
      const score = mcQuestions.length > 0 ? Math.round((correct / mcQuestions.length) * 100) : undefined

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

      // Notify employer — fire and forget
      fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateName: name,
          candidateEmail: email,
          testTitle: test.title,
          score,
          totalQuestions: test.questions.length,
          correctAnswers: correct,
          tabSwitches: tabSwitchesRef.current,
        }),
      }).catch(() => {})

      router.push(
        `/test/${id}/complete?score=${score ?? 'none'}&name=${encodeURIComponent(name)}&forced=${forcedTime ? '1' : '0'}&tabs=${tabSwitchesRef.current}`,
      )
    },
    [test, name, email, submissionId, startedAt, id, router],
  )

  // ── Global test timer ───────────────────────────────────────────────
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
    const t = setTimeout(() => setTimeLeft(n => (n ?? 0) - 1), 1000)
    return () => clearTimeout(t)
  }, [phase, timeLeft, answers, currentAnswer, currentIdx, test, submitTest])

  // ── Reset per-question timer whenever question changes ──────────────
  useEffect(() => {
    if (phase !== 'taking' || !test) return
    advancingRef.current = false
    const q = test.questions[currentIdx]
    setQuestionTimeLeft(TIMED_CATEGORIES.has(q.category) ? PER_QUESTION_SECONDS : null)
  }, [currentIdx, phase, test])

  // ── Per-question timer + auto-advance ───────────────────────────────
  useEffect(() => {
    if (phase !== 'taking' || questionTimeLeft === null) return

    if (questionTimeLeft <= 0) {
      if (!test || advancingRef.current) return
      advancingRef.current = true

      const q = test.questions[currentIdx]
      let updated = [...answers]
      if (currentAnswer) {
        const idx = updated.findIndex(a => a.questionId === q.id)
        const entry = { questionId: q.id, value: currentAnswer }
        if (idx >= 0) updated[idx] = entry
        else updated = [...updated, entry]
        setAnswers(updated)
      }
      const isLast = currentIdx === test.questions.length - 1
      if (isLast) {
        submitTest(updated)
      } else {
        const next = currentIdx + 1
        setCurrentIdx(next)
        const existing = updated.find(a => a.questionId === test.questions[next].id)
        setCurrentAnswer(existing?.value ?? '')
      }
      return
    }

    const t = setTimeout(() => setQuestionTimeLeft(n => (n !== null ? n - 1 : null)), 1000)
    return () => clearTimeout(t)
  }, [questionTimeLeft, phase, test, currentIdx, answers, currentAnswer, submitTest])

  // ── Anti-cheat: fullscreen + copy/paste block + tab tracking ────────
  useEffect(() => {
    if (phase !== 'taking') return

    const prevent = (e: Event) => e.preventDefault()

    const handleVisibility = () => {
      if (document.hidden) {
        tabSwitchesRef.current++
        setShowTabWarning(true)
      }
    }

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.().catch(() => {})
      }
    }

    document.addEventListener('copy', prevent)
    document.addEventListener('paste', prevent)
    document.addEventListener('cut', prevent)
    document.addEventListener('contextmenu', prevent)
    document.addEventListener('visibilitychange', handleVisibility)
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('copy', prevent)
      document.removeEventListener('paste', prevent)
      document.removeEventListener('cut', prevent)
      document.removeEventListener('contextmenu', prevent)
      document.removeEventListener('visibilitychange', handleVisibility)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [phase])

  // ── Start test ──────────────────────────────────────────────────────
  function startTest() {
    if (!name.trim() || !email.trim()) { setIntroError('Please enter your name and email.'); return }
    document.documentElement.requestFullscreen?.().catch(() => {})
    setPhase('taking')
  }

  // ── Manual navigation ───────────────────────────────────────────────
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
      const existing = updated.find(a => a.questionId === test!.questions[next].id)
      setCurrentAnswer(existing?.value ?? '')
    }
  }

  // ── Not found / loading ─────────────────────────────────────────────
  if (notFound) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">Test not found</h1>
          <p className="text-slate-500 text-sm">This link may be invalid or the test was removed.</p>
        </div>
      </div>
    )
  }

  if (!test) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    )
  }

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  // ── Intro screen ─────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #f8fafc 0%, #eff6ff 40%, #faf5ff 70%, #f8fafc 100%)' }}
      >
        <div className="absolute top-[-60px] right-[-60px] w-72 h-72 bg-gradient-to-bl from-indigo-100 to-transparent rounded-full blur-3xl opacity-60 animate-blob pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 bg-gradient-to-tr from-violet-100 to-transparent rounded-full blur-3xl opacity-50 animate-blob-2 pointer-events-none" />
        <div className="absolute inset-0 bg-dot-grid pointer-events-none" />

        <div className="relative z-10 bg-white border border-slate-200 rounded-3xl p-8 w-full max-w-md shadow-xl shadow-slate-200/60">
          <div className="flex items-center gap-2.5 mb-7">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg logo-gradient" />
              <svg className="relative z-10" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L5 4L7 8L9 5.5L12 11H2Z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-slate-900 tracking-tight">Nimbus</span>
          </div>

          <h1 className="text-2xl font-black text-slate-900 mb-2">{test.title}</h1>
          {test.description && (
            <p className="text-base text-slate-600 mb-5 leading-relaxed">{test.description}</p>
          )}

          <div className="flex gap-3 mb-5 flex-wrap">
            <span className="text-sm font-semibold text-slate-700 border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-lg">
              {test.questions.length} questions
            </span>
            {test.timeLimit && (
              <span className="text-sm font-semibold text-slate-700 border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-lg">
                {test.timeLimit} min total
              </span>
            )}
            <span className="text-sm font-semibold text-violet-700 border border-violet-100 bg-violet-50 px-3 py-1.5 rounded-lg">
              90 sec per aptitude / technical question
            </span>
          </div>

          {/* Anti-cheat notice */}
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3.5 mb-5 flex gap-2.5">
            <span className="text-amber-500 text-base flex-shrink-0">⚠️</span>
            <div className="text-sm text-amber-900 leading-relaxed space-y-1.5">
              <p><span className="font-bold">Integrity notice:</span> This assessment runs in fullscreen. Copy/paste is disabled and tab switches are recorded and shared with the employer.</p>
              <p><span className="font-bold">Timed questions:</span> Aptitude and technical questions have a <span className="font-bold">2-minute limit</span> per question. When the timer runs out the assessment will automatically move to the next question.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 mb-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your name</label>
              <input
                placeholder="Jane Smith"
                value={name}
                onChange={e => { setName(e.target.value); setIntroError('') }}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your email</label>
              <input
                type="email"
                placeholder="jane@email.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setIntroError('') }}
                className={inputCls}
              />
            </div>
          </div>

          {introError && <p className="text-xs text-red-600 mb-3 font-medium">{introError}</p>}

          <button
            onClick={startTest}
            className="shimmer-btn relative w-full text-white font-bold py-3.5 rounded-xl text-base shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-all"
            style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #db2777 100%)' }}
          >
            Begin assessment →
          </button>

          <p className="text-sm text-slate-500 text-center mt-4">
            Your answers will be sent directly to the employer.
          </p>
        </div>
      </div>
    )
  }

  // ── Test-taking screen ───────────────────────────────────────────────
  const question = test.questions[currentIdx]
  const isLast   = currentIdx === test.questions.length - 1
  const progress = (currentIdx / test.questions.length) * 100
  const isTimeLow = timeLeft !== null && timeLeft < 60
  const isTimed   = TIMED_CATEGORIES.has(question.category)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Tab-switch warning banner */}
      {showTabWarning && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white px-6 py-2.5 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2.5 text-sm font-semibold">
            <span>⚠️</span>
            <span>Tab switch detected — your activity is being recorded and shared with the employer.</span>
          </div>
          <button
            onClick={() => setShowTabWarning(false)}
            className="text-white/80 hover:text-white text-lg leading-none ml-4"
          >
            ×
          </button>
        </div>
      )}

      {/* Top bar */}
      <div className={`sticky z-10 bg-white border-b border-slate-100 ${showTabWarning ? 'top-10' : 'top-0'}`}>
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg logo-gradient" />
              <svg className="relative z-10" width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L5 4L7 8L9 5.5L12 11H2Z" fill="white" />
              </svg>
            </div>
            <span className="text-sm font-bold text-slate-900">Nimbus</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500">
              {currentIdx + 1} <span className="text-slate-300">/</span> {test.questions.length}
            </span>
            {/* Global timer */}
            {timeLeft !== null && (
              <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
                isTimeLow
                  ? 'text-red-600 border-red-200 bg-red-50'
                  : 'text-slate-700 border-slate-200 bg-slate-50'
              }`}>
                {formatTime(timeLeft)}
              </span>
            )}
          </div>
        </div>
        {/* Gradient progress bar */}
        <div className="h-1 bg-slate-100">
          <div
            className="h-full transition-all duration-500"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #4f46e5, #7c3aed, #db2777)' }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-4 flex items-center gap-3">
          <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border ${
            categoryStyle[question.category] ?? categoryStyle.logical
          }`}>
            {question.category}
          </span>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-8 leading-snug">{question.text}</h2>

        {/* Per-question circular timer — sits right above the answers */}
        {isTimed && questionTimeLeft !== null && (
          <div className="flex justify-end mb-5">
            <QuestionTimer timeLeft={questionTimeLeft} total={PER_QUESTION_SECONDS} />
          </div>
        )}

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
                      ? 'border-indigo-300 bg-indigo-50 shadow-sm shadow-indigo-100'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 card-shadow'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    selected ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
                  }`}>
                    {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <input
                    type="radio"
                    className="sr-only"
                    name="answer"
                    value={opt.id}
                    checked={selected}
                    onChange={() => setCurrentAnswer(opt.id)}
                  />
                  <span className={`text-base leading-relaxed ${selected ? 'text-indigo-900 font-medium' : 'text-slate-800'}`}>
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
            className="text-sm text-slate-400 hover:text-slate-700 disabled:opacity-0 transition-colors font-medium"
          >
            ← Previous
          </button>

          <button
            onClick={() => saveCurrentAndGo(isLast ? 'submit' : currentIdx + 1)}
            className="shimmer-btn relative text-white font-bold px-7 py-3 rounded-xl text-sm shadow-lg shadow-indigo-500/20 hover:scale-105 transition-transform duration-200"
            style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #db2777 100%)' }}
          >
            {isLast ? 'Submit assessment' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}
