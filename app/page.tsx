import Link from 'next/link'

const features = [
  {
    label: 'Behavioral',
    title: 'Behavioral Assessments',
    description:
      'Understand how candidates think, collaborate, and respond under pressure through structured, real-world scenario questions.',
    icon: '🧠',
    gradient: 'from-blue-500 to-cyan-400',
    glow: 'glow-indigo',
    accent: 'text-blue-400',
    border: 'from-blue-500/50 via-cyan-500/50 to-blue-400/50',
  },
  {
    label: 'Aptitude',
    title: 'Aptitude Tests',
    description:
      'Measure numerical reasoning, verbal ability, and cognitive performance with validated science-backed questions.',
    icon: '📊',
    gradient: 'from-violet-500 to-purple-400',
    glow: 'glow-violet',
    accent: 'text-violet-400',
    border: 'from-violet-500/50 via-purple-500/50 to-violet-400/50',
  },
  {
    label: 'Logical',
    title: 'Logical Reasoning',
    description:
      'Evaluate analytical thinking, pattern recognition, and deductive reasoning — the core skills of every top performer.',
    icon: '🔬',
    gradient: 'from-emerald-500 to-teal-400',
    glow: 'glow-emerald',
    accent: 'text-emerald-400',
    border: 'from-emerald-500/50 via-teal-500/50 to-emerald-400/50',
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
    body: 'Share a unique link directly with candidates. No accounts needed — they open the link and begin immediately.',
    color: 'from-violet-500 to-fuchsia-500',
    glow: 'glow-violet',
  },
  {
    num: '03',
    title: 'Review results',
    body: 'See scores, full answers, and insights the moment candidates finish. Compare them side by side.',
    color: 'from-fuchsia-500 to-pink-500',
    glow: 'glow-fuchsia',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 overflow-x-hidden">

      {/* ── NAVIGATION ─────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-slate-950/70 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg logo-gradient" />
              <svg className="relative z-10" width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L5 4L7 8L9 5.5L12 11H2Z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-white tracking-tight text-[15px]">Nimbus</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm text-slate-400 hover:text-white transition-colors font-medium">
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="shimmer-btn relative text-sm font-semibold text-white px-5 py-2.5 rounded-xl"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 55%, #ec4899 100%)' }}
            >
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 pt-16">
        {/* Animated gradient blobs */}
        <div className="absolute top-[-120px] left-[-100px] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-[10%] right-[-80px] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-3xl animate-blob-2" />
        <div className="absolute bottom-[-80px] left-[38%] w-[450px] h-[450px] bg-fuchsia-600/15 rounded-full blur-3xl animate-blob-3" />

        {/* Dot grid */}
        <div className="absolute inset-0 bg-dot-grid" />

        {/* Radial fade mask */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(2,6,23,0.9) 100%)'
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center w-full">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-indigo-500/25 bg-indigo-500/8 backdrop-blur-sm animate-float">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" style={{ boxShadow: '0 0 6px #34d399' }} />
            <span className="text-xs font-medium text-indigo-300 tracking-wide">
              Trusted by 500+ hiring teams worldwide
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up-1 text-5xl sm:text-7xl font-black leading-none tracking-tight mb-7 text-gradient-hero">
            Hire confidently<br />with science-backed tests
          </h1>

          <p className="animate-fade-up-2 text-lg sm:text-xl text-slate-400 mb-12 max-w-lg mx-auto leading-relaxed">
            Send behavioral, aptitude, and logical assessments to candidates
            in seconds. Get objective data to make smarter decisions.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up-3 flex items-center justify-center gap-4 mb-14">
            <Link
              href="/auth/signup"
              className="shimmer-btn relative group text-white font-semibold px-8 py-4 rounded-xl text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 55%, #ec4899 100%)', boxShadow: '0 0 40px rgba(139,92,246,0.35)' }}
            >
              Start for free →
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-slate-300 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/25 px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              View demo
            </Link>
          </div>

          {/* Pill badges */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[
              { label: 'Behavioral', c: 'border-blue-500/30 text-blue-300 bg-blue-500/8' },
              { label: 'Aptitude', c: 'border-violet-500/30 text-violet-300 bg-violet-500/8' },
              { label: 'Logical Reasoning', c: 'border-fuchsia-500/30 text-fuchsia-300 bg-fuchsia-500/8' },
            ].map(p => (
              <span
                key={p.label}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-full border backdrop-blur-sm ${p.c}`}
              >
                {p.label}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      </section>

      {/* ── STATS ──────────────────────────────── */}
      <section className="relative border-b border-white/[0.06] bg-slate-900/50 backdrop-blur-sm">
        {/* Subtle gradient top line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-3 gap-1">
          {[
            { value: '2×', label: 'Faster hiring decisions', sub: 'Compared to traditional screening' },
            { value: '93%', label: 'Candidate satisfaction', sub: 'Average rating from test-takers' },
            { value: '40%', label: 'Fewer bad hires', sub: 'Data-driven selection impact' },
          ].map((s, i) => (
            <div key={s.label} className={`text-center py-8 px-6 ${i < 2 ? 'sm:border-r border-white/[0.06]' : ''}`}>
              <div className="text-5xl font-black mb-2 text-gradient-stat animate-count-up">{s.value}</div>
              <div className="text-sm font-semibold text-white mb-1">{s.label}</div>
              <div className="text-xs text-slate-500">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────── */}
      <section className="relative bg-white overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-lines" />
        {/* Faint gradient top */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-slate-950/5 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-gradient-brand mb-3 block">
              Assessment Types
            </span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
              Three types of assessment,<br />one platform
            </h2>
            <p className="text-slate-500 max-w-sm mx-auto">
              Everything you need to evaluate candidates holistically
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="gradient-border group cursor-default">
                <div className={`p-[1px] rounded-[17px] bg-gradient-to-br ${f.border} opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0`} />
                <div className="bg-white rounded-2xl p-7 border border-slate-100 group-hover:border-transparent transition-colors duration-300 h-full">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-5 group-hover:${f.glow} transition-all duration-300 group-hover:scale-110`}>
                    <span className="text-xl">{f.icon}</span>
                  </div>
                  <div className={`text-xs font-bold uppercase tracking-widest ${f.accent} mb-2`}>{f.label}</div>
                  <h3 className="font-bold text-slate-900 mb-3 text-[15px]">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────── */}
      <section className="relative bg-slate-950 overflow-hidden">
        {/* Blobs */}
        <div className="absolute top-[-60px] left-[10%] w-80 h-80 bg-indigo-700/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-[-60px] right-[10%] w-72 h-72 bg-violet-700/20 rounded-full blur-3xl animate-blob-2" />
        <div className="absolute inset-0 bg-dot-grid" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-gradient-brand mb-3 block">
              How It Works
            </span>
            <h2 className="text-4xl font-black tracking-tight mb-4 text-white">
              Simple by design
            </h2>
            <p className="text-slate-400">Up and running in under 5 minutes</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden sm:block absolute top-7 left-[20%] right-[20%] h-px bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-fuchsia-500/30" />

            {steps.map((step, i) => (
              <div key={step.num} className="relative text-center animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                {/* Number circle */}
                <div className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 ${step.glow} animate-pulse-glow`}>
                  <span className="text-white font-black text-sm">{step.num}</span>
                </div>
                <h3 className="font-bold text-white mb-3 text-[15px]">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      </section>

      {/* ── CTA ────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 animate-gradient"
          style={{ background: 'linear-gradient(135deg, #312e81, #4c1d95, #6b21a8, #7c3aed, #4c1d95, #312e81)', backgroundSize: '400% 400%' }}
        />
        {/* Blobs inside */}
        <div className="absolute top-[-40px] left-[-40px] w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-[-40px] right-[-40px] w-72 h-72 bg-fuchsia-400/20 rounded-full blur-3xl animate-blob-3" />
        <div className="absolute inset-0 bg-dot-grid opacity-30" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-5">
            Ready to hire smarter?
          </h2>
          <p className="text-violet-200 mb-10 max-w-sm mx-auto text-lg leading-relaxed">
            Join hundreds of teams who use Nimbus to find the right candidates faster.
          </p>
          <Link
            href="/auth/signup"
            className="shimmer-btn inline-block bg-white text-violet-900 font-bold px-10 py-4 rounded-xl text-sm hover:scale-105 transition-all duration-300"
            style={{ boxShadow: '0 0 40px rgba(255,255,255,0.25)' }}
          >
            Create your first test — it&apos;s free
          </Link>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────── */}
      <footer className="bg-slate-950 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg logo-gradient" />
              <svg className="relative z-10" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L5 4L7 8L9 5.5L12 11H2Z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-white tracking-tight text-sm">Nimbus</span>
          </div>
          <p className="text-xs text-slate-600">© 2026 Nimbus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
