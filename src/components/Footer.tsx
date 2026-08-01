import { useNavigate } from 'react-router'

export default function Footer() {
  const navigate = useNavigate()

  const sections = [
    {
      title: 'Shop',
      links: [
        { label: 'Electronics', path: '/products?category=Electronics' },
        { label: 'Fashion', path: '/products?category=Fashion' },
        { label: 'Beauty', path: '/products?category=Beauty' },
        { label: 'Furniture', path: '/products?category=Furniture' },
        { label: 'Flash Deals', path: '/flash-deals' },
      ],
    },
    {
      title: 'Account',
      links: [
        { label: 'My Dashboard', path: '/dashboard' },
        { label: 'Order History', path: '/dashboard?tab=orders' },
        { label: 'Wishlist', path: '/wishlist' },
        { label: 'Profile Settings', path: '/dashboard?tab=profile' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', path: '/help' },
        { label: 'Contact Us', path: '/contact' },
        { label: 'FAQ', path: '/faq' },
        { label: 'Track Order', path: '/dashboard?tab=orders' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Terms & Conditions', path: '/terms' },
        { label: 'Vendor Registration', path: '/vendor' },
      ],
    },
  ]

  return (
    <footer className="bg-[#1d1d1f] text-white mt-20">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-normal">Stay in the loop</h3>
            <p className="text-[#86868b] text-sm mt-1">Get exclusive deals and new arrivals in your inbox.</p>
          </div>
          <form className="flex gap-3 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 md:w-72 px-4 py-3 bg-white/10 rounded-full text-sm text-white placeholder-[#86868b] border border-white/20 focus:border-[#0071e3] focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#0071e3] text-white text-sm font-semibold rounded-full hover:bg-[#0077ed] transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold text-[#86868b] uppercase tracking-widest mb-4">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
              <span className="text-[#1d1d1f] text-xs font-bold">S</span>
            </div>
            <span className="font-semibold">Store</span>
          </div>
          <p className="text-[#86868b] text-xs text-center">
            © 2026 Store Inc. All rights reserved. Premium shopping experience.
          </p>
          <div className="flex gap-4">
            {['𝕏', '◻', '▶'].map((icon, i) => (
              <button
                key={i}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm hover:bg-white/20 transition-colors"
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
