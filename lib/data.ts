import type { Test, Submission, User } from './types'

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11)
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem('nimbus:user')
  return raw ? (JSON.parse(raw) as User) : null
}

export function saveUser(user: User): void {
  localStorage.setItem('nimbus:user', JSON.stringify(user))
}

export function clearUser(): void {
  localStorage.removeItem('nimbus:user')
}

export function getTests(employerId: string): Test[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(`nimbus:tests:${employerId}`)
  return raw ? (JSON.parse(raw) as Test[]) : []
}

export function saveTest(test: Test): void {
  const tests = getTests(test.employerId)
  const idx = tests.findIndex(t => t.id === test.id)
  if (idx >= 0) tests[idx] = test
  else tests.push(test)
  localStorage.setItem(`nimbus:tests:${test.employerId}`, JSON.stringify(tests))
}

export function getTestById(testId: string): Test | null {
  if (typeof window === 'undefined') return null
  const allKeys = Object.keys(localStorage).filter(k => k.startsWith('nimbus:tests:'))
  for (const key of allKeys) {
    const tests = JSON.parse(localStorage.getItem(key) ?? '[]') as Test[]
    const t = tests.find(t => t.id === testId)
    if (t) return t
  }
  return null
}

export function deleteTest(testId: string, employerId: string): void {
  const tests = getTests(employerId).filter(t => t.id !== testId)
  localStorage.setItem(`nimbus:tests:${employerId}`, JSON.stringify(tests))
}

export function getSubmissions(testId: string): Submission[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(`nimbus:submissions:${testId}`)
  return raw ? (JSON.parse(raw) as Submission[]) : []
}

export function saveSubmission(submission: Submission): void {
  const subs = getSubmissions(submission.testId)
  const idx = subs.findIndex(s => s.id === submission.id)
  if (idx >= 0) subs[idx] = submission
  else subs.push(submission)
  localStorage.setItem(`nimbus:submissions:${submission.testId}`, JSON.stringify(subs))
}

export function getAllSubmissionsForEmployer(employerId: string): Submission[] {
  const tests = getTests(employerId)
  return tests.flatMap(t => getSubmissions(t.id))
}

export function seedSampleData(employerId: string): void {
  const existing = getTests(employerId)
  if (existing.length > 0) return
  const sampleTest: Test = {
    id: generateId(),
    title: 'Software Engineer Assessment',
    description:
      'A comprehensive mixed assessment covering behavioral competencies, aptitude reasoning, and logical thinking for engineering candidates.',
    type: 'mixed',
    status: 'active',
    employerId,
    createdAt: new Date().toISOString(),
    timeLimit: 30,
    questions: [
      {
        id: generateId(),
        text: 'Describe a time when you had to debug a critical issue under pressure. What steps did you take and what was the outcome?',
        type: 'open-ended',
        category: 'behavioral',
      },
      {
        id: generateId(),
        text: 'A team of 5 developers can finish a project in 10 days. How long would it take 2 developers working at the same rate?',
        type: 'multiple-choice',
        category: 'aptitude',
        options: [
          { id: 'a', text: '4 days' },
          { id: 'b', text: '20 days' },
          { id: 'c', text: '25 days' },
          { id: 'd', text: '35 days' },
        ],
        correctOptionId: 'c',
      },
      {
        id: generateId(),
        text: 'All engineers solve problems. Sarah is an engineer. Which conclusion is definitely valid?',
        type: 'multiple-choice',
        category: 'logical',
        options: [
          { id: 'a', text: 'Sarah may sometimes solve problems' },
          { id: 'b', text: 'Sarah solves problems' },
          { id: 'c', text: 'Sarah does not solve problems' },
          { id: 'd', text: 'Cannot be determined' },
        ],
        correctOptionId: 'b',
      },
      {
        id: generateId(),
        text: 'How do you handle competing priorities when multiple urgent tasks arrive at the same time?',
        type: 'open-ended',
        category: 'behavioral',
      },
      {
        id: generateId(),
        text: 'What comes next in the sequence: 2, 6, 18, 54, ___?',
        type: 'multiple-choice',
        category: 'aptitude',
        options: [
          { id: 'a', text: '108' },
          { id: 'b', text: '162' },
          { id: 'c', text: '216' },
          { id: 'd', text: '270' },
        ],
        correctOptionId: 'b',
      },
    ],
  }
  saveTest(sampleTest)
}
