import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import ProductCard from '../components/ProductCard'
import {
  products,
  categories,
  brands,
  getFeaturedProducts,
  getBestSellers,
  getNewArrivals,
  getFlashDeals,
} from '../data/products'
import { useCart } from '../store/CartContext'

function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 })

  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, endTime.getTime() - Date.now())
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [endTime])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="flex items-center gap-1.5">
      {[pad(timeLeft.h), pad(timeLeft.m), pad(timeLeft.s)].map((val, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="bg-[#1d1d1f] text-white font-bold font-mono text-sm px-2.5 py-1.5 rounded-lg min-w-[36px] text-center">
            {val}
          </span>
          {i < 2 && <span className="text-[#1d1d1f] font-bold text-lg">:</span>}
        </span>
      ))}
    </div>
  )
}

const flashEndTime = new Date(Date.now() + 4 * 3600 * 1000 + 23 * 60 * 1000)

const heroSlides = [
  {
    id: 1,
    eyebrow: 'New Arrival',
    headline: 'iPhone 16 Pro',
    sub: 'Forged in titanium. A17 Pro chip. Designed for photographers.',
    cta: 'Shop Now',
    img: 'https://images.unsplash.com/photo-1550029402-8ea9bfe19f04?w=800&h=600&fit=crop&auto=format',
    bg: 'from-[#f0f4ff] to-[#e8f2ff]',
    accent: '#0071e3',
    productId: 2,
  },
  {
    id: 2,
    eyebrow: 'Most Powerful',
    headline: 'MacBook Pro M3 Max',
    sub: 'Performance meets elegance. The ultimate professional laptop.',
    cta: 'Explore',
    img: 'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?w=800&h=600&fit=crop&auto=format',
    bg: 'from-[#f5f5f7] to-[#e8e8ed]',
    accent: '#1d1d1f',
    productId: 1,
  },
  {
    id: 3,
    eyebrow: 'Nordic Design',
    headline: 'Arc Lounge Chair',
    sub: 'Sculptural comfort for the modern home. Solid oak & premium wool.',
    cta: 'View Collection',
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&auto=format',
    bg: 'from-[#faf5ee] to-[#f0e8d8]',
    accent: '#8b5c2a',
    productId: 6,
  },
]

const testimonials = [
  {
    name: 'Sarah M.',
    avatar: 'S',
    rating: 5,
    text: "The fastest shipping I've ever experienced. Product arrived perfectly packaged and exactly as described. Will definitely shop here again!",
    product: 'AirPods Pro',
  },
  {
    name: 'James K.',
    avatar: 'J',
    rating: 5,
    text: 'Absolutely love my Arc Lounge Chair. The quality is exceptional and it looks stunning in my living room. Worth every penny.',
    product: 'Arc Lounge Chair',
  },
  {
    name: 'Priya R.',
    avatar: 'P',
    rating: 5,
    text: 'The Glow Serum has transformed my skin in just 3 weeks. I was skeptical but the results speak for themselves. Highly recommend!',
    product: 'Luminous Glow Serum',
  },
  {
    name: 'Marcus T.',
    avatar: 'M',
    rating: 5,
    text: 'MacBook Pro arrived within 24 hours with a personal setup note. Customer service was responsive and helpful throughout.',
    product: 'MacBook Pro 16"',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [heroIndex, setHeroIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    const id = setInterval(() => setHeroIndex((i) => (i + 1) % heroSlides.length), 5000)
    return () => clearInterval(id)
  }, [])

  const slide = heroSlides[heroIndex]
  const featured = getFeaturedProducts()
  const bestSellers = getBestSellers()
  const newArrivals = getNewArrivals()
  const flashDeals = getFlashDeals()

  const categoryFiltered =
    activeCategory === 'All'
      ? products.slice(0, 8)
      : products.filter((p) => p.category === activeCategory).slice(0, 8)

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className={`relative bg-gradient-to-br ${slide.bg} overflow-hidden transition-colors duration-700`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text */}
            <div className="order-2 md:order-1 text-center md:text-left">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#86868b] mb-4">
                {slide.eyebrow}
              </span>
              <h1
                className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal leading-none mb-4 text-[#1d1d1f]"
                style={{ color: slide.accent === '#0071e3' ? '#1d1d1f' : slide.accent }}
              >
                {slide.headline}
              </h1>
              <p className="text-[#86868b] text-base sm:text-lg mb-8 max-w-sm mx-auto md:mx-0 leading-relaxed">
                {slide.sub}
              </p>
              <div className="flex gap-3 justify-center md:justify-start">
                <button
                  onClick={() => navigate(`/product/${slide.productId}`)}
                  className="px-8 py-3.5 bg-[#0071e3] text-white font-semibold rounded-full hover:bg-[#0077ed] transition-colors shadow-lg shadow-[#0071e3]/30"
                >
                  {slide.cta}
                </button>
                <button
                  onClick={() => navigate('/products')}
                  className="px-8 py-3.5 bg-white/70 text-[#1d1d1f] font-semibold rounded-full hover:bg-white transition-colors border border-[#d2d2d7]/60"
                >
                  Browse All
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                <div className="absolute inset-4 rounded-3xl bg-white/40 backdrop-blur-sm" />
                <img
                  src={slide.img}
                  alt={slide.headline}
                  className="relative w-full h-full object-cover rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === heroIndex ? 'w-8 bg-[#0071e3]' : 'w-1.5 bg-[#d2d2d7]'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORY SHORTCUTS ────────────────────────────────── */}
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-3 overflow-x-auto snap-scroll pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/products?category=${cat.label}`)}
                className="snap-start shrink-0 flex flex-col items-center gap-2 bg-[#f5f5f7] hover:bg-[#e8e8ed] rounded-2xl px-5 py-4 transition-colors group min-w-[88px]"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-semibold text-[#1d1d1f] whitespace-nowrap">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLASH DEALS ───────────────────────────────────────── */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-[#0071e3] to-[#0055b3] rounded-3xl p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">⚡</span>
                  <h2 className="text-white font-bold text-xl md:text-2xl">Flash Deals</h2>
                </div>
                <p className="text-white/70 text-sm">Limited time — grab them while they last</p>
              </div>
              <div className="flex items-center gap-4">
                <CountdownTimer endTime={flashEndTime} />
                <button
                  onClick={() => navigate('/flash-deals')}
                  className="text-white/80 text-sm font-semibold underline-offset-2 hover:text-white hover:underline"
                >
                  View All →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {flashDeals.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group"
                >
                  <div className="aspect-square bg-[#f5f5f7] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold text-[#86868b]">{product.brand}</p>
                    <p className="text-sm font-bold text-[#1d1d1f] line-clamp-1 mt-0.5">{product.name}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-[#0071e3]">${product.price}</span>
                      <span className="text-xs font-bold text-white bg-[#ff3b30] px-1.5 py-0.5 rounded-full">
                        -{product.discount}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────────────── */}
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-widest mb-1">Hand-picked</p>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#1d1d1f]">Featured</h2>
            </div>
            <button
              onClick={() => navigate('/products')}
              className="text-sm font-semibold text-[#0071e3] hover:text-[#0055b3]"
            >
              See all →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ──────────────────────────────────────── */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className="relative rounded-3xl overflow-hidden cursor-pointer group"
            onClick={() => navigate('/products?category=Furniture')}
          >
            <img
              src="https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=1400&h=500&fit=crop&auto=format"
              alt="Modern living room"
              className="w-full h-48 md:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="px-8 md:px-12">
                <p className="text-white/60 text-sm mb-1 uppercase tracking-wider">New Collection</p>
                <h3 className="font-serif text-3xl md:text-4xl text-white font-normal mb-4">
                  Minimal Living
                </h3>
                <button className="bg-white text-[#1d1d1f] font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors">
                  Shop Furniture
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS ──────────────────────────────────────── */}
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-widest mb-1">Customer Favorites</p>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#1d1d1f]">Best Sellers</h2>
            </div>
            <button
              onClick={() => navigate('/products')}
              className="text-sm font-semibold text-[#0071e3] hover:text-[#0055b3]"
            >
              See all →
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto snap-scroll pb-4">
            {bestSellers.map((p) => (
              <div key={p.id} className="snap-start shrink-0 w-56">
                <ProductCard product={p} variant="compact" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BROWSE BY CATEGORY ────────────────────────────────── */}
      <section className="py-10 md:py-14 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#1d1d1f]">Browse by Category</h2>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto snap-scroll pb-2">
            {['All', 'Electronics', 'Beauty', 'Sports', 'Fashion', 'Furniture'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`snap-start shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#1d1d1f] text-white'
                    : 'bg-white text-[#1d1d1f] border border-[#d2d2d7] hover:border-[#1d1d1f]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryFiltered.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ──────────────────────────────────────── */}
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-widest mb-1">Just Dropped</p>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#1d1d1f]">New Arrivals</h2>
            </div>
            <button
              onClick={() => navigate('/products?sort=new')}
              className="text-sm font-semibold text-[#0071e3] hover:text-[#0055b3]"
            >
              See all →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {newArrivals.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP BRANDS ────────────────────────────────────────── */}
      <section className="py-10 md:py-14 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#1d1d1f] text-center mb-8">Top Brands</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {brands.map((brand) => (
              <button
                key={brand.name}
                onClick={() => navigate(`/products?brand=${brand.name}`)}
                className="bg-white rounded-2xl p-4 md:p-6 flex flex-col items-center gap-2 border border-[#d2d2d7]/40 hover:border-[#0071e3] hover:shadow-md transition-all group"
              >
                <span className="text-3xl font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
                  {brand.logo}
                </span>
                <span className="text-xs font-semibold text-[#86868b]">{brand.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ───────────────────────────────────────────── */}
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold text-[#0071e3] uppercase tracking-widest mb-1">Social Proof</p>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#1d1d1f]">What Customers Say</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[#f5f5f7] rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#0071e3] flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1d1d1f]">{t.name}</p>
                    <p className="text-xs text-[#86868b]">{t.product}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <span key={j} className="star-filled text-xs">★</span>
                  ))}
                </div>
                <p className="text-sm text-[#1d1d1f] leading-relaxed">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENTLY VIEWED (mocked) ──────────────────────────── */}
      <section className="py-10 md:py-14 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-2xl md:text-3xl font-normal text-[#1d1d1f] mb-6">Recently Viewed</h2>
          <div className="flex gap-4 overflow-x-auto snap-scroll pb-2">
            {products.slice(0, 6).map((p) => (
              <div key={p.id} className="snap-start shrink-0 w-40">
                <ProductCard product={p} variant="compact" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
