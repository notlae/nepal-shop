'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import CartDrawer, { CartItem } from '@/components/CartDrawer';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const ALL_PRODUCTS = [
{ id: 1, name: 'Samsung Galaxy A55 5G', category: 'electronics', price: 52000, originalPrice: 58000, rating: 4.7, reviews: 284, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d4609419-1772296138363.png", alt: 'Samsung Galaxy smartphone on clean white background', badge: 'Best Seller', inStock: true },
{ id: 2, name: 'Nepali Cotton Kurta Set', category: 'fashion', price: 2800, originalPrice: 3500, rating: 4.5, reviews: 126, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d801bb1e-1766806644351.png", alt: 'Traditional cotton kurta in natural beige tones', badge: 'Sale', inStock: true },
{ id: 3, name: 'Boät Rockerz 450 Headphones', category: 'electronics', price: 4500, originalPrice: 6000, rating: 4.3, reviews: 412, image: "https://images.unsplash.com/photo-1674230100409-5fc79a435c6b", alt: 'Over-ear headphones on white surface', badge: '25% Off', inStock: true },
{ id: 4, name: 'Yoga Mat Premium', category: 'sports', price: 1800, originalPrice: 2200, rating: 4.6, reviews: 89, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d841e994-1772098421715.png", alt: 'Purple yoga mat on wooden floor', badge: null, inStock: true },
{ id: 5, name: 'Himalayan Face Cream', category: 'beauty', price: 650, originalPrice: 850, rating: 4.8, reviews: 203, image: "https://images.unsplash.com/photo-1681810908966-e8f8265c1743", alt: 'White skincare cream jar on pastel background', badge: 'New', inStock: true },
{ id: 6, name: 'Wooden Bookshelf 5-Tier', category: 'home', price: 8500, originalPrice: 10000, rating: 4.4, reviews: 67, image: "https://img.rocket.new/generatedImages/rocket_gen_img_157afa73c-1767790331126.png", alt: 'Modern wooden bookshelf in bright living room', badge: null, inStock: true },
{ id: 7, name: 'Canon EOS M50 Camera', category: 'electronics', price: 95000, originalPrice: 108000, rating: 4.9, reviews: 156, image: "https://images.unsplash.com/photo-1699676095808-20f0352443af", alt: 'Canon mirrorless camera on dark surface', badge: 'Top Rated', inStock: true },
{ id: 8, name: 'Running Shoes Pro', category: 'sports', price: 5200, originalPrice: 6500, rating: 4.5, reviews: 318, image: "https://img.rocket.new/generatedImages/rocket_gen_img_13cea4cec-1764662734824.png", alt: 'Bright red running shoes on white background', badge: null, inStock: true },
{ id: 9, name: 'Laptop Stand Adjustable', category: 'electronics', price: 3200, originalPrice: 4000, rating: 4.2, reviews: 94, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c2fd3248-1772537563935.png", alt: 'Aluminum laptop stand on clean desk', badge: null, inStock: true },
{ id: 10, name: 'Denim Jacket Classic', category: 'fashion', price: 4200, originalPrice: 5500, rating: 4.6, reviews: 178, image: "https://images.unsplash.com/photo-1667086724678-8c18a399f76d", alt: 'Classic blue denim jacket on white hanger', badge: null, inStock: true },
{ id: 11, name: 'Ceramic Mug Set (6pc)', category: 'home', price: 1200, originalPrice: 1600, rating: 4.7, reviews: 234, image: "https://images.unsplash.com/photo-1688938675788-657ea207453a", alt: 'Set of colorful ceramic mugs on wooden table', badge: null, inStock: true },
{ id: 12, name: 'Badminton Racket Set', category: 'sports', price: 2400, originalPrice: 3000, rating: 4.4, reviews: 112, image: "https://images.unsplash.com/photo-1687597778602-624a9438fe0b", alt: 'Badminton rackets on court surface', badge: null, inStock: false },
{ id: 13, name: 'Vitamin C Serum', category: 'beauty', price: 890, originalPrice: 1200, rating: 4.6, reviews: 345, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a9c2d298-1772544717079.png", alt: 'Vitamin C serum bottle with dropper on white surface', badge: 'Popular', inStock: true },
{ id: 14, name: 'Nepali History Book Set', category: 'books', price: 1500, originalPrice: 2000, rating: 4.9, reviews: 56, image: "https://img.rocket.new/generatedImages/rocket_gen_img_146e9cd43-1772524538610.png", alt: 'Stack of history books on wooden table', badge: null, inStock: true },
{ id: 15, name: 'Wireless Earbuds TWS', category: 'electronics', price: 6500, originalPrice: 8000, rating: 4.5, reviews: 287, image: "https://images.unsplash.com/photo-1632414968069-4a7768c2cc8e", alt: 'White wireless earbuds in charging case on dark surface', badge: null, inStock: true },
{ id: 16, name: 'Cotton Bedsheet Set', category: 'home', price: 2200, originalPrice: 2800, rating: 4.3, reviews: 143, image: "https://images.unsplash.com/photo-1672122576707-8810cf58d0f5", alt: 'White cotton bedsheet on neatly made bed in bright room', badge: null, inStock: true }];

const CATEGORIES = [
{ label: 'All', value: '' },
{ label: 'Electronics', value: 'electronics' },
{ label: 'Fashion', value: 'fashion' },
{ label: 'Home & Living', value: 'home' },
{ label: 'Sports', value: 'sports' },
{ label: 'Beauty', value: 'beauty' },
{ label: 'Decoration', value: 'decoration' },
{ label: 'Books', value: 'books' }];


const SORT_OPTIONS = [
{ label: 'Featured', value: 'featured' },
{ label: 'Price: Low to High', value: 'price-asc' },
{ label: 'Price: High to Low', value: 'price-desc' },
{ label: 'Top Rated', value: 'rating' }];


function StarRating({ rating, size = 'sm' }: {rating: number;size?: 'sm' | 'xs';}) {
  const sz = size === 'xs' ? 'w-3 h-3' : 'w-3.5 h-3.5';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) =>
      <svg key={star} className={`${sz} ${star <= Math.round(rating) ? 'text-accent' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
    </div>);

}

export default function ProductsPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCat, setSelectedCat] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceMax, setPriceMax] = useState(200000);
  const [minRating, setMinRating] = useState(0);
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const addToCart = (item: Omit<CartItem, 'qty'>) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id: number, qty: number) =>
  setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
  const removeItem = (id: number) =>
  setCartItems((prev) => prev.filter((i) => i.id !== id));

  const filtered = ALL_PRODUCTS.
  filter((p) => !selectedCat || p.category === selectedCat).
  filter((p) => p.price <= priceMax).
  filter((p) => p.rating >= minRating).
  filter((p) => !search || p.name.toLowerCase().includes(search.toLowerCase())).
  sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.prod-card').forEach((el, i) => {
              (el as HTMLElement).style.animation = `fadeSlideIn 0.5s ease-out ${i * 0.05}s forwards`;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, [filtered.length]);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header cartItems={cartItems} onCartOpen={() => setCartOpen(true)} onLoginOpen={() => setLoginOpen(true)} />

      <div className="pt-16">
        {/* Page Header */}
        <div className="border-b border-white/10 bg-[#0D0D0D]">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">All Products</h1>
            <p className="text-white/50 text-sm">Discover {ALL_PRODUCTS.length}+ products across all categories</p>

            {/* Search */}
            <div className="mt-5 relative max-w-lg">
              <Icon name="MagnifyingGlassIcon" size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all" />
              
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <div className="flex gap-6">
            {/* Sidebar Filter — Desktop */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div className="glass-card rounded-2xl p-5 sticky top-20 space-y-6">
                {/* Categories */}
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-3">Category</p>
                  <div className="space-y-1">
                    {CATEGORIES.map((cat) =>
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCat(cat.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedCat === cat.value ?
                      'bg-primary text-white font-semibold' : 'text-white/60 hover:text-white hover:bg-white/5'}`
                      }>
                      
                        {cat.label}
                      </button>
                    )}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-3">Max Price</p>
                  <input
                    type="range"
                    min={500}
                    max={200000}
                    step={500}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full accent-primary" />
                  
                  <div className="flex justify-between text-xs text-white/50 mt-1">
                    <span>₹500</span>
                    <span className="text-white font-medium">₹{priceMax.toLocaleString()}</span>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-3">Min Rating</p>
                  <div className="space-y-1">
                    {[0, 3, 4, 4.5].map((r) =>
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                      minRating === r ? 'bg-primary/20 text-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`
                      }>
                      
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) =>
                        <svg key={s} className={`w-3 h-3 ${s <= r ? 'text-accent' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        )}
                        </div>
                        <span>{r === 0 ? 'All' : `${r}+`}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Sort Bar + Mobile Filter */}
              <div className="flex items-center justify-between mb-5 gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden glass-card glass-card-hover rounded-xl px-3 py-2.5 flex items-center gap-2 text-sm text-white/70">
                    
                    <Icon name="AdjustmentsHorizontalIcon" size={16} />
                    Filters
                  </button>
                  <span className="text-white/50 text-sm hidden sm:block">{filtered.length} results</span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#1A1A1A] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white/80 focus:outline-none focus:border-primary/50 cursor-pointer">
                  
                  {SORT_OPTIONS.map((opt) =>
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                  )}
                </select>
              </div>

              {/* Category Chips */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3 mb-5">
                {CATEGORIES.map((cat) =>
                <button
                  key={cat.value}
                  onClick={() => setSelectedCat(cat.value)}
                  className={`flex-shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  selectedCat === cat.value ?
                  'bg-primary text-white' : 'glass-card text-white/60 hover:text-white'}`
                  }>
                  
                    {cat.label}
                  </button>
                )}
              </div>

              {/* Product Grid */}
              {filtered.length === 0 ?
              <div className="flex flex-col items-center justify-center py-24 text-center">
                  <Icon name="MagnifyingGlassIcon" size={48} className="text-white/20 mb-4" />
                  <p className="text-white/50 text-lg font-medium">No products found</p>
                  <p className="text-white/30 text-sm mt-2">Try adjusting your filters</p>
                  <button onClick={() => {setSelectedCat('');setSearch('');setMinRating(0);setPriceMax(200000);}} className="mt-4 bg-primary text-white rounded-xl px-6 py-2.5 text-sm font-semibold">
                    Clear Filters
                  </button>
                </div> :

              <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {filtered.map((product) =>
                <div key={product.id} className="prod-card opacity-0 glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col group">
                      <Link href="/product-detail" className="relative overflow-hidden aspect-square">
                        <AppImage
                      src={product.image}
                      alt={product.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    
                        {product.badge &&
                    <span className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {product.badge}
                          </span>
                    }
                        {!product.inStock &&
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white/70 text-xs font-semibold uppercase tracking-wider">Out of Stock</span>
                          </div>
                    }
                      </Link>
                      <div className="p-3 flex flex-col flex-1">
                        <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">{product.category}</p>
                        <Link href="/product-detail" className="text-white font-medium text-sm leading-snug hover:text-primary transition-colors line-clamp-2 mb-2">
                          {product.name}
                        </Link>
                        <div className="flex items-center gap-1.5 mb-2">
                          <StarRating rating={product.rating} size="xs" />
                          <span className="text-white/40 text-[10px]">({product.reviews})</span>
                        </div>
                        <div className="flex items-baseline gap-2 mb-3 mt-auto">
                          <span className="text-white font-bold text-sm">₹{product.price.toLocaleString()}</span>
                          <span className="text-white/30 text-xs line-through">₹{product.originalPrice.toLocaleString()}</span>
                        </div>
                        <button
                      disabled={!product.inStock}
                      onClick={() => product.inStock && addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
                      className={`w-full rounded-xl py-2.5 text-xs font-semibold transition-all ${
                      product.inStock ?
                      'bg-primary hover:bg-primary/90 text-white hover:scale-[1.02] active:scale-95' :
                      'bg-white/5 text-white/30 cursor-not-allowed'}`
                      }>
                      
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                )}
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {sidebarOpen &&
      <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]" onClick={() => setSidebarOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-[#141414] rounded-t-3xl z-[90] p-6 border-t border-white/10 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg">Filters</h3>
              <button onClick={() => setSidebarOpen(false)}>
                <Icon name="XMarkIcon" size={22} className="text-white/60" />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-3">Category</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) =>
                <button
                  key={cat.value}
                  onClick={() => setSelectedCat(cat.value)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedCat === cat.value ? 'bg-primary text-white' : 'glass-card text-white/60'}`
                  }>
                  
                      {cat.label}
                    </button>
                )}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-3">Max Price: ₹{priceMax.toLocaleString()}</p>
                <input type="range" min={500} max={200000} step={500} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="w-full accent-primary" />
              </div>
              <button onClick={() => setSidebarOpen(false)} className="w-full bg-primary text-white rounded-xl py-3 font-semibold">
                Apply Filters
              </button>
            </div>
          </div>
        </>
      }

      <Footer />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} onUpdateQty={updateQty} onRemove={removeItem} />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </main>);

}