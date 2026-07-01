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
    hoverCls: 'hover:border-blue-200',
  },
  {
    label: 'Aptitude',
    title: 'Aptitude Tests',
    description:
      'Measure numerical reasoning, verbal ability, and cognitive performance with validated, science-backed questions.',
    icon: '📊',
    iconBg: 'bg-violet-50',
    tag: 'bg-violet-50 text-violet-600 border-violet-100',
    hoverCls: 'hover:border-violet-200',
  },
  {
    label: 'Logical',
    title: 'Logical Reasoning',
    description:
      'Evaluate analytical thinking, pattern recognition, and deductive reasoning — the core skills of every top performer.',
    icon: '🔬',
    iconBg: 'bg-emerald-50',
    tag: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    hoverCls: 'hover:border-emerald-200',
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

const problems = [
  {
    icon: '🎭',
    title: 'Resumes don\'t predict performance',
    body: 'A polished CV shows career history, not cognitive ability or real-world problem-solving. You\'re making six-figure decisions based on bullet points.',
    bg: 'bg-red-50',
    border: 'border-red-100',
    tag: 'text-red-500',
  },
  {
    icon: '⚖️',
    title: 'Interviews are inconsistent',
    body: 'When different interviewers ask different questions, candidates aren\'t being compared fairly. Unconscious bias quietly shapes every hiring decision.',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    tag: 'text-amber-500',
  },
  {
    icon: '💸',
    title: 'Bad hires cost more than you think',
    body: 'The average cost of a mis-hire is 30% of their annual salary — lost productivity, team disruption, and starting over. It adds up fast.',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    tag: 'text-orange-500',
  },
]

const benefits = [
  {
    icon: '📊',
    title: 'Objective data, every time',
    body: 'Every candidate is measured against the same criteria. Remove subjectivity and give your team a fair, consistent way to compare talent — regardless of who\'s interviewing.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    icon: '⚡',
    title: 'Results in hours, not weeks',
    body: 'Candidates complete assessments in 15–30 minutes. Get scored results the same day. Move fast on top talent before your competitors do.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: '🎯',
    title: 'Surface hidden talent',
    body: 'Some of the best candidates look average on paper. Skill-based assessments reveal true potential and critical thinking ability that a resume never could.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: '🛡️',
    title: 'Reduce unconscious bias',
    body: 'Structured assessments evaluate candidates on what actually matters — skills and thinking ability — rather than background, presentation style, or personal rapport.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
]

const testimonials = [
  {
    quote: 'Nimbus helped us cut time-to-hire by 50%. We now have real data to back every single hiring decision we make.',
    name: 'Sarah M.',
    role: 'VP of People',
    company: 'Apex Technologies',
    initials: 'SM',
    grad: 'from-indigo-500 to-violet-500',
  },
  {
    quote: "We've hired 8 engineers through Nimbus over the past year. Every single one has outperformed our previous hires who went through traditional interviews.",
    name: 'James R.',
    role: 'CTO',
    company: 'Bolt Labs',
    initials: 'JR',
    grad: 'from-violet-500 to-fuchsia-500',
  },
  {
    quote: "As a small team we can't afford bad hires. Nimbus gives us the confidence to make the right call without wasting weeks on screening.",
    name: 'Priya K.',
    role: 'Founder',
    company: 'Luminary Studios',
    initials: 'PK',
    grad: 'from-fuchsia-500 to-pink-500',
  },
]

const faqs = [
  {
    q: 'How does a candidate take the test?',
    a: 'You share a unique link directly with your candidate. They click it, enter their name and email, and complete the assessment — no account, no download, no friction.',
  },
  {
    q: 'What types of questions are included?',
    a: 'Nimbus supports behavioral (open-ended scenario questions), aptitude (numerical and verbal reasoning), and logical reasoning (pattern recognition, deductive thinking). You can mix all three in one test.',
  },
  {
    q: 'How is scoring calculated?',
    a: 'Multiple-choice questions are scored automatically the moment a candidate submits. Open-ended answers appear in your dashboard for you to review alongside the quantitative scores.',
  },
  {
    q: 'Is there a free plan?',
    a: 'Yes — Nimbus is free to use for small hiring teams. Create unlimited tests, share with candidates, and review all results at no cost. No credit card required.',
  },
  {
    q: 'Can I customize the questions?',
    a: 'Absolutely. You write every question yourself so assessments are specific to your role and company. Add as many questions as you need, set a time limit, and publish when ready.',
  },
  {
    q: 'How long does it take candidates to complete?',
    a: 'Most assessments take 15–30 minutes depending on the number of questions. Candidates can complete them on any device, at any time — making it easy to reach busy applicants.',
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
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-500">
            <a href="#problem" className="hover:text-slate-900 transition-colors">Why Nimbus</a>
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-slate-900 transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium">
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="text-sm font-semibold text-white px-5 py-2.5 rounded-xl shadow-md shadow-indigo-500/20 hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #db2777 100%)' }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 min-h-screen flex items-center">
        {/* Background video */}
        <video
          src="/bubble.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 sm:py-32 text-center w-full">
          <div className="animate-fade-up inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm animate-float">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            <span className="text-xs font-semibold text-white/90 tracking-wide">
              Trusted by 500+ hiring teams worldwide
            </span>
          </div>

          <h1 className="animate-fade-up-1 text-5xl sm:text-[68px] font-black leading-[1.04] tracking-tight mb-6 text-white">
            Hire confidently with<br />
            <span className="text-gradient-hero">science-backed tests</span>
          </h1>

          <p className="animate-fade-up-2 text-xl text-white/75 mb-12 max-w-md mx-auto leading-relaxed">
            Send behavioral, aptitude, and logical assessments to candidates in seconds. Get objective data to make smarter hiring decisions.
          </p>

          <div className="animate-fade-up-3 flex items-center justify-center gap-4 mb-14">
            <Link
              href="/auth/signup"
              className="text-white font-bold px-8 py-4 rounded-xl text-sm shadow-xl shadow-black/30 hover:opacity-90 hover:scale-105 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #db2777 100%)' }}
            >
              Sign up →
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-bold text-white border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-8 py-4 rounded-xl transition-all"
            >
              View demo
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[
              { label: 'Behavioral', cls: 'border-blue-300/30 text-blue-200 bg-blue-500/10' },
              { label: 'Aptitude', cls: 'border-violet-300/30 text-violet-200 bg-violet-500/10' },
              { label: 'Logical Reasoning', cls: 'border-fuchsia-300/30 text-fuchsia-200 bg-fuchsia-500/10' },
            ].map(p => (
              <span key={p.label} className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border backdrop-blur-sm ${p.cls}`}>
                {p.label}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </section>

      {/* ── STATS ───────────────────────────────── */}
      <section className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-3">
          {[
            { value: '2×', label: 'Faster hiring decisions', sub: 'vs. traditional screening' },
            { value: '93%', label: 'Candidate satisfaction', sub: 'Average test-taker rating' },
            { value: '40%', label: 'Fewer bad hires', sub: 'Data-driven selection impact' },
          ].map((s, i) => (
            <div key={s.label} className={`text-center py-10 px-6 ${i < 2 ? 'sm:border-r border-slate-200' : ''}`}>
              <div className="text-5xl font-black mb-2 text-gradient-stat animate-count-up">{s.value}</div>
              <div className="text-sm font-bold text-slate-800 mb-0.5">{s.label}</div>
              <div className="text-xs text-slate-400">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE PROBLEM ─────────────────────────── */}
      <section id="problem" className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-gradient mb-4 block">
              The Problem
            </span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
              Traditional hiring misses<br />great candidates
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
              Most employers make expensive decisions based on incomplete data. Resumes and gut-feel interviews are unreliable — and the results show.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {problems.map(p => (
              <div key={p.title} className={`${p.bg} border ${p.border} rounded-2xl p-7`}>
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="font-black text-slate-900 mb-3 text-[15px] leading-snug">{p.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>

          {/* Bridge sentence */}
          <div className="mt-14 text-center">
            <p className="text-lg font-semibold text-slate-700 max-w-xl mx-auto leading-relaxed">
              There&apos;s a smarter way to identify top talent —{' '}
              <span className="text-gradient">one that relies on data, not intuition.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY NIMBUS WORKS ────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-gradient mb-4 block">
              Why It Works
            </span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
              Built for employers who care<br />about outcomes
            </h2>
            <p className="text-slate-500 max-w-md mx-auto">
              Nimbus replaces guesswork with structured, repeatable evaluation — so every hire is backed by evidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map(b => (
              <div
                key={b.title}
                className="group bg-white border border-slate-200 rounded-2xl p-8 card-shadow card-shadow-hover"
              >
                <div className={`w-12 h-12 ${b.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-xl">{b.icon}</span>
                </div>
                <h3 className={`font-black text-slate-900 mb-3 text-lg`}>{b.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────── */}
      <section id="features" className="relative bg-white overflow-hidden">
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
              Mix and match to build assessments that match the exact role you&apos;re hiring for.
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
            <p className="text-slate-400">Up and running in under 5 minutes. No technical setup required.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 relative">
            <div className="hidden sm:block absolute top-5 left-[22%] right-[22%] h-px bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-fuchsia-500/30" />
            {steps.map((step, i) => (
              <div key={step.num} className="text-center animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 ${step.glow} animate-float`}
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
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

      {/* ── TESTIMONIALS ────────────────────────── */}
      <section id="testimonials" className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-gradient mb-4 block">
              What Employers Say
            </span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
              Trusted by teams of every size
            </h2>
            <p className="text-slate-500 max-w-sm mx-auto">
              From startups to scale-ups, employers use Nimbus to hire smarter every day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white border border-slate-200 rounded-2xl p-7 card-shadow flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed flex-1 mb-6">&ldquo;{t.quote}&rdquo;</p>

                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${t.grad} flex items-center justify-center text-xs font-black text-white flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ──────────────────────────── */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-gradient mb-4 block">
              The Difference
            </span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
              Nimbus vs. traditional hiring
            </h2>
            <p className="text-slate-500 max-w-md mx-auto">
              See exactly what changes when you bring objective assessments into your hiring process.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Without Nimbus — dark slate */}
            <div className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-dot-grid-dark pointer-events-none opacity-60" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
                    <svg width="15" height="15" fill="none" stroke="#94a3b8" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="font-black text-white text-xl">Without Nimbus</span>
                </div>
                <ul className="space-y-5">
                  {[
                    'Weeks spent manually screening resumes',
                    'Inconsistent interviews with no shared criteria',
                    'Hiring decisions driven by gut feel and bias',
                    'No insight into how a candidate actually thinks',
                    'Expensive mis-hires that take months to fix',
                    'Hard to compare candidates after interviews',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 text-base text-slate-400">
                      <span className="text-slate-600 mt-0.5 flex-shrink-0 font-bold">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* With Nimbus — brand gradient */}
            <div className="rounded-3xl p-8 relative overflow-hidden"
              style={{ background: 'linear-gradient(145deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)' }}
            >
              <div className="absolute inset-0 bg-dot-grid-dark pointer-events-none opacity-20" />
              {/* Soft glow orb */}
              <div className="absolute top-[-40px] right-[-40px] w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg width="15" height="15" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-black text-white text-xl">With Nimbus</span>
                </div>
                <ul className="space-y-5">
                  {[
                    'Candidates screened same-day with a shareable link',
                    'Every candidate evaluated on the exact same criteria',
                    'Objective scores that back every decision with data',
                    'Full behavioral and cognitive insight for each applicant',
                    '40% fewer mis-hires thanks to skill-based selection',
                    'Side-by-side results dashboard for easy comparison',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 text-base text-white/90">
                      <span className="text-white mt-0.5 flex-shrink-0 font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────── */}
      <section id="faq" className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-gradient mb-4 block">
              FAQ
            </span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
              Common questions
            </h2>
            <p className="text-slate-500">Everything you need to know before getting started.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {faqs.map(f => (
              <div key={f.q} className="bg-white border border-slate-200 rounded-2xl p-6 card-shadow">
                <h3 className="font-black text-slate-900 mb-2 text-[15px] leading-snug">{f.q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
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
            Join hundreds of teams using Nimbus to find the right candidates faster — with data they can trust.
          </p>
          <Link
            href="/auth/signup"
            className="inline-block text-white font-bold px-10 py-4 rounded-xl text-sm shadow-xl shadow-indigo-500/25 hover:opacity-90 hover:scale-105 transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #db2777 100%)' }}
          >
            Create your first test — it&apos;s free
          </Link>
          <p className="text-xs text-slate-400 mt-4">No credit card required · Free forever for small teams</p>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────── */}
      <footer className="bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg logo-gradient" />
              <svg className="relative z-10" width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L5 4L7 8L9 5.5L12 11H2Z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-slate-900 tracking-tight text-sm">Nimbus</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="#problem" className="hover:text-slate-600 transition-colors">Why Nimbus</a>
            <a href="#features" className="hover:text-slate-600 transition-colors">Features</a>
            <a href="#faq" className="hover:text-slate-600 transition-colors">FAQ</a>
            <Link href="/auth/signup" className="hover:text-slate-600 transition-colors">Sign up</Link>
          </div>
          <p className="text-xs text-slate-400">© 2026 Nimbus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
