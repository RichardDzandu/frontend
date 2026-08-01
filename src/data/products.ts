export interface Product {
  id: number
  name: string
  brand: string
  category: string
  subcategory: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
  image: string
  images: string[]
  description: string
  colors: string[]
  sizes: string[]
  inStock: boolean
  isNew: boolean
  isFeatured: boolean
  isBestSeller: boolean
  isFlashDeal: boolean
  tags: string[]
  specs: Record<string, string>
  deliveryDays: number
  warranty: string
}

const img = (id: string, w = 600, h = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`

export const products: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro 16"',
    brand: 'Apple',
    category: 'Electronics',
    subcategory: 'Laptops',
    price: 2499,
    originalPrice: 2799,
    discount: 11,
    rating: 4.9,
    reviews: 2841,
    image: img('1530893609608-32a9af3aa95c'),
    images: [
      img('1530893609608-32a9af3aa95c'),
      img('1426024084828-5da21e13f5dc'),
      img('1523398845774-0d176ba6fd41'),
    ],
    description:
      'The most powerful MacBook Pro ever. With M3 Max chip delivering breakthrough performance, an immersive Liquid Retina XDR display, and all-day battery life that goes the distance.',
    colors: ['Space Black', 'Silver'],
    sizes: [],
    inStock: true,
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    isFlashDeal: false,
    tags: ['laptop', 'apple', 'macbook', 'pro'],
    specs: {
      Chip: 'Apple M3 Max',
      Memory: '36GB Unified Memory',
      Storage: '1TB SSD',
      Display: '16.2" Liquid Retina XDR',
      Battery: 'Up to 22 hours',
      Weight: '2.14 kg',
    },
    deliveryDays: 2,
    warranty: '1 Year Apple Limited Warranty',
  },
  {
    id: 2,
    name: 'iPhone 16 Pro',
    brand: 'Apple',
    category: 'Electronics',
    subcategory: 'Smartphones',
    price: 1199,
    originalPrice: 1299,
    discount: 8,
    rating: 4.8,
    reviews: 5621,
    image: img('1550029402-8ea9bfe19f04'),
    images: [
      img('1550029402-8ea9bfe19f04'),
      img('1610664921890-ebad05086414'),
      img('1589400066718-871249af5f71'),
    ],
    description:
      'iPhone 16 Pro. Forged in titanium. A17 Pro chip with 48MP Fusion camera system. Action button. USB 3 speeds.',
    colors: ['Black Titanium', 'White Titanium', 'Natural Titanium', 'Desert Titanium'],
    sizes: ['6.1"', '6.7"'],
    inStock: true,
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    isFlashDeal: true,
    tags: ['iphone', 'apple', 'smartphone', 'pro'],
    specs: {
      Chip: 'A17 Pro',
      Display: '6.1" Super Retina XDR',
      Camera: '48MP Main + 12MP Ultra Wide',
      Battery: '3274 mAh',
      Storage: '256GB',
      OS: 'iOS 18',
    },
    deliveryDays: 1,
    warranty: '1 Year Apple Limited Warranty',
  },
  {
    id: 3,
    name: 'AirPods Pro (2nd Gen)',
    brand: 'Apple',
    category: 'Electronics',
    subcategory: 'Audio',
    price: 249,
    originalPrice: 299,
    discount: 17,
    rating: 4.7,
    reviews: 8924,
    image: img('1550029402-8ea9bfe19f04', 600, 600),
    images: [img('1550029402-8ea9bfe19f04')],
    description:
      'AirPods Pro deliver up to 2x more Active Noise Cancellation than the previous generation, and Adaptive Audio for the best listening experience.',
    colors: ['White'],
    sizes: [],
    inStock: true,
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    isFlashDeal: true,
    tags: ['airpods', 'apple', 'earbuds', 'noise-cancelling'],
    specs: {
      'Noise Cancellation': 'Active Noise Cancellation',
      'Battery Life': 'Up to 6 hours',
      'Charging Case': 'MagSafe Charging Case',
      Connectivity: 'Bluetooth 5.3',
      Chip: 'H2',
    },
    deliveryDays: 2,
    warranty: '1 Year Apple Limited Warranty',
  },
  {
    id: 4,
    name: 'Luminous Glow Serum',
    brand: 'Aesop',
    category: 'Beauty',
    subcategory: 'Skincare',
    price: 89,
    originalPrice: 110,
    discount: 19,
    rating: 4.6,
    reviews: 1247,
    image: img('1580870069867-74c57ee1bb07'),
    images: [img('1580870069867-74c57ee1bb07'), img('1598440947619-2c35fc9aa908'), img('1616750819456-5cdee9b85d22')],
    description:
      'A concentrated vitamin C serum that brightens, evens skin tone, and reduces the appearance of fine lines. Formulated with 20% L-Ascorbic Acid.',
    colors: [],
    sizes: ['30ml', '50ml'],
    inStock: true,
    isNew: true,
    isFeatured: true,
    isBestSeller: false,
    isFlashDeal: false,
    tags: ['serum', 'skincare', 'vitamin-c', 'brightening'],
    specs: {
      'Key Ingredient': '20% Vitamin C (L-Ascorbic Acid)',
      'Skin Type': 'All skin types',
      Size: '30ml / 1 fl oz',
      'Shelf Life': '12 months after opening',
    },
    deliveryDays: 3,
    warranty: '30-Day Satisfaction Guarantee',
  },
  {
    id: 5,
    name: 'Velvet Matte Lipstick Collection',
    brand: 'Charlotte Tilbury',
    category: 'Beauty',
    subcategory: 'Makeup',
    price: 34,
    originalPrice: 42,
    discount: 19,
    rating: 4.5,
    reviews: 3201,
    image: img('1631730486572-226d1f595b68'),
    images: [img('1631730486572-226d1f595b68')],
    description:
      'Luxurious matte finish with 12 hours of comfortable wear. Enriched with vitamin E and hyaluronic acid for a hydrated, smooth finish.',
    colors: ['Pillow Talk', 'Red Carpet Red', 'Nude Kate', 'Very Victoria'],
    sizes: [],
    inStock: true,
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    isFlashDeal: true,
    tags: ['lipstick', 'makeup', 'matte', 'beauty'],
    specs: {
      Finish: 'Matte',
      'Wear Time': '12 hours',
      'Formula': 'Vitamin E + Hyaluronic Acid',
    },
    deliveryDays: 3,
    warranty: '6-Month Product Guarantee',
  },
  {
    id: 6,
    name: 'Arc Lounge Chair',
    brand: 'Muuto',
    category: 'Furniture',
    subcategory: 'Chairs',
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    rating: 4.8,
    reviews: 428,
    image: img('1586023492125-27b2c045efd7'),
    images: [img('1586023492125-27b2c045efd7'), img('1567016376408-0226e4d0c1ea'), img('1724582586529-62622e50c0b3')],
    description:
      'Sculptural lounge chair crafted from solid oak with premium wool upholstery. A statement piece that blends Nordic minimalism with modern comfort.',
    colors: ['Natural Oak / Ivory', 'Walnut / Charcoal', 'Black / Slate'],
    sizes: [],
    inStock: true,
    isNew: false,
    isFeatured: true,
    isBestSeller: false,
    isFlashDeal: false,
    tags: ['chair', 'lounge', 'furniture', 'nordic'],
    specs: {
      Material: 'Solid Oak, Wool Upholstery',
      Dimensions: '80 × 85 × 75 cm',
      Weight: '18 kg',
      Assembly: 'Easy self-assembly',
    },
    deliveryDays: 7,
    warranty: '5 Year Structural Warranty',
  },
  {
    id: 7,
    name: 'Minimal Tufted Sofa',
    brand: 'HAY',
    category: 'Furniture',
    subcategory: 'Sofas',
    price: 2199,
    originalPrice: 2699,
    discount: 19,
    rating: 4.7,
    reviews: 314,
    image: img('1567016376408-0226e4d0c1ea'),
    images: [img('1567016376408-0226e4d0c1ea'), img('1724582586529-62622e50c0b3')],
    description:
      'A contemporary 3-seater sofa with deep cushions and tufted details. High-resilience foam core wrapped in premium Italian leather.',
    colors: ['Cream Leather', 'Cognac Leather', 'Charcoal Fabric'],
    sizes: ['2-seater', '3-seater', 'Sectional'],
    inStock: true,
    isNew: false,
    isFeatured: true,
    isBestSeller: false,
    isFlashDeal: false,
    tags: ['sofa', 'couch', 'furniture', 'leather'],
    specs: {
      Material: 'Italian Leather / Premium Fabric',
      Dimensions: '220 × 90 × 82 cm',
      'Cushion Fill': 'High-Resilience Foam',
      Legs: 'Solid Walnut',
    },
    deliveryDays: 14,
    warranty: '10 Year Frame Warranty',
  },
  {
    id: 8,
    name: 'Air Zoom Pegasus 41',
    brand: 'Nike',
    category: 'Sports',
    subcategory: 'Running',
    price: 135,
    originalPrice: 160,
    discount: 16,
    rating: 4.6,
    reviews: 6748,
    image: img('1676041669566-fead69bd7007'),
    images: [img('1676041669566-fead69bd7007'), img('1676767720609-c76265fb3074'), img('1591175359374-12dba73cd4b1')],
    description:
      'The Nike Air Zoom Pegasus 41 provides responsive cushioning for your everyday runs. React foam and Air Zoom units team up for a lightweight, bouncy ride.',
    colors: ['White/Black', 'Navy/Orange', 'Wolf Grey', 'Volt/Black'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    inStock: true,
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    isFlashDeal: false,
    tags: ['shoes', 'nike', 'running', 'sports'],
    specs: {
      Upper: 'Engineered Mesh',
      Midsole: 'React + Air Zoom',
      Outsole: 'Waffle-pattern Rubber',
      Drop: '10mm',
      Weight: '283g (M10)',
    },
    deliveryDays: 3,
    warranty: '2-Year Manufacturing Warranty',
  },
  {
    id: 9,
    name: 'Precision Running Shorts',
    brand: 'Lululemon',
    category: 'Sports',
    subcategory: 'Apparel',
    price: 68,
    originalPrice: 88,
    discount: 23,
    rating: 4.5,
    reviews: 2109,
    image: img('1525401919108-97462bd24fe4'),
    images: [img('1525401919108-97462bd24fe4')],
    description:
      'Lightweight, breathable running shorts with built-in liner. Swift fabric wicks sweat, and the 5" inseam offers unrestricted movement.',
    colors: ['Black', 'Navy', 'Camo Grey', 'Green'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    isFlashDeal: true,
    tags: ['shorts', 'running', 'sports', 'lululemon'],
    specs: {
      Material: '100% Swift Nylon',
      Inseam: '5"',
      Features: 'Built-in Liner, Zippered Pocket',
      Care: 'Machine Wash Cold',
    },
    deliveryDays: 3,
    warranty: 'Quality Promise',
  },
  {
    id: 10,
    name: 'Organic Fruit Basket',
    brand: 'FreshFarm',
    category: 'Groceries',
    subcategory: 'Produce',
    price: 42,
    originalPrice: 55,
    discount: 24,
    rating: 4.4,
    reviews: 891,
    image: img('1542838132-92c53300491e'),
    images: [img('1542838132-92c53300491e'), img('1550989460-0adf9ea622e2')],
    description:
      'Premium seasonal fruit basket with 8 varieties of certified organic fruits, sourced directly from local farms. Perfect for gifting or weekly deliveries.',
    colors: [],
    sizes: ['Small (2kg)', 'Medium (4kg)', 'Large (6kg)'],
    inStock: true,
    isNew: false,
    isFeatured: false,
    isBestSeller: false,
    isFlashDeal: true,
    tags: ['organic', 'fruit', 'fresh', 'grocery'],
    specs: {
      Contents: '8 Seasonal Fruit Varieties',
      Certification: 'USDA Organic',
      'Best By': 'Delivered fresh',
      Origin: 'Local & Regional Farms',
    },
    deliveryDays: 1,
    warranty: 'Freshness Guaranteed',
  },
  {
    id: 11,
    name: 'Wool Blend Overcoat',
    brand: 'COS',
    category: 'Fashion',
    subcategory: 'Outerwear',
    price: 320,
    originalPrice: 425,
    discount: 25,
    rating: 4.7,
    reviews: 743,
    image: img('1547587091-d639c1c338b3'),
    images: [img('1547587091-d639c1c338b3'), img('1605888104762-3e4d2d322e7e')],
    description:
      'A classic single-breasted overcoat in a premium wool and cashmere blend. Structured shoulders and a relaxed body create an effortlessly polished silhouette.',
    colors: ['Camel', 'Charcoal', 'Ivory', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: true,
    isFeatured: true,
    isBestSeller: false,
    isFlashDeal: false,
    tags: ['coat', 'wool', 'fashion', 'outerwear'],
    specs: {
      Material: '80% Wool, 15% Polyamide, 5% Cashmere',
      Lining: '100% Viscose',
      Fit: 'Relaxed',
      Care: 'Dry Clean Only',
    },
    deliveryDays: 4,
    warranty: '90-Day Returns',
  },
  {
    id: 12,
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'Electronics',
    subcategory: 'Smartphones',
    price: 1099,
    originalPrice: 1249,
    discount: 12,
    rating: 4.7,
    reviews: 4123,
    image: img('1610664921890-ebad05086414'),
    images: [img('1610664921890-ebad05086414'), img('1589400066718-871249af5f71')],
    description:
      'Galaxy S24 Ultra with Galaxy AI. 200MP camera, integrated S Pen, titanium frame, and ProVisual Engine for studio-quality photos and videos.',
    colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow'],
    sizes: [],
    inStock: true,
    isNew: true,
    isFeatured: true,
    isBestSeller: false,
    isFlashDeal: false,
    tags: ['samsung', 'android', 'smartphone', 'spen'],
    specs: {
      Display: '6.8" Dynamic AMOLED 2X, 120Hz',
      Camera: '200MP Main + 12MP Ultra Wide',
      Chip: 'Snapdragon 8 Gen 3',
      Battery: '5000 mAh',
      Storage: '256GB / 512GB / 1TB',
    },
    deliveryDays: 2,
    warranty: '1 Year Manufacturer Warranty',
  },
]

export const categories = [
  { id: 'electronics', label: 'Electronics', icon: '💻', count: 3420 },
  { id: 'fashion', label: 'Fashion', icon: '👗', count: 8910 },
  { id: 'beauty', label: 'Beauty', icon: '✨', count: 2340 },
  { id: 'furniture', label: 'Furniture', icon: '🪑', count: 1250 },
  { id: 'sports', label: 'Sports', icon: '🏃', count: 4560 },
  { id: 'groceries', label: 'Groceries', icon: '🛒', count: 6780 },
  { id: 'books', label: 'Books', icon: '📚', count: 12000 },
  { id: 'appliances', label: 'Appliances', icon: '🔌', count: 890 },
]

export const brands = [
  { name: 'Apple', logo: '🍎' },
  { name: 'Nike', logo: '✓' },
  { name: 'Samsung', logo: '◈' },
  { name: 'Lululemon', logo: '◻' },
  { name: 'Muuto', logo: '◯' },
  { name: 'Aesop', logo: '⬡' },
]

export const getProductById = (id: number) => products.find((p) => p.id === id)
export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category.toLowerCase() === category.toLowerCase())
export const getFeaturedProducts = () => products.filter((p) => p.isFeatured)
export const getBestSellers = () => products.filter((p) => p.isBestSeller)
export const getNewArrivals = () => products.filter((p) => p.isNew)
export const getFlashDeals = () => products.filter((p) => p.isFlashDeal)
export const searchProducts = (query: string) => {
  const q = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q))
  )
}
