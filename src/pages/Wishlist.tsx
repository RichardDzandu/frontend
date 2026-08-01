import { useNavigate } from 'react-router'
import { useCart } from '../store/CartContext'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const navigate = useNavigate()
  const { wishlist } = useCart()
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="font-serif text-3xl md:text-4xl font-normal text-[#1d1d1f]">Wishlist</h1>
        <p className="text-[#86868b] text-sm mt-1">{wishlistProducts.length} saved items</p>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="text-7xl mb-5">♡</span>
          <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-2">Your wishlist is empty</h2>
          <p className="text-[#86868b] text-base mb-8 max-w-xs">
            Save items you love by tapping the heart icon on any product.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="px-8 py-3.5 bg-[#0071e3] text-white font-semibold rounded-full hover:bg-[#0077ed]"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
