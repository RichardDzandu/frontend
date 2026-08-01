import { useState } from 'react'
import { useNavigate } from 'react-router'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-[#1d1d1f] rounded-2xl flex items-center justify-center mb-3">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="font-serif text-3xl font-normal text-[#1d1d1f]">Welcome back</h1>
          <p className="text-[#86868b] text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-7 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#86868b] uppercase tracking-wide mb-1.5">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full px-4 py-3 border border-[#d2d2d7] rounded-xl text-sm text-[#1d1d1f] placeholder-[#86868b] focus:border-[#0071e3] focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-[#86868b] uppercase tracking-wide">Password</label>
                <button type="button" onClick={() => navigate('/forgot-password')} className="text-xs text-[#0071e3] font-medium">
                  Forgot?
                </button>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="w-full px-4 py-3 border border-[#d2d2d7] rounded-xl text-sm text-[#1d1d1f] placeholder-[#86868b] focus:border-[#0071e3] focus:outline-none transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#0071e3] text-white font-bold rounded-full hover:bg-[#0077ed] disabled:opacity-70 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : 'Sign In'}
            </button>
          </form>

          <div className="relative my-5">
            <div className="border-t border-[#d2d2d7]" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-[#86868b]">or continue with</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[{ icon: '◉', label: 'Google' }, { icon: '', label: 'Apple' }].map((m) => (
              <button
                key={m.label}
                className="flex items-center justify-center gap-2 py-2.5 border border-[#d2d2d7] rounded-xl text-sm font-semibold text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors"
              >
                <span>{m.icon}</span> {m.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-[#86868b] mt-5">
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup')} className="text-[#0071e3] font-semibold">
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}
