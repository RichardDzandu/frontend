import { useNavigate } from 'react-router'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <p className="text-[120px] font-serif font-normal text-[#f5f5f7] leading-none select-none">404</p>
      <div className="-mt-8 mb-6">
        <h1 className="font-serif text-3xl font-normal text-[#1d1d1f] mb-2">Page not found</h1>
        <p className="text-[#86868b] text-base max-w-xs">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 border border-[#d2d2d7] text-[#1d1d1f] font-semibold rounded-full hover:bg-[#f5f5f7] transition-colors"
        >
          ← Go Back
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-[#0071e3] text-white font-semibold rounded-full hover:bg-[#0077ed] transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  )
}
