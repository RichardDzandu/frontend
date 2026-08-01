import { useNavigate } from 'react-router'
import type { Product } from '../data/products'
import { useCart } from '../store/CartContext'

interface Props {
  product: Product
  variant?: 'default' | 'compact' | 'horizontal'
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= Math.round(rating) ? 'star-filled' : 'star-empty'} style={{ fontSize: 10 }}>
          ★
        </span>
      ))}
    </div>
  )
}

export default function ProductCard({ product, variant = 'default' }: Props) {
  const navigate = useNavigate()
  const { addToCart, toggleWishlist, isInWishlist } = useCart()
  const inWishlist = isInWishlist(product.id)

  if (variant === 'horizontal') {
    return (
      <div
        className="flex gap-4 bg-white rounded-2xl p-3 shadow-sm border border-[#d2d2d7]/40 cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <div className="relative shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-[#f5f5f7]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0 py-1">
          <p className="text-xs text-[#86868b] font-medium">{product.brand}</p>
          <h3 className="text-sm font-semibold text-[#1d1d1f] line-clamp-2 leading-snug mt-0.5">{product.name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <StarRating rating={product.rating} />
            <span className="text-xs text-[#86868b]">({product.reviews.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-base font-bold text-[#1d1d1f]">${product.price}</span>
            <span className="text-xs text-[#86868b] line-through">${product.originalPrice}</span>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div
        className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-[#d2d2d7]/40 cursor-pointer group hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <div className="relative aspect-square bg-[#f5f5f7] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id) }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm text-sm hover:scale-110 transition-transform"
          >
            {inWishlist ? '♥' : '♡'}
          </button>
        </div>
        <div className="p-3">
          <p className="text-xs text-[#86868b] font-medium">{product.brand}</p>
          <h3 className="text-sm font-semibold text-[#1d1d1f] line-clamp-1 mt-0.5">{product.name}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-bold text-[#1d1d1f]">${product.price}</span>
            {product.discount > 0 && (
              <span className="text-xs text-[#0071e3] font-semibold bg-[#0071e3]/10 px-1.5 py-0.5 rounded-full">
                -{product.discount}%
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative bg-white rounded-3xl overflow-hidden shadow-sm border border-[#d2d2d7]/40 cursor-pointer group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isNew && (
          <span className="text-xs font-semibold text-white bg-[#1d1d1f] px-2.5 py-1 rounded-full">New</span>
        )}
        {product.isFlashDeal && (
          <span className="text-xs font-semibold text-white bg-[#0071e3] px-2.5 py-1 rounded-full">Flash Deal</span>
        )}
        {product.discount >= 20 && !product.isFlashDeal && (
          <span className="text-xs font-semibold text-white bg-[#ef4444] px-2.5 py-1 rounded-full">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button
        onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id) }}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md text-lg hover:scale-110 transition-transform"
      >
        <span className={inWishlist ? 'text-red-500' : 'text-[#86868b]'}>{inWishlist ? '♥' : '♡'}</span>
      </button>

      {/* Image */}
      <div className="relative h-52 bg-[#f5f5f7] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-semibold text-[#86868b] uppercase tracking-wide">{product.brand}</p>
        <h3 className="text-[15px] font-semibold text-[#1d1d1f] line-clamp-2 leading-snug mt-1">{product.name}</h3>

        <div className="flex items-center gap-1.5 mt-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-[#86868b]">{product.rating}</span>
          <span className="text-xs text-[#86868b]">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-[#1d1d1f]">${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-[#86868b] line-through">${product.originalPrice}</span>
              )}
            </div>
            {product.discount > 0 && (
              <span className="text-xs text-[#34c759] font-medium">Save ${product.originalPrice - product.price}</span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              addToCart(product)
            }}
            className="flex items-center gap-1.5 bg-[#0071e3] text-white text-sm font-semibold px-3.5 py-2 rounded-full hover:bg-[#0077ed] active:scale-95 transition-all"
          >
            + Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export { StarRating }
