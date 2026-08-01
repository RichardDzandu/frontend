import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { getProductById, products } from '../data/products'
import { useCart } from '../store/CartContext'
import ProductCard from '../components/ProductCard'
import { StarRating } from '../components/ProductCard'

const mockReviews = [
  { name: 'Alex T.', rating: 5, date: 'June 15, 2026', text: 'Absolutely outstanding quality. Exceeded every expectation. Fast shipping, great packaging.', avatar: 'A' },
  { name: 'Maria L.', rating: 5, date: 'June 8, 2026', text: 'Best purchase I\'ve made this year. The build quality is superb and it performs flawlessly.', avatar: 'M' },
  { name: 'Daniel K.', rating: 4, date: 'May 29, 2026', text: 'Great product overall. Minor nitpick with setup but customer service resolved it quickly. Would buy again.', avatar: 'D' },
]

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, toggleWishlist, isInWishlist } = useCart()

  const product = getProductById(Number(id))

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '')
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description')
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <span className="text-5xl mb-4">😕</span>
        <h2 className="text-xl font-semibold text-[#1d1d1f] mb-2">Product not found</h2>
        <button onClick={() => navigate('/products')} className="mt-4 text-[#0071e3] font-semibold">
          Browse Products →
        </button>
      </div>
    )
  }

  const inWishlist = isInWishlist(product.id)
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#86868b] mb-6">
        <button onClick={() => navigate('/')} className="hover:text-[#1d1d1f]">Home</button>
        <span>/</span>
        <button onClick={() => navigate(`/products?category=${product.category}`)} className="hover:text-[#1d1d1f]">
          {product.category}
        </button>
        <span>/</span>
        <span className="text-[#1d1d1f] font-medium line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Image Gallery */}
        <div className="space-y-3">
          {/* Main image */}
          <div className="relative aspect-square bg-[#f5f5f7] rounded-3xl overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discount > 0 && (
              <div className="absolute top-4 left-4 bg-[#0071e3] text-white text-sm font-bold px-3 py-1.5 rounded-full">
                -{product.discount}%
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? 'border-[#0071e3]' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-2">
            <span className="text-sm font-semibold text-[#0071e3] uppercase tracking-wide">{product.brand}</span>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`text-2xl hover:scale-110 transition-transform ${inWishlist ? 'text-red-500' : 'text-[#86868b]'}`}
            >
              {inWishlist ? '♥' : '♡'}
            </button>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-normal text-[#1d1d1f] mb-3 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <StarRating rating={product.rating} />
            <span className="text-sm font-semibold text-[#1d1d1f]">{product.rating}</span>
            <span className="text-sm text-[#86868b]">({product.reviews.toLocaleString()} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold text-[#1d1d1f]">${product.price}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-xl text-[#86868b] line-through">${product.originalPrice}</span>
                <span className="text-sm font-semibold text-[#34c759]">
                  Save ${product.originalPrice - product.price}
                </span>
              </>
            )}
          </div>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="mb-5">
              <p className="text-sm font-semibold text-[#1d1d1f] mb-2">
                Color: <span className="font-normal text-[#86868b]">{selectedColor}</span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-full text-sm border transition-all ${
                      selectedColor === color
                        ? 'border-[#0071e3] bg-[#0071e3]/10 text-[#0071e3] font-semibold'
                        : 'border-[#d2d2d7] text-[#1d1d1f] hover:border-[#1d1d1f]'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes.length > 0 && (
            <div className="mb-5">
              <p className="text-sm font-semibold text-[#1d1d1f] mb-2">Size: <span className="font-normal text-[#86868b]">{selectedSize}</span></p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl text-sm border transition-all ${
                      selectedSize === size
                        ? 'border-[#0071e3] bg-[#0071e3]/10 text-[#0071e3] font-semibold'
                        : 'border-[#d2d2d7] text-[#1d1d1f] hover:border-[#1d1d1f]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-[#1d1d1f] mb-2">Quantity</p>
            <div className="inline-flex items-center border border-[#d2d2d7] rounded-full overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors text-lg font-medium"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-semibold text-[#1d1d1f]">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors text-lg font-medium"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3.5 rounded-full font-semibold text-sm transition-all ${
                addedToCart
                  ? 'bg-[#34c759] text-white'
                  : 'bg-[#0071e3] text-white hover:bg-[#0077ed] shadow-lg shadow-[#0071e3]/30'
              }`}
            >
              {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <button
              onClick={() => { handleAddToCart(); navigate('/cart') }}
              className="flex-1 py-3.5 rounded-full font-semibold text-sm bg-[#1d1d1f] text-white hover:bg-[#2d2d2f] transition-colors"
            >
              Buy Now
            </button>
          </div>

          {/* Delivery & warranty info */}
          <div className="flex flex-col gap-2 bg-[#f5f5f7] rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-lg">🚚</span>
              <div>
                <p className="text-sm font-semibold text-[#1d1d1f]">Free delivery in {product.deliveryDays} {product.deliveryDays === 1 ? 'day' : 'days'}</p>
                <p className="text-xs text-[#86868b]">Order before 2pm for same-day dispatch</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">🛡</span>
              <div>
                <p className="text-sm font-semibold text-[#1d1d1f]">{product.warranty}</p>
                <p className="text-xs text-[#86868b]">Covered against manufacturing defects</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">↩</span>
              <div>
                <p className="text-sm font-semibold text-[#1d1d1f]">30-day free returns</p>
                <p className="text-xs text-[#86868b]">No questions asked return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-12">
        <div className="flex border-b border-[#d2d2d7] mb-6">
          {(['description', 'specs', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-[#0071e3] text-[#0071e3]'
                  : 'border-transparent text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              {tab === 'reviews' ? `Reviews (${mockReviews.length})` : tab}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div className="max-w-2xl">
            <p className="text-[#1d1d1f] leading-relaxed text-base">{product.description}</p>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="max-w-lg">
            <dl className="space-y-0 rounded-2xl overflow-hidden border border-[#d2d2d7]/60">
              {Object.entries(product.specs).map(([key, val], i) => (
                <div
                  key={key}
                  className={`flex gap-4 px-5 py-3.5 ${i % 2 === 0 ? 'bg-[#f5f5f7]' : 'bg-white'}`}
                >
                  <dt className="text-sm font-semibold text-[#86868b] w-36 shrink-0">{key}</dt>
                  <dd className="text-sm text-[#1d1d1f]">{val}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4 max-w-2xl">
            {/* Average */}
            <div className="flex items-center gap-6 bg-[#f5f5f7] rounded-2xl p-6 mb-6">
              <div className="text-center">
                <div className="font-serif text-6xl font-normal text-[#1d1d1f]">{product.rating}</div>
                <StarRating rating={product.rating} />
                <p className="text-xs text-[#86868b] mt-1">{product.reviews.toLocaleString()} reviews</p>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const pct = star === 5 ? 72 : star === 4 ? 18 : star === 3 ? 7 : star === 2 ? 2 : 1
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-xs w-2 text-[#86868b]">{star}</span>
                      <span className="star-filled text-xs">★</span>
                      <div className="flex-1 h-1.5 bg-[#d2d2d7] rounded-full overflow-hidden">
                        <div className="h-full bg-[#f59e0b] rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-[#86868b] w-8">{pct}%</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {mockReviews.map((review, i) => (
              <div key={i} className="bg-[#f5f5f7] rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[#0071e3] flex items-center justify-center text-white font-bold text-sm">
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-[#1d1d1f]">{review.name}</p>
                      <p className="text-xs text-[#86868b]">{review.date}</p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                </div>
                <p className="text-sm text-[#1d1d1f] leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <h2 className="font-serif text-2xl md:text-3xl font-normal text-[#1d1d1f] mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
