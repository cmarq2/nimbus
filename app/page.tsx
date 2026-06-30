import Link from 'next/link'

const features = [
  {
    label: 'Behavioral',
    title: 'Behavioral Assessments',
    description:
      'Understand how candidates think, collaborate, and respond to real workplace situations through structured scenario-based questions.',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    icon: '🧠',
  },
  {
    label: 'Aptitude',
    title: 'Aptitude Tests',
    description:
      'Measure numerical reasoning, verbal ability, and cognitive performance with validated questions that predict on-the-job success.',
    bg: 'bg-violet-50',
    text: 'text-violet-600',
    icon: '📊',
  },
  {
    label: 'Logical',
    title: 'Logical Reasoning',
    description:
      'Evaluate analytical thinking, deductive reasoning, and pattern recognition — the core skills behind great problem-solvers.',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    icon: '🔬',
  },
]

const steps = [
  {
    title: 'Build your test',
    description:
      'Create a custom assessment with your own questions. Mix behavioral, aptitude, and logical types freely.',
  },
  {
    title: 'Invite candidates',
    description:
      'Share a unique link with your candidates. No accounts needed — they open the link and begin immediately.',
  },
  {
    title: 'Review results',
    description:
      'See scores, answers, and details the moment candidates finish. Compare all candidates in one place.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur-sm z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L5 4L7 8L9 5.5L12 11H2Z" fill="white" />
              </svg>
            </div>
            <span className="font-semibold text-slate-900 tracking-tight">Nimbus</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium"
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="text-sm bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-500 text-xs font-medium px-3 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          Trusted by 500+ hiring teams
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-6 max-w-3xl mx-auto">
          Hire confidently with<br className="hidden sm:block" /> science-backed tests
        </h1>
        <p className="text-lg text-slate-500 mb-10 max-w-lg mx-auto leading-relaxed">
          Send behavioral, aptitude, and logical assessments to candidates in seconds.
          Get objective data to make smarter hiring decisions.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/auth/signup"
            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors text-sm"
          >
            Start for free
          </Link>
          <Link
            href="/dashboard"
            className="border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors text-sm"
          >
            View demo
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-3 gap-8 text-center">
          {[
            { value: '2×', label: 'Faster hiring decisions' },
            { value: '93%', label: 'Candidate satisfaction' },
            { value: '40%', label: 'Fewer mis-hires' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-slate-900 mb-1">{s.value}</div>
              <div className="text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
            Three types of assessment, one platform
          </h2>
          <p className="text-slate-500">Everything you need to evaluate the whole candidate</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {features.map(f => (
            <div
              key={f.title}
              className="border border-slate-100 rounded-2xl p-6 hover:border-slate-200 hover:shadow-sm transition-all"
            >
              <div className={`w-10 h-10 ${f.bg} rounded-xl flex items-center justify-center mb-4`}>
                <span className="text-lg">{f.icon}</span>
              </div>
              <div className={`text-xs font-semibold uppercase tracking-wide ${f.text} mb-2`}>{f.label}</div>
              <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 border-y border-slate-100 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Simple by design</h2>
            <p className="text-slate-500">Up and running in under 5 minutes</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <div key={step.title}>
                <div className="w-9 h-9 bg-slate-900 text-white rounded-full flex items-center justify-center font-semibold text-sm mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">
          Ready to hire smarter?
        </h2>
        <p className="text-slate-500 mb-8 max-w-sm mx-auto">
          Join hundreds of teams who use Nimbus to find the right candidates faster.
        </p>
        <Link
          href="/auth/signup"
          className="inline-block bg-slate-900 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-slate-800 transition-colors text-sm"
        >
          Create your first test — it&apos;s free
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M2 11L5 4L7 8L9 5.5L12 11H2Z" fill="white" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-slate-900">Nimbus</span>
          </div>
          <p className="text-xs text-slate-400">© 2026 Nimbus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
