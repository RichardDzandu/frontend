import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'new', label: 'New Arrivals' },
  { value: 'discount', label: 'Biggest Discount' },
]

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState('featured')
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [filterOpen, setFilterOpen] = useState(false)

  const categoryParam = searchParams.get('category') || 'All'
  const brandParam = searchParams.get('brand') || ''

  const filtered = useMemo(() => {
    let list = [...products]
    if (categoryParam && categoryParam !== 'All') {
      list = list.filter((p) => p.category === categoryParam)
    }
    if (brandParam) {
      list = list.filter((p) => p.brand === brandParam)
    }
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    switch (sort) {
      case 'price-asc': return list.sort((a, b) => a.price - b.price)
      case 'price-desc': return list.sort((a, b) => b.price - a.price)
      case 'rating': return list.sort((a, b) => b.rating - a.rating)
      case 'new': return list.filter((p) => p.isNew)
      case 'discount': return list.sort((a, b) => b.discount - a.discount)
      default: return list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    }
  }, [categoryParam, brandParam, sort, priceRange])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-serif text-3xl md:text-4xl font-normal text-[#1d1d1f]">
          {brandParam ? `${brandParam}` : categoryParam !== 'All' ? categoryParam : 'All Products'}
        </h1>
        <p className="text-[#86868b] text-sm mt-1">{filtered.length} products found</p>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto snap-scroll pb-3 mb-6">
        {['All', ...categories.map((c) => c.label)].map((cat) => (
          <button
            key={cat}
            onClick={() => setSearchParams(cat === 'All' ? {} : { category: cat })}
            className={`snap-start shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
              categoryParam === cat || (cat === 'All' && !categoryParam)
                ? 'bg-[#1d1d1f] text-white border-[#1d1d1f]'
                : 'bg-white text-[#1d1d1f] border-[#d2d2d7] hover:border-[#1d1d1f]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Sidebar filters (desktop) */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="bg-[#f5f5f7] rounded-2xl p-4">
              <h3 className="font-semibold text-sm text-[#1d1d1f] mb-3">Sort By</h3>
              <div className="flex flex-col gap-1.5">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSort(opt.value)}
                    className={`text-left text-sm px-3 py-2 rounded-xl transition-colors ${
                      sort === opt.value
                        ? 'bg-[#0071e3] text-white font-semibold'
                        : 'text-[#1d1d1f] hover:bg-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#f5f5f7] rounded-2xl p-4">
              <h3 className="font-semibold text-sm text-[#1d1d1f] mb-3">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min={0}
                  max={3000}
                  step={50}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, +e.target.value])}
                  className="w-full accent-[#0071e3]"
                />
                <div className="flex justify-between text-xs text-[#86868b]">
                  <span>$0</span>
                  <span className="font-semibold text-[#1d1d1f]">Up to ${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#f5f5f7] rounded-2xl p-4">
              <h3 className="font-semibold text-sm text-[#1d1d1f] mb-3">Brand</h3>
              {['Apple', 'Nike', 'Samsung', 'Lululemon', 'Aesop', 'Muuto'].map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSearchParams(brand === brandParam ? {} : { brand })}
                  className={`flex items-center gap-2 w-full text-left text-sm px-3 py-2 rounded-xl transition-colors ${
                    brandParam === brand ? 'bg-[#0071e3] text-white' : 'text-[#1d1d1f] hover:bg-white'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded border flex items-center justify-center text-xs ${
                      brandParam === brand ? 'bg-white border-white text-[#0071e3]' : 'border-[#d2d2d7]'
                    }`}
                  >
                    {brandParam === brand && '✓'}
                  </span>
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          {/* Mobile filter/sort bar */}
          <div className="lg:hidden flex gap-2 mb-4">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-[#d2d2d7] rounded-full text-sm font-medium text-[#1d1d1f] hover:border-[#1d1d1f]"
            >
              ⊟ Filter
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="flex-1 px-4 py-2 border border-[#d2d2d7] rounded-full text-sm font-medium text-[#1d1d1f] bg-white focus:outline-none focus:border-[#0071e3]"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Mobile filter panel */}
          {filterOpen && (
            <div className="lg:hidden bg-[#f5f5f7] rounded-2xl p-4 mb-4 space-y-4">
              <div>
                <p className="text-sm font-semibold text-[#1d1d1f] mb-2">Price Range</p>
                <input
                  type="range"
                  min={0} max={3000} step={50}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, +e.target.value])}
                  className="w-full accent-[#0071e3]"
                />
                <p className="text-xs text-[#86868b] mt-1">Up to ${priceRange[1]}</p>
              </div>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="text-5xl mb-4">🔍</span>
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">No products found</h3>
              <p className="text-[#86868b] text-sm">Try adjusting your filters or browse all categories.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
