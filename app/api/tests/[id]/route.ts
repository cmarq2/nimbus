import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import type { Test } from '@/lib/types'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const db = await getDb()
  const result = await db.execute({ sql: 'SELECT data FROM tests WHERE id = ?', args: [id] })
  if (result.rows.length === 0) {
    return NextResponse.json(null, { status: 404 })
  }
  const test = JSON.parse(result.rows[0].data as string) as Test
  return NextResponse.json(test)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const employerId = req.nextUrl.searchParams.get('employerId') ?? ''
  const db = await getDb()
  await db.execute({
    sql: 'DELETE FROM tests WHERE id = ? AND employer_id = ?',
    args: [id, employerId],
  })
  await db.execute({ sql: 'DELETE FROM submissions WHERE test_id = ?', args: [id] })
  return NextResponse.json({ ok: true })
}
