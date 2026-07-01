import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const {
      candidateName,
      candidateEmail,
      testTitle,
      score,
      totalQuestions,
      correctAnswers,
      tabSwitches,
    } = await req.json()

    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS

    if (!user || !pass) {
      return NextResponse.json({ ok: false, error: 'SMTP not configured' }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: { user, pass },
    })

    const scoreText =
      score !== undefined
        ? `${score}% &nbsp;<span style="color:#64748b;font-size:13px">(${correctAnswers} of ${totalQuestions} multiple-choice correct)</span>`
        : 'N/A &mdash; open-ended assessment'

    const tabColor = tabSwitches > 0 ? '#dc2626' : '#16a34a'
    const tabNote  = tabSwitches > 0 ? `${tabSwitches} switch${tabSwitches > 1 ? 'es' : ''} detected ⚠️` : 'None ✓'

    await transporter.sendMail({
      from: `"Nimbus" <${user}>`,
      to: user,
      subject: `Assessment complete: ${candidateName} — ${testTitle}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:580px;margin:40px auto;padding:0 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 55%,#db2777 100%);border-radius:16px 16px 0 0;padding:28px 32px;text-align:center;">
      <p style="margin:0 0 6px 0;color:rgba(255,255,255,0.75);font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-weight:600;">Nimbus Assessment Alert</p>
      <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800;letter-spacing:-0.3px;">A candidate just completed their assessment</h1>
    </div>

    <!-- Body -->
    <div style="background:#fff;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px;">

      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:11px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px;width:38%;font-weight:500;">Candidate</td>
          <td style="padding:11px 0;border-bottom:1px solid #f1f5f9;font-weight:700;color:#0f172a;font-size:15px;">${candidateName}</td>
        </tr>
        <tr>
          <td style="padding:11px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px;font-weight:500;">Email</td>
          <td style="padding:11px 0;border-bottom:1px solid #f1f5f9;"><a href="mailto:${candidateEmail}" style="color:#4f46e5;text-decoration:none;font-weight:500;">${candidateEmail}</a></td>
        </tr>
        <tr>
          <td style="padding:11px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px;font-weight:500;">Assessment</td>
          <td style="padding:11px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;">${testTitle}</td>
        </tr>
        <tr>
          <td style="padding:11px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:13px;font-weight:500;">Score</td>
          <td style="padding:11px 0;border-bottom:1px solid #f1f5f9;font-weight:800;color:#4f46e5;font-size:20px;">${scoreText}</td>
        </tr>
        <tr>
          <td style="padding:11px 0;color:#64748b;font-size:13px;font-weight:500;">Tab switches</td>
          <td style="padding:11px 0;font-weight:600;color:${tabColor};">${tabNote}</td>
        </tr>
      </table>

      <div style="margin-top:28px;text-align:center;">
        <a href="https://nimbus-bice.vercel.app/dashboard" style="display:inline-block;background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 55%,#db2777 100%);color:#fff;text-decoration:none;padding:13px 28px;border-radius:10px;font-weight:700;font-size:14px;letter-spacing:0.2px;">
          View in Dashboard &rarr;
        </a>
      </div>
    </div>

    <p style="text-align:center;color:#94a3b8;font-size:11px;margin-top:16px;">
      Sent by Nimbus &bull; <a href="https://nimbus-bice.vercel.app" style="color:#94a3b8;">nimbus-bice.vercel.app</a>
    </p>
  </div>
</body>
</html>`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[notify]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
