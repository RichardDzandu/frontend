import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useCart } from '../store/CartContext'

const steps = ['Shipping', 'Delivery', 'Payment', 'Review']

const deliveryOptions = [
  { id: 'standard', label: 'Standard Delivery', desc: '3-5 business days', price: 0, icon: '📦' },
  { id: 'express', label: 'Express Delivery', desc: '1-2 business days', price: 9.99, icon: '⚡' },
  { id: 'same-day', label: 'Same-Day Delivery', desc: 'Delivered today by 9pm', price: 19.99, icon: '🚀' },
]

const paymentMethods = [
  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { id: 'paypal', label: 'PayPal', icon: '🅿' },
  { id: 'apple-pay', label: 'Apple Pay', icon: '' },
  { id: 'google-pay', label: 'Google Pay', icon: '◉' },
  { id: 'mobile-money', label: 'Mobile Money', icon: '📱' },
]

export default function Checkout() {
  const navigate = useNavigate()
  const { cart, cartTotal, clearCart } = useCart()
  const [step, setStep] = useState(0)

  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'United States',
  })
  const [delivery, setDelivery] = useState('standard')
  const [payment, setPayment] = useState('card')
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' })

  const deliveryFee = deliveryOptions.find((d) => d.id === delivery)?.price || 0
  const tax = Math.round(cartTotal * 0.08 * 100) / 100
  const total = cartTotal + deliveryFee + tax

  const handlePlaceOrder = () => {
    clearCart()
    navigate('/order-success')
  }

  const canNext = () => {
    if (step === 0) return shipping.firstName && shipping.email && shipping.address && shipping.city
    if (step === 1) return true
    if (step === 2) return true
    return true
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <header className="glass border-b border-[#d2d2d7]/60 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1d1d1f] rounded-xl flex items-center justify-center">
              <span className="text-white text-sm font-bold">S</span>
            </div>
            <span className="font-bold text-[#1d1d1f]">Store</span>
          </button>
          <span className="text-sm font-semibold text-[#86868b]">Secure Checkout</span>
          <span className="text-[#86868b] text-sm">🔒</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    i < step
                      ? 'bg-[#34c759] text-white'
                      : i === step
                      ? 'bg-[#0071e3] text-white'
                      : 'bg-[#d2d2d7] text-[#86868b]'
                  }`}
                >
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`text-xs mt-1 font-medium hidden sm:block ${i === step ? 'text-[#0071e3]' : 'text-[#86868b]'}`}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-16 sm:w-24 h-0.5 mx-2 transition-colors ${i < step ? 'bg-[#34c759]' : 'bg-[#d2d2d7]'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main form */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm">
            {/* Step 0: Shipping */}
            {step === 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#1d1d1f] mb-5">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: 'firstName', label: 'First Name', placeholder: 'John', col: 1 },
                    { key: 'lastName', label: 'Last Name', placeholder: 'Doe', col: 1 },
                    { key: 'email', label: 'Email', placeholder: 'john@example.com', col: 2, type: 'email' },
                    { key: 'phone', label: 'Phone', placeholder: '+1 (555) 000-0000', col: 1, type: 'tel' },
                    { key: 'address', label: 'Street Address', placeholder: '123 Main Street', col: 2 },
                    { key: 'city', label: 'City', placeholder: 'New York', col: 1 },
                    { key: 'state', label: 'State', placeholder: 'NY', col: 1 },
                    { key: 'zip', label: 'ZIP Code', placeholder: '10001', col: 1 },
                  ].map((field) => (
                    <div key={field.key} className={field.col === 2 ? 'col-span-2' : ''}>
                      <label className="block text-xs font-semibold text-[#86868b] mb-1.5 uppercase tracking-wide">
                        {field.label}
                      </label>
                      <input
                        type={field.type || 'text'}
                        placeholder={field.placeholder}
                        value={(shipping as any)[field.key]}
                        onChange={(e) => setShipping((s) => ({ ...s, [field.key]: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-[#d2d2d7] rounded-xl text-sm text-[#1d1d1f] placeholder-[#86868b] focus:border-[#0071e3] focus:outline-none transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Delivery */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-[#1d1d1f] mb-5">Delivery Method</h2>
                <div className="space-y-3">
                  {deliveryOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setDelivery(opt.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                        delivery === opt.id
                          ? 'border-[#0071e3] bg-[#0071e3]/5'
                          : 'border-[#d2d2d7] hover:border-[#1d1d1f]'
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-[#1d1d1f]">{opt.label}</p>
                        <p className="text-xs text-[#86868b]">{opt.desc}</p>
                      </div>
                      <span className={`text-sm font-bold ${opt.price === 0 ? 'text-[#34c759]' : 'text-[#1d1d1f]'}`}>
                        {opt.price === 0 ? 'Free' : `$${opt.price.toFixed(2)}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold text-[#1d1d1f] mb-5">Payment Method</h2>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {paymentMethods.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setPayment(m.id)}
                      className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-left ${
                        payment === m.id
                          ? 'border-[#0071e3] bg-[#0071e3]/5'
                          : 'border-[#d2d2d7] hover:border-[#1d1d1f]'
                      }`}
                    >
                      <span>{m.icon}</span>
                      <span className="text-xs font-semibold text-[#1d1d1f]">{m.label}</span>
                    </button>
                  ))}
                </div>

                {payment === 'card' && (
                  <div className="space-y-4 bg-[#f5f5f7] rounded-2xl p-4">
                    <h3 className="text-sm font-semibold text-[#1d1d1f]">Card Details</h3>
                    <div>
                      <label className="block text-xs font-semibold text-[#86868b] mb-1.5 uppercase tracking-wide">Card Number</label>
                      <input
                        placeholder="1234 5678 9012 3456"
                        value={card.number}
                        onChange={(e) => setCard((c) => ({ ...c, number: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-[#d2d2d7] rounded-xl text-sm bg-white focus:border-[#0071e3] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#86868b] mb-1.5 uppercase tracking-wide">Cardholder Name</label>
                      <input
                        placeholder="John Doe"
                        value={card.name}
                        onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-[#d2d2d7] rounded-xl text-sm bg-white focus:border-[#0071e3] focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#86868b] mb-1.5 uppercase tracking-wide">Expiry Date</label>
                        <input
                          placeholder="MM/YY"
                          value={card.expiry}
                          onChange={(e) => setCard((c) => ({ ...c, expiry: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-[#d2d2d7] rounded-xl text-sm bg-white focus:border-[#0071e3] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#86868b] mb-1.5 uppercase tracking-wide">CVV</label>
                        <input
                          placeholder="123"
                          type="password"
                          maxLength={4}
                          value={card.cvv}
                          onChange={(e) => setCard((c) => ({ ...c, cvv: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-[#d2d2d7] rounded-xl text-sm bg-white focus:border-[#0071e3] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold text-[#1d1d1f] mb-5">Order Review</h2>

                {/* Items */}
                <div className="space-y-3 mb-5">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-3 items-center bg-[#f5f5f7] rounded-2xl p-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#1d1d1f] line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-[#86868b]">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Shipping review */}
                <div className="bg-[#f5f5f7] rounded-2xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#86868b]">Ship to</span>
                    <span className="font-medium">{shipping.address || '—'}, {shipping.city || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#86868b]">Delivery</span>
                    <span className="font-medium">{deliveryOptions.find((d) => d.id === delivery)?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#86868b]">Payment</span>
                    <span className="font-medium">{paymentMethods.find((m) => m.id === payment)?.label}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="px-6 py-3 border border-[#d2d2d7] rounded-full text-sm font-semibold text-[#1d1d1f] hover:border-[#1d1d1f] transition-colors"
                >
                  ← Back
                </button>
              )}
              {step < steps.length - 1 ? (
                <button
                  onClick={() => canNext() && setStep((s) => s + 1)}
                  disabled={!canNext()}
                  className="flex-1 py-3 bg-[#0071e3] text-white font-bold rounded-full hover:bg-[#0077ed] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 py-3 bg-[#34c759] text-white font-bold rounded-full hover:bg-[#30b854] transition-colors shadow-lg shadow-[#34c759]/30"
                >
                  Place Order · ${total.toFixed(2)}
                </button>
              )}
            </div>
          </div>

          {/* Summary sidebar */}
          <div className="bg-white rounded-3xl p-5 shadow-sm h-fit sticky top-24">
            <h3 className="text-sm font-bold text-[#1d1d1f] mb-4">Order Summary</h3>
            <div className="space-y-2.5 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-[#86868b]">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#86868b]">Delivery</span>
                <span className={deliveryFee === 0 ? 'text-[#34c759]' : ''}>
                  {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#86868b]">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="border-t border-[#d2d2d7] pt-3 flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold text-lg">${total.toFixed(2)}</span>
            </div>

            {/* Cart items preview */}
            <div className="mt-5 space-y-2">
              {cart.slice(0, 3).map((item) => (
                <div key={item.product.id} className="flex gap-2 items-center">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#f5f5f7] shrink-0">
                    <img src={item.product.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#1d1d1f] line-clamp-1">{item.product.name}</p>
                    <p className="text-xs text-[#86868b]">×{item.quantity}</p>
                  </div>
                </div>
              ))}
              {cart.length > 3 && (
                <p className="text-xs text-[#86868b] text-center">+{cart.length - 3} more items</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
