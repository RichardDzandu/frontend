import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const orderNumber = `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`

export default function OrderSuccess() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col items-center justify-center px-4 py-16">
      <div
        className={`bg-white rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-sm transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Success animation */}
        <div className="w-20 h-20 bg-[#34c759] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#34c759]/30">
          <span className="text-white text-4xl font-bold">✓</span>
        </div>

        <h1 className="font-serif text-3xl font-normal text-[#1d1d1f] mb-2">Order Placed!</h1>
        <p className="text-[#86868b] text-base mb-6">
          Thank you for your purchase. Your order is confirmed and being prepared for shipment.
        </p>

        <div className="bg-[#f5f5f7] rounded-2xl p-4 mb-6 text-left space-y-2.5">
          <div className="flex justify-between text-sm">
            <span className="text-[#86868b]">Order Number</span>
            <span className="font-bold text-[#1d1d1f] font-mono">{orderNumber}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#86868b]">Estimated Delivery</span>
            <span className="font-semibold text-[#1d1d1f]">Aug 3–5, 2026</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#86868b]">Status</span>
            <span className="text-[#34c759] font-semibold">Confirmed ✓</span>
          </div>
        </div>

        {/* Tracking steps */}
        <div className="flex items-center justify-between mb-6 px-2">
          {['Confirmed', 'Packed', 'Shipped', 'Delivered'].map((s, i) => (
            <div key={s} className="flex flex-col items-center gap-1 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                i === 0 ? 'bg-[#34c759] text-white' : 'bg-[#d2d2d7] text-[#86868b]'
              }`}>
                {i === 0 ? '✓' : i + 1}
              </div>
              <span className="text-[10px] text-[#86868b] font-medium">{s}</span>
              {i < 3 && <div className="absolute" />}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/dashboard?tab=orders')}
            className="w-full py-3 bg-[#0071e3] text-white font-semibold rounded-full hover:bg-[#0077ed] transition-colors"
          >
            Track My Order
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 border border-[#d2d2d7] text-[#1d1d1f] font-semibold rounded-full hover:bg-[#f5f5f7] transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}
