import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Wishlist from './pages/Wishlist'
import FlashDeals from './pages/FlashDeals'
import Search from './pages/Search'
import NotFound from './pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'products', Component: Products },
      { path: 'product/:id', Component: ProductDetail },
      { path: 'cart', Component: Cart },
      { path: 'wishlist', Component: Wishlist },
      { path: 'flash-deals', Component: FlashDeals },
      { path: 'search', Component: Search },
      { path: 'dashboard', Component: Dashboard },
      { path: '*', Component: NotFound },
    ],
  },
  { path: '/checkout', Component: Checkout },
  { path: '/order-success', Component: OrderSuccess },
  { path: '/login', Component: Login },
  { path: '/signup', Component: SignUp },

],
{
  basename: "/frontend"
})
