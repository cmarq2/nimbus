export type QuestionType = 'multiple-choice' | 'open-ended'
export type TestCategory = 'behavioral' | 'aptitude' | 'logical'
export type TestType = 'behavioral' | 'aptitude' | 'logical' | 'mixed'

export interface Option {
  id: string
  text: string
}

export interface Question {
  id: string
  text: string
  type: QuestionType
  category: TestCategory
  options?: Option[]
  correctOptionId?: string
}

export interface Test {
  id: string
  title: string
  description: string
  type: TestType
  questions: Question[]
  createdAt: string
  employerId: string
  status: 'draft' | 'active'
  timeLimit?: number
}

export interface Answer {
  questionId: string
  value: string
}

export interface Submission {
  id: string
  testId: string
  candidateName: string
  candidateEmail: string
  answers: Answer[]
  score?: number
  totalQuestions: number
  correctAnswers?: number
  startedAt: string
  completedAt?: string
  status: 'in-progress' | 'completed'
}

export interface User {
  id: string
  email: string
  name: string
  company: string
}
