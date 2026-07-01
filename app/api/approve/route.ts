import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import crypto from 'crypto'

function makeToken(secret: string, email: string, action: string) {
  return crypto.createHmac('sha256', secret).update(`${email}:${action}`).digest('hex')
}

function html(title: string, message: string, color: string) {
  return new NextResponse(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title>
<style>body{margin:0;font-family:-apple-system,sans-serif;background:#f1f5f9;display:flex;align-items:center;justify-content:center;min-height:100vh;}
.card{background:#fff;border-radius:16px;padding:40px;max-width:420px;text-align:center;box-shadow:0 4px 24px rgba(0,0,0,0.08);}
h1{color:${color};font-size:24px;margin:0 0 8px;}p{color:#64748b;margin:0;font-size:15px;}</style></head>
<body><div class="card"><h1>${title}</h1><p>${message}</p></div></body></html>`, {
    headers: { 'Content-Type': 'text/html' },
  })
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const email   = searchParams.get('email') ?? ''
    const name    = searchParams.get('name') ?? ''
    const company = searchParams.get('company') ?? ''
    const action  = searchParams.get('action') ?? ''
    const token   = searchParams.get('token') ?? ''

    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    if (!smtpUser || !smtpPass) {
      return html('Error', 'SMTP is not configured on this server.', '#dc2626')
    }

    const secret   = process.env.ADMIN_SECRET ?? `${smtpUser}${smtpPass}`
    const expected = makeToken(secret, email, action)

    if (token !== expected) {
      return html('Invalid link', 'This link is invalid or has expired.', '#dc2626')
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: { user: smtpUser, pass: smtpPass },
    })

    if (action === 'approve') {
      const activateToken = makeToken(secret, email, 'activate')
      const base = 'https://www.nimbustechgroup.com'
      const activateUrl = `${base}/activate?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&company=${encodeURIComponent(company)}&token=${activateToken}`

      await transporter.sendMail({
        from: `"Nimbus" <${smtpUser}>`,
        to: email,
        subject: `You're approved — activate your Nimbus account`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:540px;margin:40px auto;padding:0 16px;">
    <div style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 55%,#db2777 100%);border-radius:16px 16px 0 0;padding:32px;text-align:center;">
      <p style="margin:0 0 6px;color:rgba(255,255,255,0.75);font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-weight:600;">Nimbus</p>
      <h1 style="margin:0;color:#fff;font-size:24px;font-weight:800;">You&rsquo;re approved, ${name.split(' ')[0]}!</h1>
    </div>
    <div style="background:#fff;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px;text-align:center;">
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 28px;">
        Your Nimbus account has been approved. Click the button below to activate your account and start building assessments.
      </p>
      <a href="${activateUrl}" style="display:inline-block;background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 55%,#db2777 100%);color:#fff;text-decoration:none;padding:14px 32px;border-radius:10px;font-weight:700;font-size:15px;">
        Activate my account →
      </a>
      <p style="color:#94a3b8;font-size:12px;margin-top:24px;">This link is one-time use and expires if unused.</p>
    </div>
    <p style="text-align:center;color:#94a3b8;font-size:11px;margin-top:16px;">Nimbus · nimbustechgroup.com</p>
  </div>
</body>
</html>`,
      })

      return html('Approved!', `Activation email sent to ${email}.`, '#16a34a')
    }

    if (action === 'deny') {
      await transporter.sendMail({
        from: `"Nimbus" <${smtpUser}>`,
        to: email,
        subject: `Your Nimbus account request`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:540px;margin:40px auto;padding:0 16px;">
    <div style="background:#1e293b;border-radius:16px 16px 0 0;padding:32px;text-align:center;">
      <p style="margin:0 0 6px;color:rgba(255,255,255,0.5);font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-weight:600;">Nimbus</p>
      <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800;">Account request update</h1>
    </div>
    <div style="background:#fff;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px;">
      <p style="color:#475569;font-size:15px;line-height:1.6;margin:0;">
        Hi ${name.split(' ')[0]}, thank you for your interest in Nimbus. Unfortunately we&rsquo;re unable to approve your account at this time. If you have any questions, please reply to this email.
      </p>
    </div>
    <p style="text-align:center;color:#94a3b8;font-size:11px;margin-top:16px;">Nimbus · nimbustechgroup.com</p>
  </div>
</body>
</html>`,
      })

      return html('Denied', `Rejection email sent to ${email}.`, '#475569')
    }

    return html('Error', 'Unknown action.', '#dc2626')
  } catch (err) {
    console.error('[approve]', err)
    return html('Error', 'Something went wrong. Check the server logs.', '#dc2626')
  }
}
