import { RouterProvider } from 'react-router'
import { CartProvider } from './store/CartContext'
import { router } from './routes'

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  )
}
