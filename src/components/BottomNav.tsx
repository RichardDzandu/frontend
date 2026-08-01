import { useNavigate, useLocation } from 'react-router'
import { useCart } from '../store/CartContext'

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { cartCount } = useCart()

  const tabs = [
    { icon: '⌂', label: 'Home', path: '/' },
    { icon: '◫', label: 'Products', path: '/products' },
    { icon: '🔍', label: 'Search', path: '/search' },
    { icon: '♡', label: 'Wishlist', path: '/wishlist' },
    { icon: '◎', label: 'Account', path: '/dashboard' },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-[#d2d2d7]/60 pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-1 min-w-[56px] py-1.5 rounded-xl transition-all ${
                active ? 'text-[#0071e3]' : 'text-[#86868b]'
              }`}
            >
              <span className="text-xl leading-none">{tab.icon}</span>
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Floating cart button */}
      {cartCount > 0 && (
        <button
          onClick={() => navigate('/cart')}
          className="absolute -top-14 right-4 w-12 h-12 bg-[#0071e3] text-white rounded-full shadow-xl flex items-center justify-center pulse-glow hover:bg-[#0077ed] active:scale-95 transition-all"
        >
          <span className="text-xl">🛒</span>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff3b30] text-white text-xs font-bold rounded-full flex items-center justify-center">
            {cartCount > 9 ? '9+' : cartCount}
          </span>
        </button>
      )}
    </nav>
  )
}
