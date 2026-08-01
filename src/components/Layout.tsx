import { Outlet, useLocation } from 'react-router'
import Navbar from './Navbar'
import BottomNav from './BottomNav'
import Footer from './Footer'
import Toast from './Toast'

const noFooterPaths = ['/checkout', '/login', '/signup', '/forgot-password', '/order-success']

export default function Layout() {
  const location = useLocation()
  const showFooter = !noFooterPaths.some((p) => location.pathname.startsWith(p))

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0 page-enter">
        <Outlet />
      </main>
      {showFooter && <Footer />}
      <BottomNav />
      <Toast />
    </div>
  )
}
