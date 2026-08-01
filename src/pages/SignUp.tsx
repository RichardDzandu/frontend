import { useState } from 'react'
import { useNavigate } from 'react-router'

export default function SignUp() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 1400)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[#1d1d1f] rounded-2xl flex items-center justify-center mb-3">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="font-serif text-3xl font-normal text-[#1d1d1f]">Create account</h1>
          <p className="text-[#86868b] text-sm mt-1">Join millions of happy shoppers</p>
        </div>

        <div className="bg-white rounded-3xl p-7 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#86868b] uppercase tracking-wide mb-1.5">First Name</label>
                <input
                  placeholder="John"
                  value={form.firstName}
                  onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                  className="w-full px-4 py-3 border border-[#d2d2d7] rounded-xl text-sm text-[#1d1d1f] placeholder-[#86868b] focus:border-[#0071e3] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#86868b] uppercase tracking-wide mb-1.5">Last Name</label>
                <input
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                  className="w-full px-4 py-3 border border-[#d2d2d7] rounded-xl text-sm text-[#1d1d1f] placeholder-[#86868b] focus:border-[#0071e3] focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#86868b] uppercase tracking-wide mb-1.5">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full px-4 py-3 border border-[#d2d2d7] rounded-xl text-sm text-[#1d1d1f] placeholder-[#86868b] focus:border-[#0071e3] focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#86868b] uppercase tracking-wide mb-1.5">Password</label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="w-full px-4 py-3 border border-[#d2d2d7] rounded-xl text-sm text-[#1d1d1f] placeholder-[#86868b] focus:border-[#0071e3] focus:outline-none"
                minLength={8}
                required
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 accent-[#0071e3]"
              />
              <span className="text-xs text-[#86868b] leading-relaxed">
                I agree to the{' '}
                <button type="button" className="text-[#0071e3] underline">Terms of Service</button>
                {' '}and{' '}
                <button type="button" className="text-[#0071e3] underline">Privacy Policy</button>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !agreed}
              className="w-full py-3.5 bg-[#0071e3] text-white font-bold rounded-full hover:bg-[#0077ed] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-[#86868b] mt-5">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-[#0071e3] font-semibold">
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}
