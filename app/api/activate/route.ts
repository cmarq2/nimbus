import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

function makeToken(secret: string, email: string, action: string) {
  return crypto.createHmac('sha256', secret).update(`${email}:${action}`).digest('hex')
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email   = searchParams.get('email') ?? ''
  const name    = searchParams.get('name') ?? ''
  const company = searchParams.get('company') ?? ''
  const token   = searchParams.get('token') ?? ''

  const smtpUser = process.env.SMTP_USER ?? ''
  const smtpPass = process.env.SMTP_PASS ?? ''
  const secret   = process.env.ADMIN_SECRET ?? `${smtpUser}${smtpPass}`
  const expected = makeToken(secret, email, 'activate')

  if (!email || token !== expected) {
    return NextResponse.json({ ok: false, error: 'Invalid or expired link' }, { status: 400 })
  }

  return NextResponse.json({ ok: true, user: { name, company, email } })
}
