import { useCart } from '../store/CartContext'

export default function Toast() {
  const { toasts, dismissToast } = useCart()

  return (
    <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="toast-enter pointer-events-auto flex items-center gap-3 bg-[#1d1d1f] text-white px-4 py-3 rounded-2xl shadow-xl min-w-[240px] max-w-[320px]"
        >
          <span className="text-sm">
            {toast.type === 'success' && '✓ '}
            {toast.type === 'error' && '✕ '}
            {toast.type === 'info' && '♥ '}
            {toast.message}
          </span>
          <button
            onClick={() => dismissToast(toast.id)}
            className="ml-auto text-white/50 hover:text-white text-lg leading-none"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
