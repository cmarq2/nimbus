'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getUser, saveTest, generateId } from '@/lib/data'
import type { Test, Question, Option, TestType, TestCategory, QuestionType } from '@/lib/types'

const inputCls =
  'w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-colors'

const testTypes: { value: TestType; label: string }[] = [
  { value: 'behavioral', label: 'Behavioral' },
  { value: 'aptitude', label: 'Aptitude' },
  { value: 'logical', label: 'Logical' },
  { value: 'mixed', label: 'Mixed' },
]

const categoryBadge: Record<TestCategory, string> = {
  behavioral: 'bg-blue-50 text-blue-700',
  aptitude: 'bg-violet-50 text-violet-700',
  logical: 'bg-emerald-50 text-emerald-700',
}

type NewQuestionForm = {
  text: string
  type: QuestionType
  category: TestCategory
  options: [string, string, string, string]
  correctOption: number
}

const emptyQ: NewQuestionForm = {
  text: '',
  type: 'open-ended',
  category: 'behavioral',
  options: ['', '', '', ''],
  correctOption: 0,
}

export default function CreateTestPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [testType, setTestType] = useState<TestType>('mixed')
  const [timeLimit, setTimeLimit] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [showForm, setShowForm] = useState(false)
  const [newQ, setNewQ] = useState<NewQuestionForm>(emptyQ)
  const [formError, setFormError] = useState('')
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    const user = getUser()
    if (!user) router.push('/auth/login')
  }, [router])

  function updateOption(idx: number, val: string) {
    setNewQ(prev => {
      const opts = [...prev.options] as [string, string, string, string]
      opts[idx] = val
      return { ...prev, options: opts }
    })
  }

  function addQuestion() {
    setFormError('')
    if (!newQ.text.trim()) { setFormError('Question text is required.'); return }
    if (newQ.type === 'multiple-choice' && newQ.options.some(o => !o.trim())) {
      setFormError('Fill in all four options.'); return
    }
    const optIds = ['a', 'b', 'c', 'd']
    const q: Question = {
      id: generateId(),
      text: newQ.text.trim(),
      type: newQ.type,
      category: newQ.category,
      ...(newQ.type === 'multiple-choice'
        ? {
            options: newQ.options.map<Option>((text, i) => ({ id: optIds[i], text: text.trim() })),
            correctOptionId: optIds[newQ.correctOption],
          }
        : {}),
    }
    setQuestions(prev => [...prev, q])
    setNewQ(emptyQ)
    setShowForm(false)
  }

  function removeQuestion(id: string) {
    setQuestions(prev => prev.filter(q => q.id !== id))
  }

  async function handleSave(status: 'draft' | 'active') {
    setSaveError('')
    if (!title.trim()) { setSaveError('Test title is required.'); return }
    if (questions.length === 0) { setSaveError('Add at least one question.'); return }
    const user = getUser()
    if (!user) return
    const test: Test = {
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
      type: testType,
      questions,
      status,
      employerId: user.id,
      createdAt: new Date().toISOString(),
      timeLimit: timeLimit ? parseInt(timeLimit) : undefined,
    }
    await saveTest(test)
    router.push(`/dashboard/tests/${test.id}`)
  }

  const optionLabels = ['A', 'B', 'C', 'D']

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
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Assessment</h1>
          <p className="text-sm text-slate-500">Build a custom test for your candidates</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Test Info */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">Test details</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Title *</label>
              <input
                placeholder="e.g. Software Engineer Assessment"
                value={title}
                onChange={e => { setTitle(e.target.value); setSaveError('') }}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Description</label>
              <textarea
                rows={2}
                placeholder="Briefly describe what this test covers…"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className={`${inputCls} resize-none`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">Test type</label>
              <div className="flex gap-2 flex-wrap">
                {testTypes.map(t => (
                  <button
                    key={t.value}
                    onClick={() => setTestType(t.value)}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                      testType === t.value
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Time limit <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="30"
                  value={timeLimit}
                  onChange={e => setTimeLimit(e.target.value)}
                  className={`${inputCls} w-24`}
                  min={1}
                />
                <span className="text-sm text-slate-500">minutes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-900">
              Questions{' '}
              <span className="text-slate-400 font-normal">({questions.length})</span>
            </h2>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
                Add question
              </button>
            )}
          </div>

          {/* Existing questions */}
          {questions.length > 0 && (
            <div className="flex flex-col gap-3 mb-4">
              {questions.map((q, i) => (
                <div key={q.id} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 mt-0.5 w-5 flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded capitalize ${categoryBadge[q.category]}`}>
                        {q.category}
                      </span>
                      <span className="text-xs text-slate-400 capitalize">
                        {q.type === 'multiple-choice' ? 'Multiple choice' : 'Open-ended'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-800">{q.text}</p>
                  </div>
                  <button
                    onClick={() => removeQuestion(q.id)}
                    className="text-slate-300 hover:text-red-500 transition-colors flex-shrink-0"
                  >
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {questions.length === 0 && !showForm && (
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center mb-4">
              <p className="text-sm text-slate-500 mb-3">No questions yet</p>
              <button
                onClick={() => setShowForm(true)}
                className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                + Add your first question
              </button>
            </div>
          )}

          {/* Add question form */}
          {showForm && (
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">New question</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Question text *</label>
                  <textarea
                    rows={2}
                    placeholder="Enter the question…"
                    value={newQ.text}
                    onChange={e => { setNewQ(p => ({ ...p, text: e.target.value })); setFormError('') }}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">Category</label>
                    <select
                      value={newQ.category}
                      onChange={e => setNewQ(p => ({ ...p, category: e.target.value as TestCategory }))}
                      className={inputCls}
                    >
                      <option value="behavioral">Behavioral</option>
                      <option value="aptitude">Aptitude</option>
                      <option value="logical">Logical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">Type</label>
                    <select
                      value={newQ.type}
                      onChange={e => setNewQ(p => ({ ...p, type: e.target.value as QuestionType }))}
                      className={inputCls}
                    >
                      <option value="open-ended">Open-ended</option>
                      <option value="multiple-choice">Multiple choice</option>
                    </select>
                  </div>
                </div>

                {newQ.type === 'multiple-choice' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-2">
                      Options <span className="text-slate-400 font-normal">(select the correct answer)</span>
                    </label>
                    <div className="flex flex-col gap-2">
                      {newQ.options.map((opt, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="correct"
                            checked={newQ.correctOption === i}
                            onChange={() => setNewQ(p => ({ ...p, correctOption: i }))}
                            className="accent-slate-900 w-4 h-4 flex-shrink-0"
                          />
                          <span className="text-xs font-semibold text-slate-500 w-4">{optionLabels[i]}</span>
                          <input
                            placeholder={`Option ${optionLabels[i]}`}
                            value={opt}
                            onChange={e => { updateOption(i, e.target.value); setFormError('') }}
                            className={`${inputCls} flex-1`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {formError && <p className="text-xs text-red-600">{formError}</p>}

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={addQuestion}
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                  >
                    Save question
                  </button>
                  <button
                    onClick={() => { setShowForm(false); setNewQ(emptyQ); setFormError('') }}
                    className="border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Save */}
        {saveError && <p className="text-sm text-red-600">{saveError}</p>}
        <div className="flex gap-3">
          <button
            onClick={() => handleSave('active')}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Publish test
          </button>
          <button
            onClick={() => handleSave('draft')}
            className="border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Save as draft
          </button>
        </div>
      </div>
    </div>
  )
}
