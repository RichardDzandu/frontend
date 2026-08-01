import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useCart } from '../store/CartContext'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

export default function Cart() {
  const navigate = useNavigate()
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart()
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const discount = couponApplied ? Math.round(cartTotal * 0.1) : 0
  const shipping = cartTotal > 100 ? 0 : 9.99
  const tax = Math.round((cartTotal - discount) * 0.08 * 100) / 100
  const total = cartTotal - discount + shipping + tax

  const suggested = products.filter((p) => !cart.find((c) => c.product.id === p.id)).slice(0, 4)

  if (cartCount === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="text-7xl mb-6">🛒</div>
        <h1 className="font-serif text-3xl font-normal text-[#1d1d1f] mb-3">Your cart is empty</h1>
        <p className="text-[#86868b] text-base mb-8">
          Looks like you haven't added anything yet. Start shopping to fill it up!
        </p>
        <button
          onClick={() => navigate('/products')}
          className="px-8 py-3.5 bg-[#0071e3] text-white font-semibold rounded-full hover:bg-[#0077ed] transition-colors"
        >
          Browse Products
        </button>

        {/* Suggestions */}
        <div className="mt-16 text-left">
          <h2 className="font-serif text-2xl font-normal text-[#1d1d1f] mb-4">Recommended for you</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {suggested.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} variant="compact" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-serif text-3xl md:text-4xl font-normal text-[#1d1d1f] mb-8">
        Shopping Cart <span className="text-[#86868b] text-2xl font-sans font-normal">({cartCount})</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
              className="bg-white border border-[#d2d2d7]/50 rounded-2xl p-4 flex gap-4"
            >
              {/* Image */}
              <div
                className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-[#f5f5f7] cursor-pointer"
                onClick={() => navigate(`/product/${item.product.id}`)}
              >
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold text-[#86868b] mb-0.5">{item.product.brand}</p>
                    <h3
                      className="text-sm font-semibold text-[#1d1d1f] line-clamp-2 cursor-pointer hover:text-[#0071e3]"
                      onClick={() => navigate(`/product/${item.product.id}`)}
                    >
                      {item.product.name}
                    </h3>
                    {(item.selectedColor || item.selectedSize) && (
                      <p className="text-xs text-[#86868b] mt-0.5">
                        {[item.selectedColor, item.selectedSize].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-[#86868b] hover:text-[#ff3b30] transition-colors text-lg shrink-0 -mt-1"
                  >
                    ×
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  {/* Qty */}
                  <div className="inline-flex items-center border border-[#d2d2d7] rounded-full overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f5f7] transition-colors text-[#1d1d1f] font-medium"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-[#1d1d1f]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f5f7] transition-colors text-[#1d1d1f] font-medium"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-base font-bold text-[#1d1d1f]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-[#86868b]">${item.product.price} each</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#f5f5f7] rounded-3xl p-6 sticky top-24">
            <h2 className="text-lg font-bold text-[#1d1d1f] mb-5">Order Summary</h2>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-[#86868b]">Subtotal ({cartCount} items)</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#34c759]">Coupon discount (10%)</span>
                  <span className="font-medium text-[#34c759]">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-[#86868b]">Shipping</span>
                <span className={`font-medium ${shipping === 0 ? 'text-[#34c759]' : ''}`}>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#86868b]">Tax (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-[#d2d2d7] pt-4 mb-5">
              <div className="flex justify-between">
                <span className="font-bold text-[#1d1d1f]">Total</span>
                <span className="font-bold text-xl text-[#1d1d1f]">${total.toFixed(2)}</span>
              </div>
              {shipping === 0 && (
                <p className="text-xs text-[#34c759] mt-1">You saved $9.99 on shipping!</p>
              )}
            </div>

            {/* Coupon */}
            <div className="mb-5">
              <div className="flex gap-2">
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Coupon code"
                  className="flex-1 px-3 py-2.5 bg-white rounded-xl text-sm text-[#1d1d1f] border border-[#d2d2d7] focus:border-[#0071e3] focus:outline-none placeholder-[#86868b]"
                />
                <button
                  onClick={() => {
                    if (coupon.toLowerCase() === 'save10') setCouponApplied(true)
                  }}
                  className="px-4 py-2.5 bg-[#1d1d1f] text-white text-sm font-semibold rounded-xl hover:bg-[#2d2d2f] transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponApplied && <p className="text-xs text-[#34c759] mt-1.5">✓ Coupon applied!</p>}
              <p className="text-xs text-[#86868b] mt-1">Try "SAVE10" for 10% off</p>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-[#0071e3] text-white font-bold rounded-full hover:bg-[#0077ed] transition-colors shadow-lg shadow-[#0071e3]/30 mb-3"
            >
              Proceed to Checkout →
            </button>

            <div className="flex justify-center gap-3 mt-3">
              {['💳', '🅿', '◻', '◉'].map((icon, i) => (
                <span key={i} className="text-[#86868b] text-sm">{icon}</span>
              ))}
            </div>
            <p className="text-center text-xs text-[#86868b] mt-2">Secure checkout · 256-bit SSL</p>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      {suggested.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-normal text-[#1d1d1f] mb-4">Frequently Bought Together</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {suggested.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} variant="compact" />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
