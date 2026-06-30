import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

export const metadata: Metadata = {
  title: 'Nimbus — Smart Candidate Assessments',
  description:
    'Send behavioral and aptitude tests to candidates. Make smarter hiring decisions with science-backed assessments.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full font-sans antialiased bg-white text-slate-900">
        {children}
      </body>
    </html>
  )
}
