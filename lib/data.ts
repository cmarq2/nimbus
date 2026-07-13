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

export async function getTests(employerId: string): Promise<Test[]> {
  const res = await fetch(`/api/tests?employerId=${encodeURIComponent(employerId)}`)
  if (!res.ok) return []
  return (await res.json()) as Test[]
}

export async function saveTest(test: Test): Promise<void> {
  await fetch('/api/tests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(test),
  })
}

export async function getTestById(testId: string): Promise<Test | null> {
  const res = await fetch(`/api/tests/${encodeURIComponent(testId)}`)
  if (!res.ok) return null
  return (await res.json()) as Test
}

export async function deleteTest(testId: string, employerId: string): Promise<void> {
  await fetch(`/api/tests/${encodeURIComponent(testId)}?employerId=${encodeURIComponent(employerId)}`, {
    method: 'DELETE',
  })
}

export async function getSubmissions(testId: string): Promise<Submission[]> {
  const res = await fetch(`/api/submissions?testId=${encodeURIComponent(testId)}`)
  if (!res.ok) return []
  return (await res.json()) as Submission[]
}

export async function saveSubmission(submission: Submission): Promise<void> {
  await fetch('/api/submissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission),
  })
}

export async function seedSampleData(employerId: string): Promise<void> {
  const existing = await getTests(employerId)
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
    timeLimit: 45,
    questions: [
      // ── BEHAVIORAL (5) ──────────────────────────────────────────────
      {
        id: generateId(),
        text: 'Describe a time when you had to debug a critical issue under pressure. What steps did you take and what was the outcome?',
        type: 'open-ended',
        category: 'behavioral',
      },
      {
        id: generateId(),
        text: 'How do you handle competing priorities when multiple urgent tasks arrive at the same time?',
        type: 'open-ended',
        category: 'behavioral',
      },
      {
        id: generateId(),
        text: 'Tell me about a time you disagreed with a teammate\'s technical approach. How did you handle it and what was the result?',
        type: 'open-ended',
        category: 'behavioral',
      },
      {
        id: generateId(),
        text: 'Describe a situation where you had to quickly learn a new technology or tool to meet a deadline. What was your approach?',
        type: 'open-ended',
        category: 'behavioral',
      },
      {
        id: generateId(),
        text: 'Tell me about a project you\'re most proud of. What was your specific contribution and what impact did it have on the team or business?',
        type: 'open-ended',
        category: 'behavioral',
      },

      // ── APTITUDE (15) ───────────────────────────────────────────────
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
      {
        id: generateId(),
        text: 'If 3x + 7 = 28, what is the value of x?',
        type: 'multiple-choice',
        category: 'aptitude',
        options: [
          { id: 'a', text: '5' },
          { id: 'b', text: '7' },
          { id: 'c', text: '9' },
          { id: 'd', text: '11' },
        ],
        correctOptionId: 'b',
      },
      {
        id: generateId(),
        text: 'What is 15% of 360?',
        type: 'multiple-choice',
        category: 'aptitude',
        options: [
          { id: 'a', text: '36' },
          { id: 'b', text: '48' },
          { id: 'c', text: '54' },
          { id: 'd', text: '60' },
        ],
        correctOptionId: 'c',
      },
      {
        id: generateId(),
        text: 'A train travels 240 miles in 4 hours. At the same speed, how far will it travel in 6.5 hours?',
        type: 'multiple-choice',
        category: 'aptitude',
        options: [
          { id: 'a', text: '360 miles' },
          { id: 'b', text: '390 miles' },
          { id: 'c', text: '420 miles' },
          { id: 'd', text: '480 miles' },
        ],
        correctOptionId: 'b',
      },
      {
        id: generateId(),
        text: 'If 6 workers complete a task in 8 days, how many days will 4 workers take to complete the same task?',
        type: 'multiple-choice',
        category: 'aptitude',
        options: [
          { id: 'a', text: '10 days' },
          { id: 'b', text: '12 days' },
          { id: 'c', text: '14 days' },
          { id: 'd', text: '16 days' },
        ],
        correctOptionId: 'b',
      },
      {
        id: generateId(),
        text: 'A rectangle has a perimeter of 48 cm and a length of 14 cm. What is its area?',
        type: 'multiple-choice',
        category: 'aptitude',
        options: [
          { id: 'a', text: '112 sq cm' },
          { id: 'b', text: '126 sq cm' },
          { id: 'c', text: '140 sq cm' },
          { id: 'd', text: '196 sq cm' },
        ],
        correctOptionId: 'c',
      },
      {
        id: generateId(),
        text: 'A stock increases in value by 20% and then decreases by 20%. What is the net percentage change?',
        type: 'multiple-choice',
        category: 'aptitude',
        options: [
          { id: 'a', text: '0%' },
          { id: 'b', text: '-2%' },
          { id: 'c', text: '-4%' },
          { id: 'd', text: '+4%' },
        ],
        correctOptionId: 'c',
      },
      {
        id: generateId(),
        text: 'Which number comes next in the series: 1, 4, 9, 16, 25, ___?',
        type: 'multiple-choice',
        category: 'aptitude',
        options: [
          { id: 'a', text: '30' },
          { id: 'b', text: '35' },
          { id: 'c', text: '36' },
          { id: 'd', text: '49' },
        ],
        correctOptionId: 'c',
      },
      {
        id: generateId(),
        text: 'A project requires 240 man-hours. If 8 people each work 6 hours per day, how many days will it take to complete?',
        type: 'multiple-choice',
        category: 'aptitude',
        options: [
          { id: 'a', text: '4 days' },
          { id: 'b', text: '5 days' },
          { id: 'c', text: '6 days' },
          { id: 'd', text: '8 days' },
        ],
        correctOptionId: 'b',
      },
      {
        id: generateId(),
        text: 'What is 3/8 expressed as a percentage?',
        type: 'multiple-choice',
        category: 'aptitude',
        options: [
          { id: 'a', text: '30%' },
          { id: 'b', text: '35.5%' },
          { id: 'c', text: '37.5%' },
          { id: 'd', text: '40%' },
        ],
        correctOptionId: 'c',
      },
      {
        id: generateId(),
        text: 'A car depreciates 10% per year. If it was worth $25,000 initially, what is its value after 2 years?',
        type: 'multiple-choice',
        category: 'aptitude',
        options: [
          { id: 'a', text: '$20,000' },
          { id: 'b', text: '$20,250' },
          { id: 'c', text: '$22,500' },
          { id: 'd', text: '$23,000' },
        ],
        correctOptionId: 'b',
      },
      {
        id: generateId(),
        text: 'A bag contains 6 red, 9 blue, and 5 green balls. What is the probability of picking either a red or green ball?',
        type: 'multiple-choice',
        category: 'aptitude',
        options: [
          { id: 'a', text: '30%' },
          { id: 'b', text: '45%' },
          { id: 'c', text: '55%' },
          { id: 'd', text: '65%' },
        ],
        correctOptionId: 'c',
      },
      {
        id: generateId(),
        text: 'If a salary of $60,000 is increased by 12%, what is the new salary?',
        type: 'multiple-choice',
        category: 'aptitude',
        options: [
          { id: 'a', text: '$67,000' },
          { id: 'b', text: '$67,200' },
          { id: 'c', text: '$68,000' },
          { id: 'd', text: '$72,000' },
        ],
        correctOptionId: 'b',
      },
      {
        id: generateId(),
        text: 'A product is sold for $120 after a 25% markup on cost. What was the original cost price?',
        type: 'multiple-choice',
        category: 'aptitude',
        options: [
          { id: 'a', text: '$90' },
          { id: 'b', text: '$92' },
          { id: 'c', text: '$96' },
          { id: 'd', text: '$100' },
        ],
        correctOptionId: 'c',
      },

      // ── LOGICAL (10) ────────────────────────────────────────────────
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
        text: 'If all A are B, and all B are C, which of the following must be true?',
        type: 'multiple-choice',
        category: 'logical',
        options: [
          { id: 'a', text: 'All C are A' },
          { id: 'b', text: 'All B are A' },
          { id: 'c', text: 'All A are C' },
          { id: 'd', text: 'No A are C' },
        ],
        correctOptionId: 'c',
      },
      {
        id: generateId(),
        text: 'All flights departing on time are listed in green. Flight 204 is not listed in green. What can we conclude?',
        type: 'multiple-choice',
        category: 'logical',
        options: [
          { id: 'a', text: 'Flight 204 has been cancelled' },
          { id: 'b', text: 'Flight 204 is not departing on time' },
          { id: 'c', text: 'Flight 204 is delayed by over an hour' },
          { id: 'd', text: 'Nothing can be determined' },
        ],
        correctOptionId: 'b',
      },
      {
        id: generateId(),
        text: 'Some managers are engineers. All engineers are graduates. Which statement is definitely true?',
        type: 'multiple-choice',
        category: 'logical',
        options: [
          { id: 'a', text: 'All managers are graduates' },
          { id: 'b', text: 'All graduates are managers' },
          { id: 'c', text: 'Some managers are graduates' },
          { id: 'd', text: 'No managers are graduates' },
        ],
        correctOptionId: 'c',
      },
      {
        id: generateId(),
        text: 'If P implies Q, and Q implies R, and we know P is true, what can we conclude?',
        type: 'multiple-choice',
        category: 'logical',
        options: [
          { id: 'a', text: 'Q is false' },
          { id: 'b', text: 'R is false' },
          { id: 'c', text: 'R is true' },
          { id: 'd', text: 'P is false' },
        ],
        correctOptionId: 'c',
      },
      {
        id: generateId(),
        text: 'Every square is a rectangle. No rectangle is a circle. Which of the following must be true?',
        type: 'multiple-choice',
        category: 'logical',
        options: [
          { id: 'a', text: 'No circles are rectangles' },
          { id: 'b', text: 'No squares are circles' },
          { id: 'c', text: 'Some circles are squares' },
          { id: 'd', text: 'All rectangles are squares' },
        ],
        correctOptionId: 'b',
      },
      {
        id: generateId(),
        text: 'In the repeating sequence Red, Blue, Green, Red, Blue, Green… what color is the 14th item?',
        type: 'multiple-choice',
        category: 'logical',
        options: [
          { id: 'a', text: 'Red' },
          { id: 'b', text: 'Blue' },
          { id: 'c', text: 'Green' },
          { id: 'd', text: 'Cannot be determined' },
        ],
        correctOptionId: 'b',
      },
      {
        id: generateId(),
        text: 'A is taller than B. C is shorter than A but taller than B. D is shorter than B. Who is the shortest?',
        type: 'multiple-choice',
        category: 'logical',
        options: [
          { id: 'a', text: 'A' },
          { id: 'b', text: 'B' },
          { id: 'c', text: 'C' },
          { id: 'd', text: 'D' },
        ],
        correctOptionId: 'd',
      },
      {
        id: generateId(),
        text: 'If today is Wednesday, what day of the week will it be 100 days from now?',
        type: 'multiple-choice',
        category: 'logical',
        options: [
          { id: 'a', text: 'Monday' },
          { id: 'b', text: 'Wednesday' },
          { id: 'c', text: 'Friday' },
          { id: 'd', text: 'Sunday' },
        ],
        correctOptionId: 'c',
      },
      {
        id: generateId(),
        text: 'A clock reads 3:15. What is the angle between the hour and minute hands?',
        type: 'multiple-choice',
        category: 'logical',
        options: [
          { id: 'a', text: '0°' },
          { id: 'b', text: '7.5°' },
          { id: 'c', text: '15°' },
          { id: 'd', text: '22.5°' },
        ],
        correctOptionId: 'b',
      },
    ],
  }
  await saveTest(sampleTest)
}
