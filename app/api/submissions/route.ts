import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import type { Submission } from '@/lib/types'

export async function GET(req: NextRequest) {
  const testId = req.nextUrl.searchParams.get('testId')
  if (!testId) {
    return NextResponse.json({ error: 'testId is required' }, { status: 400 })
  }
  const db = await getDb()
  const result = await db.execute({
    sql: 'SELECT data FROM submissions WHERE test_id = ? ORDER BY created_at ASC',
    args: [testId],
  })
  const submissions = result.rows.map(row => JSON.parse(row.data as string) as Submission)
  return NextResponse.json(submissions)
}

export async function POST(req: NextRequest) {
  const submission = (await req.json()) as Submission
  if (!submission?.id || !submission.testId) {
    return NextResponse.json({ error: 'invalid submission' }, { status: 400 })
  }
  const db = await getDb()
  await db.execute({
    sql: `INSERT INTO submissions (id, test_id, created_at, data) VALUES (?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET data = excluded.data`,
    args: [submission.id, submission.testId, submission.startedAt, JSON.stringify(submission)],
  })
  return NextResponse.json({ ok: true })
}
