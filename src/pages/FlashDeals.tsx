import { useState, useEffect } from 'react'
import { getFlashDeals } from '../data/products'
import ProductCard from '../components/ProductCard'

const endTime = new Date(Date.now() + 4 * 3600 * 1000 + 23 * 60 * 1000)

function Digit({ value }: { value: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-[#1d1d1f] text-white font-bold font-mono text-3xl md:text-5xl px-4 py-3 rounded-2xl min-w-[64px] md:min-w-[80px] text-center tabular-nums">
        {value}
      </div>
    </div>
  )
}

export default function FlashDeals() {
  const [time, setTime] = useState({ h: '00', m: '00', s: '00' })
  const deals = getFlashDeals()

  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, endTime.getTime() - Date.now())
      const pad = (n: number) => String(n).padStart(2, '0')
      setTime({
        h: pad(Math.floor(diff / 3600000)),
        m: pad(Math.floor((diff % 3600000) / 60000)),
        s: pad(Math.floor((diff % 60000) / 1000)),
      })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0071e3] to-[#0040a0] rounded-3xl p-8 md:p-12 text-center mb-10">
        <div className="text-4xl mb-3">⚡</div>
        <h1 className="font-serif text-4xl md:text-5xl text-white font-normal mb-2">Flash Deals</h1>
        <p className="text-white/70 text-base mb-8">Massive discounts for a limited time only</p>

        {/* Countdown */}
        <div className="flex items-center justify-center gap-3 md:gap-4">
          <Digit value={time.h} />
          <span className="text-white font-bold text-3xl md:text-5xl pb-1">:</span>
          <Digit value={time.m} />
          <span className="text-white font-bold text-3xl md:text-5xl pb-1">:</span>
          <Digit value={time.s} />
        </div>
        <div className="flex justify-center gap-12 md:gap-20 mt-2">
          {['Hours', 'Minutes', 'Seconds'].map((label) => (
            <span key={label} className="text-white/50 text-xs font-medium uppercase tracking-wider">{label}</span>
          ))}
        </div>
      </div>

      {/* Deals grid */}
      <div className="mb-6">
        <h2 className="font-serif text-2xl md:text-3xl font-normal text-[#1d1d1f]">
          {deals.length} Deals Live Now
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {deals.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
