import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useCart } from '../store/CartContext'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { cartCount } = useCart()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const navLinks = [
    { label: 'Electronics', path: '/products?category=Electronics' },
    { label: 'Fashion', path: '/products?category=Fashion' },
    { label: 'Beauty', path: '/products?category=Beauty' },
    { label: 'Furniture', path: '/products?category=Furniture' },
    { label: 'Sports', path: '/products?category=Sports' },
    { label: 'Groceries', path: '/products?category=Groceries' },
    { label: 'Flash Deals', path: '/flash-deals' },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 glass border-b border-[#d2d2d7]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Top bar */}
          <div className="flex items-center justify-between h-14 md:h-16 gap-4">
            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 shrink-0"
            >
              <div className="w-8 h-8 bg-[#1d1d1f] rounded-xl flex items-center justify-center">
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <span className="font-bold text-[#1d1d1f] text-lg hidden sm:block">Store</span>
            </button>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.slice(0, 5).map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname + location.search === link.path
                      ? 'text-[#0071e3]'
                      : 'text-[#1d1d1f] hover:text-[#0071e3]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => navigate('/flash-deals')}
                className="text-sm font-semibold text-[#0071e3] hover:text-[#0077ed]"
              >
                ⚡ Flash Deals
              </button>
            </nav>

            {/* Desktop search */}
            <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b] text-sm">🔍</span>
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-9 pr-4 py-2 bg-[#f5f5f7] rounded-full text-sm text-[#1d1d1f] placeholder-[#86868b] border border-transparent focus:border-[#0071e3] focus:bg-white focus:outline-none transition-all"
                  />
                </div>
              </form>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Mobile search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#f5f5f7] transition-colors text-[#1d1d1f]"
              >
                🔍
              </button>

              {/* Wishlist */}
              <button
                onClick={() => navigate('/wishlist')}
                className="hidden sm:flex w-9 h-9 items-center justify-center rounded-xl hover:bg-[#f5f5f7] transition-colors text-[#1d1d1f] text-lg"
              >
                ♡
              </button>

              {/* Cart */}
              <button
                onClick={() => navigate('/cart')}
                className="relative flex items-center gap-2 bg-[#0071e3] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#0077ed] transition-colors"
              >
                <span>🛒</span>
                <span className="hidden sm:block">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#ff3b30] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              {/* Profile */}
              <button
                onClick={() => navigate('/dashboard')}
                className="hidden sm:flex w-9 h-9 items-center justify-center rounded-xl hover:bg-[#f5f5f7] transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#0071e3] flex items-center justify-center text-white text-xs font-bold">
                  J
                </div>
              </button>

              {/* Hamburger (mobile) */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#f5f5f7] transition-colors"
              >
                <div className="flex flex-col gap-1.5 w-4">
                  <span className={`block h-0.5 bg-[#1d1d1f] transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block h-0.5 bg-[#1d1d1f] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-0.5 bg-[#1d1d1f] transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-[#d2d2d7]/60 bg-white/95 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => { navigate(link.path); setMenuOpen(false) }}
                  className="text-left text-sm font-medium text-[#1d1d1f] py-2.5 px-3 rounded-xl hover:bg-[#f5f5f7] transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <hr className="border-[#d2d2d7]/60 my-1" />
              <button
                onClick={() => { navigate('/dashboard'); setMenuOpen(false) }}
                className="text-left text-sm font-medium text-[#1d1d1f] py-2.5 px-3 rounded-xl hover:bg-[#f5f5f7] transition-colors"
              >
                My Account
              </button>
              <button
                onClick={() => { navigate('/wishlist'); setMenuOpen(false) }}
                className="text-left text-sm font-medium text-[#1d1d1f] py-2.5 px-3 rounded-xl hover:bg-[#f5f5f7] transition-colors"
              >
                Wishlist
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
            <form onSubmit={handleSearch} className="flex items-center gap-3 p-4">
              <span className="text-xl">🔍</span>
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands..."
                className="flex-1 text-[#1d1d1f] placeholder-[#86868b] text-base outline-none"
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="text-[#86868b] text-lg px-2">
                ✕
              </button>
            </form>
            {searchQuery && (
              <div className="border-t border-[#d2d2d7]/60 p-3">
                <button
                  type="submit"
                  onClick={handleSearch}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#f5f5f7] text-sm text-[#0071e3] font-medium"
                >
                  Search for "{searchQuery}"
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
