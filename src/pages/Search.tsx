import { useSearchParams } from 'react-router'
import { searchProducts } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const results = query ? searchProducts(query) : []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        {query ? (
          <>
            <p className="text-[#86868b] text-sm mb-1">Search results for</p>
            <h1 className="font-serif text-3xl md:text-4xl font-normal text-[#1d1d1f]">"{query}"</h1>
            <p className="text-[#86868b] text-sm mt-2">{results.length} results found</p>
          </>
        ) : (
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-[#1d1d1f]">Search</h1>
        )}
      </div>

      {!query && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-6xl mb-4">🔍</span>
          <h2 className="text-xl font-semibold text-[#1d1d1f] mb-2">What are you looking for?</h2>
          <p className="text-[#86868b] text-sm max-w-xs">
            Use the search bar above to find products, brands, and categories.
          </p>
        </div>
      )}

      {query && results.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-6xl mb-4">😕</span>
          <h2 className="text-xl font-semibold text-[#1d1d1f] mb-2">No results for "{query}"</h2>
          <p className="text-[#86868b] text-sm max-w-xs">
            Try checking your spelling or using more general terms.
          </p>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
