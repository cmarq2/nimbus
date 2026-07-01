import Link from 'next/link'

const features = [
  {
    label: 'Behavioral',
    title: 'Behavioral Assessments',
    description:
      'Understand how candidates think, collaborate, and respond under pressure with structured scenario-based questions.',
    icon: '🧠',
    iconBg: 'bg-blue-50',
    tag: 'bg-blue-50 text-blue-600 border-blue-100',
    hoverCls: 'hover:border-blue-200 hover:shadow-blue-50',
  },
  {
    label: 'Aptitude',
    title: 'Aptitude Tests',
    description:
      'Measure numerical reasoning, verbal ability, and cognitive performance with validated, science-backed questions.',
    icon: '📊',
    iconBg: 'bg-violet-50',
    tag: 'bg-violet-50 text-violet-600 border-violet-100',
    hoverCls: 'hover:border-violet-200 hover:shadow-violet-50',
  },
  {
    label: 'Logical',
    title: 'Logical Reasoning',
    description:
      'Evaluate analytical thinking, pattern recognition, and deductive reasoning — the core skills of every top performer.',
    icon: '🔬',
    iconBg: 'bg-emerald-50',
    tag: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    hoverCls: 'hover:border-emerald-200 hover:shadow-emerald-50',
  },
]

const steps = [
  {
    num: '01',
    title: 'Build your test',
    body: 'Create custom assessments or use templates. Mix behavioral, aptitude, and logical questions freely.',
    color: 'from-indigo-500 to-violet-500',
    glow: 'glow-indigo',
  },
  {
    num: '02',
    title: 'Invite candidates',
    body: 'Share a unique link with candidates. No accounts needed — they open the link and begin immediately.',
    color: 'from-violet-500 to-fuchsia-500',
    glow: 'glow-violet',
  },
  {
    num: '03',
    title: 'Review results',
    body: 'See scores, full answers, and insights the moment candidates finish. Compare side by side.',
    color: 'from-fuchsia-500 to-pink-500',
    glow: 'glow-fuchsia',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ── NAV ─────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg logo-gradient" />
              <svg className="relative z-10" width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L5 4L7 8L9 5.5L12 11H2Z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-slate-900 tracking-tight text-[15px]">Nimbus</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium">
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="shimmer-btn relative text-sm font-semibold text-white px-5 py-2.5 rounded-xl shadow-md shadow-indigo-500/20"
              style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #db2777 100%)' }}
            >
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden pt-16">
        {/* Pastel orbs — barely visible, add color character */}
        <div className="absolute top-[-80px] right-[-100px] w-[650px] h-[650px] bg-gradient-to-bl from-indigo-100 via-violet-50 to-transparent rounded-full blur-3xl opacity-75 animate-blob pointer-events-none" />
        <div className="absolute bottom-0 left-[-80px] w-[500px] h-[500px] bg-gradient-to-tr from-pink-50 via-fuchsia-50 to-transparent rounded-full blur-3xl opacity-60 animate-blob-2 pointer-events-none" />
        <div className="absolute top-[35%] left-[28%] w-[420px] h-[420px] bg-violet-50 rounded-full blur-3xl opacity-40 animate-blob-3 pointer-events-none" />
        <div className="absolute inset-0 bg-dot-grid pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 sm:py-32 text-center">
          {/* Floating badge */}
          <div className="animate-fade-up inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-indigo-100 bg-indigo-50 animate-float">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <span className="text-xs font-semibold text-indigo-600 tracking-wide">
              Trusted by 500+ hiring teams worldwide
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up-1 text-5xl sm:text-[68px] font-black leading-[1.04] tracking-tight mb-6 text-slate-900">
            Hire confidently with<br />
            <span className="text-gradient">science-backed tests</span>
          </h1>

          <p className="animate-fade-up-2 text-xl text-slate-500 mb-12 max-w-md mx-auto leading-relaxed">
            Send behavioral, aptitude, and logical assessments to candidates in seconds. Get data to hire smarter.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up-3 flex items-center justify-center gap-4 mb-14">
            <Link
              href="/auth/signup"
              className="shimmer-btn relative text-white font-bold px-8 py-4 rounded-xl text-sm shadow-xl shadow-indigo-500/25 hover:scale-105 transition-transform duration-200"
              style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #db2777 100%)' }}
            >
              Start for free →
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-bold text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 px-8 py-4 rounded-xl transition-all shadow-sm"
            >
              View demo
            </Link>
          </div>

          {/* Pill badges */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[
              { label: 'Behavioral', cls: 'border-blue-100 text-blue-600 bg-blue-50' },
              { label: 'Aptitude', cls: 'border-violet-100 text-violet-600 bg-violet-50' },
              { label: 'Logical Reasoning', cls: 'border-fuchsia-100 text-fuchsia-600 bg-fuchsia-50' },
            ].map(p => (
              <span key={p.label} className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border ${p.cls}`}>
                {p.label}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </section>

      {/* ── STATS ───────────────────────────────── */}
      <section className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-3">
          {[
            { value: '2×', label: 'Faster hiring decisions', sub: 'vs. traditional screening' },
            { value: '93%', label: 'Candidate satisfaction', sub: 'Average test-taker rating' },
            { value: '40%', label: 'Fewer bad hires', sub: 'Data-driven selection impact' },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`text-center py-10 px-6 ${i < 2 ? 'sm:border-r border-slate-200' : ''}`}
            >
              <div className="text-5xl font-black mb-2 text-gradient-stat animate-count-up">{s.value}</div>
              <div className="text-sm font-bold text-slate-800 mb-0.5">{s.label}</div>
              <div className="text-xs text-slate-400">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────── */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-lines pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-gradient mb-4 block">
              Assessment Types
            </span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
              Three types. One platform.
            </h2>
            <p className="text-slate-500 max-w-sm mx-auto">
              Everything you need to evaluate candidates holistically.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map(f => (
              <div
                key={f.title}
                className={`group bg-white border border-slate-200 rounded-2xl p-7 card-shadow card-shadow-hover transition-all duration-300 ${f.hoverCls}`}
              >
                <div className={`w-12 h-12 ${f.iconBg} rounded-2xl flex items-center justify-center mb-5 ring-1 ring-slate-100 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-xl">{f.icon}</span>
                </div>
                <span className={`text-[11px] font-bold uppercase tracking-widest border rounded-md px-2 py-0.5 ${f.tag} mb-3 inline-block`}>
                  {f.label}
                </span>
                <h3 className="font-bold text-slate-900 mb-3 text-[15px]">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — dark contrast section ── */}
      <section className="relative bg-slate-900 overflow-hidden">
        <div className="absolute top-[-50px] left-[8%] w-80 h-80 bg-indigo-700/20 rounded-full blur-3xl animate-blob pointer-events-none" />
        <div className="absolute bottom-[-50px] right-[8%] w-72 h-72 bg-violet-700/20 rounded-full blur-3xl animate-blob-2 pointer-events-none" />
        <div className="absolute inset-0 bg-dot-grid-dark pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-gradient-hero mb-4 block">
              How It Works
            </span>
            <h2 className="text-4xl font-black text-white tracking-tight mb-4">Simple by design</h2>
            <p className="text-slate-400">Up and running in under 5 minutes.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 relative">
            <div className="hidden sm:block absolute top-5 left-[22%] right-[22%] h-px bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-fuchsia-500/30" />
            {steps.map((step, i) => (
              <div key={step.num} className="text-center animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 ${step.glow} animate-pulse-glow`}>
                  <span className="text-white font-black text-sm">{step.num}</span>
                </div>
                <h3 className="font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid pointer-events-none" />
        <div className="absolute top-0 left-[15%] w-72 h-72 bg-gradient-to-br from-indigo-100 to-transparent rounded-full blur-3xl opacity-60 animate-blob pointer-events-none" />
        <div className="absolute bottom-0 right-[15%] w-64 h-64 bg-gradient-to-bl from-fuchsia-100 to-transparent rounded-full blur-3xl opacity-50 animate-blob-2 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gradient mb-4 block">
            Ready to start?
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-5">
            Hire smarter,<br />starting today
          </h2>
          <p className="text-slate-500 mb-10 max-w-sm mx-auto text-lg leading-relaxed">
            Join hundreds of teams who use Nimbus to find the right candidates faster.
          </p>
          <Link
            href="/auth/signup"
            className="shimmer-btn inline-block text-white font-bold px-10 py-4 rounded-xl text-sm shadow-xl shadow-indigo-500/25 hover:scale-105 transition-transform duration-200"
            style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #db2777 100%)' }}
          >
            Create your first test — it&apos;s free
          </Link>
          <p className="text-xs text-slate-400 mt-4">No credit card required · Free forever for small teams</p>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────── */}
      <footer className="bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg logo-gradient" />
              <svg className="relative z-10" width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L5 4L7 8L9 5.5L12 11H2Z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-slate-900 tracking-tight text-sm">Nimbus</span>
          </div>
          <p className="text-xs text-slate-400">© 2026 Nimbus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
