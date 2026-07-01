import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import crypto from 'crypto'

function makeToken(secret: string, email: string, action: string) {
  return crypto.createHmac('sha256', secret).update(`${email}:${action}`).digest('hex')
}

export async function POST(req: NextRequest) {
  try {
    const { name, company, email } = await req.json()

    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    if (!smtpUser || !smtpPass) {
      return NextResponse.json({ ok: false, error: 'SMTP not configured' }, { status: 500 })
    }

    const secret = process.env.ADMIN_SECRET ?? `${smtpUser}${smtpPass}`
    const base   = 'https://www.nimbustechgroup.com'

    const approveToken = makeToken(secret, email, 'approve')
    const denyToken    = makeToken(secret, email, 'deny')

    const approveUrl = `${base}/api/approve?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&company=${encodeURIComponent(company)}&action=approve&token=${approveToken}`
    const denyUrl    = `${base}/api/approve?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&company=${encodeURIComponent(company)}&action=deny&token=${denyToken}`

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: { user: smtpUser, pass: smtpPass },
    })

    await transporter.sendMail({
      from: `"Nimbus" <${smtpUser}>`,
      to: smtpUser,
      subject: `New signup: ${name} — ${company}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:40px auto;padding:0 16px;">
    <div style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 55%,#db2777 100%);border-radius:16px 16px 0 0;padding:28px 32px;text-align:center;">
      <p style="margin:0 0 6px;color:rgba(255,255,255,0.75);font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-weight:600;">Nimbus — New Signup</p>
      <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800;">Someone just signed up</h1>
    </div>

    <div style="background:#fff;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:11px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px;width:35%;font-weight:500;">Name</td>
          <td style="padding:11px 0;border-bottom:1px solid #f1f5f9;font-weight:700;color:#0f172a;font-size:15px;">${name}</td>
        </tr>
        <tr>
          <td style="padding:11px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px;font-weight:500;">Company</td>
          <td style="padding:11px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;font-weight:600;">${company}</td>
        </tr>
        <tr>
          <td style="padding:11px 0;color:#64748b;font-size:13px;font-weight:500;">Email</td>
          <td style="padding:11px 0;"><a href="mailto:${email}" style="color:#4f46e5;text-decoration:none;font-weight:500;">${email}</a></td>
        </tr>
      </table>

      <div style="margin-top:32px;display:flex;gap:12px;text-align:center;">
        <a href="${approveUrl}" style="display:inline-block;background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 55%,#db2777 100%);color:#fff;text-decoration:none;padding:13px 28px;border-radius:10px;font-weight:700;font-size:14px;margin-right:12px;">
          Approve →
        </a>
        <a href="${denyUrl}" style="display:inline-block;background:#f1f5f9;color:#475569;text-decoration:none;padding:13px 28px;border-radius:10px;font-weight:700;font-size:14px;border:1px solid #e2e8f0;">
          Deny
        </a>
      </div>
    </div>

    <p style="text-align:center;color:#94a3b8;font-size:11px;margin-top:16px;">
      Sent by Nimbus · nimbustechgroup.com
    </p>
  </div>
</body>
</html>`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[notify-signup]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
