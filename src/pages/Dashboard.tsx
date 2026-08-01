import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { products } from '../data/products'
import { useCart } from '../store/CartContext'

const mockOrders = [
  {
    id: 'ORD-AB3X21',
    date: 'July 28, 2026',
    status: 'Delivered',
    statusColor: 'text-[#34c759]',
    items: [products[0], products[2]],
    total: 2748,
  },
  {
    id: 'ORD-CK9P45',
    date: 'July 12, 2026',
    status: 'In Transit',
    statusColor: 'text-[#0071e3]',
    items: [products[7]],
    total: 135,
  },
  {
    id: 'ORD-LM7Q88',
    date: 'June 30, 2026',
    status: 'Delivered',
    statusColor: 'text-[#34c759]',
    items: [products[3], products[4]],
    total: 123,
  },
]

const tabs = [
  { id: 'overview', label: 'Overview', icon: '⌂' },
  { id: 'orders', label: 'Orders', icon: '📦' },
  { id: 'wishlist', label: 'Wishlist', icon: '♡' },
  { id: 'profile', label: 'Profile', icon: '◎' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { wishlist } = useCart()

  const activeTab = searchParams.get('tab') || 'overview'
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id))

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-full bg-[#0071e3] flex items-center justify-center text-white text-xl font-bold">
          J
        </div>
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-normal text-[#1d1d1f]">John Doe</h1>
          <p className="text-[#86868b] text-sm">john.doe@example.com · Member since 2024</p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col gap-1 w-48 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSearchParams(tab.id === 'overview' ? {} : { tab: tab.id })}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors text-left ${
                activeTab === tab.id
                  ? 'bg-[#0071e3] text-white'
                  : 'text-[#1d1d1f] hover:bg-[#f5f5f7]'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[#ff3b30] hover:bg-[#fff1f0] mt-4"
          >
            <span>↩</span> Sign Out
          </button>
        </aside>

        {/* Mobile tabs */}
        <div className="md:hidden w-full mb-4 flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSearchParams(tab.id === 'overview' ? {} : { tab: tab.id })}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#1d1d1f] text-white border-[#1d1d1f]'
                  : 'text-[#1d1d1f] border-[#d2d2d7]'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Total Orders', value: '12', icon: '📦' },
                  { label: 'Wishlist', value: `${wishlist.length}`, icon: '♡' },
                  { label: 'Reviews', value: '8', icon: '★' },
                  { label: 'Saved', value: '$284', icon: '💰' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#f5f5f7] rounded-2xl p-4 text-center">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-2xl font-bold text-[#1d1d1f]">{stat.value}</div>
                    <div className="text-xs text-[#86868b] mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent orders */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-semibold text-[#1d1d1f]">Recent Orders</h2>
                  <button onClick={() => setSearchParams({ tab: 'orders' })} className="text-sm text-[#0071e3]">
                    View all →
                  </button>
                </div>
                <div className="space-y-3">
                  {mockOrders.slice(0, 2).map((order) => (
                    <div key={order.id} className="bg-white border border-[#d2d2d7]/50 rounded-2xl p-4 flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 2).map((item) => (
                          <div key={item.id} className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white bg-[#f5f5f7]">
                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#1d1d1f] font-mono">{order.id}</p>
                        <p className="text-xs text-[#86868b]">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#1d1d1f]">${order.total}</p>
                        <p className={`text-xs font-semibold ${order.statusColor}`}>{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Saved Addresses', icon: '📍', path: '#' },
                  { label: 'Payment Methods', icon: '💳', path: '#' },
                  { label: 'My Coupons', icon: '🎫', path: '#' },
                  { label: 'Returns', icon: '↩', path: '#' },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 bg-[#f5f5f7] hover:bg-[#e8e8ed] rounded-2xl p-4 transition-colors text-left"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm font-semibold text-[#1d1d1f]">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-normal text-[#1d1d1f]">Order History</h2>
              {mockOrders.map((order) => (
                <div key={order.id} className="bg-white border border-[#d2d2d7]/50 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-bold text-[#1d1d1f] font-mono">{order.id}</p>
                      <p className="text-xs text-[#86868b]">{order.date}</p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      order.status === 'Delivered'
                        ? 'bg-[#34c759]/10 text-[#34c759]'
                        : 'bg-[#0071e3]/10 text-[#0071e3]'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 bg-[#f5f5f7] rounded-xl p-2 shrink-0 cursor-pointer hover:bg-[#e8e8ed]"
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden">
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <p className="text-xs font-medium text-[#1d1d1f] max-w-[100px] line-clamp-2">{item.name}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#d2d2d7]/60">
                    <span className="text-sm font-bold text-[#1d1d1f]">Total: ${order.total}</span>
                    <button className="text-xs font-semibold text-[#0071e3] bg-[#0071e3]/10 px-3 py-1.5 rounded-full hover:bg-[#0071e3]/20">
                      Track Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Wishlist */}
          {activeTab === 'wishlist' && (
            <div>
              <h2 className="font-serif text-2xl font-normal text-[#1d1d1f] mb-4">Wishlist ({wishlist.length})</h2>
              {wishlistProducts.length === 0 ? (
                <div className="text-center py-16">
                  <span className="text-5xl">♡</span>
                  <p className="text-[#86868b] text-base mt-4">Your wishlist is empty</p>
                  <button
                    onClick={() => navigate('/products')}
                    className="mt-4 text-[#0071e3] font-semibold text-sm"
                  >
                    Browse Products →
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {wishlistProducts.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white border border-[#d2d2d7]/50 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => navigate(`/product/${p.id}`)}
                    >
                      <div className="aspect-square bg-[#f5f5f7]">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-[#86868b]">{p.brand}</p>
                        <p className="text-sm font-semibold text-[#1d1d1f] line-clamp-1">{p.name}</p>
                        <p className="text-sm font-bold mt-1">${p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Profile */}
          {activeTab === 'profile' && (
            <div className="max-w-md space-y-5">
              <h2 className="font-serif text-2xl font-normal text-[#1d1d1f]">Profile Settings</h2>

              <div className="flex items-center gap-4 bg-[#f5f5f7] rounded-2xl p-5">
                <div className="w-16 h-16 rounded-full bg-[#0071e3] flex items-center justify-center text-white text-2xl font-bold">
                  J
                </div>
                <div>
                  <p className="font-bold text-[#1d1d1f]">John Doe</p>
                  <button className="text-sm text-[#0071e3] font-medium mt-0.5">Change photo</button>
                </div>
              </div>

              {[
                { label: 'First Name', value: 'John' },
                { label: 'Last Name', value: 'Doe' },
                { label: 'Email', value: 'john.doe@example.com', type: 'email' },
                { label: 'Phone', value: '+1 (555) 012-3456', type: 'tel' },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-xs font-semibold text-[#86868b] uppercase tracking-wide mb-1.5">
                    {field.label}
                  </label>
                  <input
                    type={field.type || 'text'}
                    defaultValue={field.value}
                    className="w-full px-4 py-3 border border-[#d2d2d7] rounded-xl text-sm text-[#1d1d1f] focus:border-[#0071e3] focus:outline-none"
                  />
                </div>
              ))}

              <button className="w-full py-3 bg-[#0071e3] text-white font-semibold rounded-full hover:bg-[#0077ed] transition-colors">
                Save Changes
              </button>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div className="max-w-md space-y-4">
              <h2 className="font-serif text-2xl font-normal text-[#1d1d1f]">Security Settings</h2>

              {[
                { label: 'Change Password', desc: 'Update your account password', icon: '🔑' },
                { label: 'Two-Factor Auth', desc: 'Add extra security to your account', icon: '🛡' },
                { label: 'Active Sessions', desc: 'Manage where you\'re signed in', icon: '📱' },
                { label: 'Notifications', desc: 'Control email and push notifications', icon: '🔔' },
                { label: 'Data & Privacy', desc: 'Manage your data and privacy preferences', icon: '🔒' },
              ].map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-4 bg-[#f5f5f7] hover:bg-[#e8e8ed] rounded-2xl p-4 transition-colors text-left"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#1d1d1f]">{item.label}</p>
                    <p className="text-xs text-[#86868b]">{item.desc}</p>
                  </div>
                  <span className="text-[#86868b]">›</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
