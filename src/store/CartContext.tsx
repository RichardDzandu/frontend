import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Product } from '../data/products'

export interface CartItem {
  product: Product
  quantity: number
  selectedColor?: string
  selectedSize?: string
}

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

interface CartContextValue {
  cart: CartItem[]
  wishlist: number[]
  toasts: Toast[]
  addToCart: (product: Product, color?: string, size?: string) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  toggleWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
  cartTotal: number
  cartCount: number
  showToast: (message: string, type?: Toast['type']) => void
  dismissToast: (id: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000)
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToCart = useCallback(
    (product: Product, color?: string, size?: string) => {
      setCart((prev) => {
        const existing = prev.find(
          (item) =>
            item.product.id === product.id &&
            item.selectedColor === color &&
            item.selectedSize === size
        )
        if (existing) {
          return prev.map((item) =>
            item === existing ? { ...item, quantity: item.quantity + 1 } : item
          )
        }
        return [...prev, { product, quantity: 1, selectedColor: color, selectedSize: size }]
      })
      showToast(`${product.name} added to cart`)
    },
    [showToast]
  )

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId))
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      )
    }
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const toggleWishlist = useCallback(
    (productId: number) => {
      setWishlist((prev) => {
        const isIn = prev.includes(productId)
        showToast(isIn ? 'Removed from wishlist' : 'Added to wishlist', 'info')
        return isIn ? prev.filter((id) => id !== productId) : [...prev, productId]
      })
    },
    [showToast]
  )

  const isInWishlist = useCallback((productId: number) => wishlist.includes(productId), [wishlist])

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        toasts,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartTotal,
        cartCount,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
