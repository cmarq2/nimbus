import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import type { Test } from '@/lib/types'

export async function GET(req: NextRequest) {
  const employerId = req.nextUrl.searchParams.get('employerId')
  if (!employerId) {
    return NextResponse.json({ error: 'employerId is required' }, { status: 400 })
  }
  const db = await getDb()
  const result = await db.execute({
    sql: 'SELECT data FROM tests WHERE employer_id = ? ORDER BY created_at DESC',
    args: [employerId],
  })
  const tests = result.rows.map(row => JSON.parse(row.data as string) as Test)
  return NextResponse.json(tests)
}

export async function POST(req: NextRequest) {
  const test = (await req.json()) as Test
  if (!test?.id || !test.employerId) {
    return NextResponse.json({ error: 'invalid test' }, { status: 400 })
  }
  const db = await getDb()
  await db.execute({
    sql: `INSERT INTO tests (id, employer_id, created_at, data) VALUES (?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET employer_id = excluded.employer_id, data = excluded.data`,
    args: [test.id, test.employerId, test.createdAt, JSON.stringify(test)],
  })
  return NextResponse.json({ ok: true })
}
