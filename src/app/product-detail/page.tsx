'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import CartDrawer, { CartItem } from '@/components/CartDrawer';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const PRODUCT = {
  id: 7,
  name: 'Canon EOS M50 Mark II Mirrorless Camera',
  category: 'Electronics',
  price: 95000,
  originalPrice: 108000,
  discount: 12,
  rating: 4.9,
  totalReviews: 156,
  inStock: true,
  sku: 'CNM50MK2-BLK',
  description: `The Canon EOS M50 Mark II is a compact mirrorless camera ideal for photography enthusiasts and content creators. With its 24.1MP APS-C CMOS sensor, DIGIC 8 image processor, and Dual Pixel CMOS AF, you get fast and accurate autofocus for both photos and videos. The camera supports 4K video recording and features Eye Detection AF, making it perfect for vlogging and portrait photography.`,
  specifications: [
  { label: 'Sensor', value: '24.1MP APS-C CMOS' },
  { label: 'Processor', value: 'DIGIC 8' },
  { label: 'Video', value: '4K UHD, 1080p 60fps' },
  { label: 'AF System', value: 'Dual Pixel CMOS AF' },
  { label: 'Display', value: '3.0" Vari-Angle Touchscreen' },
  { label: 'Battery Life', value: '305 shots (LCD)' },
  { label: 'Weight', value: '387g (with battery & card)' },
  { label: 'Connectivity', value: 'Wi-Fi, Bluetooth' }],

  images: [
  { src: "https://images.unsplash.com/photo-1654799092625-d03d0fa3b6d5", alt: 'Canon EOS M50 camera front view on dark background with lens attached' },
  { src: "https://images.unsplash.com/photo-1501683978312-2782c3ba368c", alt: 'Camera lens detail close-up showing glass elements in studio lighting' },
  { src: "https://images.unsplash.com/photo-1722842179318-c0098116912e", alt: 'Camera body side view showing ports and controls in soft light' },
  { src: "https://images.unsplash.com/photo-1703354521554-3aee6d85f2fa", alt: 'Camera with strap on wooden table in warm ambient lighting' }],

  colors: ['Black', 'White'],
  variants: ['Body Only', 'With 15-45mm Kit Lens', 'With 18-150mm Lens']
};

const REVIEWS = [
{ id: 1, name: 'Rajan Adhikari', location: 'Kathmandu', rating: 5, date: '15 Mar 2026', title: 'Excellent camera for the price', text: 'I have been using this camera for 3 months now and I am absolutely impressed. The autofocus is lightning fast and the image quality is stunning. Perfect for YouTube videos.', verified: true },
{ id: 2, name: 'Anita Gurung', location: 'Pokhara', rating: 5, date: '02 Feb 2026', title: 'Best mirrorless for beginners', text: 'Coming from a DSLR, the transition was seamless. The touchscreen is responsive and the Eye AF is a game changer for portraits. Highly recommended for travel photography.', verified: true },
{ id: 3, name: 'Dipesh Karki', location: 'Butwal', rating: 4, date: '18 Jan 2026', title: 'Great camera, minor battery issue', text: 'Overall very satisfied with the purchase. Image quality is top notch. Only complaint is battery life could be better for all-day shoots. Otherwise a fantastic buy.', verified: true },
{ id: 4, name: 'Sunita Thapa', location: 'Hetauda', rating: 5, date: '05 Jan 2026', title: 'Delivered super fast to Hetauda!', text: 'Ordered on Monday and it arrived by Tuesday with free delivery. The camera exceeded my expectations. The 4K video quality is incredible for social media content.', verified: true }];


const RELATED_PRODUCTS = [
{ id: 3, name: 'Boät Rockerz 450 Headphones', price: 4500, image: "https://images.unsplash.com/photo-1674230100409-5fc79a435c6b", alt: 'Over-ear headphones on white surface', rating: 4.3 },
{ id: 15, name: 'Wireless Earbuds TWS', price: 6500, image: "https://images.unsplash.com/photo-1612622837671-5a94ceef08f2", alt: 'White wireless earbuds in charging case', rating: 4.5 },
{ id: 9, name: 'Laptop Stand Adjustable', price: 3200, image: "https://img.rocket.new/generatedImages/rocket_gen_img_124f08103-1766608242767.png", alt: 'Aluminum laptop stand on desk', rating: 4.2 },
{ id: 1, name: 'Samsung Galaxy A55 5G', price: 52000, image: "https://images.unsplash.com/photo-1677995432796-c2518daf8e77", alt: 'Samsung Galaxy smartphone', rating: 4.7 }];


function StarRating({ rating, interactive = false, onRate }: {rating: number;interactive?: boolean;onRate?: (r: number) => void;}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) =>
      <button
        key={star}
        type="button"
        disabled={!interactive}
        onClick={() => interactive && onRate?.(star)}
        onMouseEnter={() => interactive && setHover(star)}
        onMouseLeave={() => interactive && setHover(0)}
        className={interactive ? 'cursor-pointer' : 'cursor-default'}>
        
          <svg
          className={`w-4 h-4 transition-colors ${
          star <= (interactive ? hover || rating : Math.round(rating)) ?
          'text-accent' : 'text-white/20'}`
          }
          fill="currentColor"
          viewBox="0 0 20 20">
          
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      )}
    </div>);

}

export default function ProductDetailPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(PRODUCT.colors[0]);
  const [selectedVariant, setSelectedVariant] = useState(PRODUCT.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [addedToCart, setAddedToCart] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(0);
  const imgRef = useRef<HTMLDivElement>(null);

  const addToCart = (item: Omit<CartItem, 'qty'>) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + quantity } : i);
      return [...prev, { ...item, qty: quantity }];
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const updateQty = (id: number, qty: number) =>
  setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
  const removeItem = (id: number) =>
  setCartItems((prev) => prev.filter((i) => i.id !== id));

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 100;
    const y = (e.clientY - rect.top) / rect.height * 100;
    setZoomPos({ x, y });
  };

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: REVIEWS.filter((r) => r.rating === star).length,
    pct: Math.round(REVIEWS.filter((r) => r.rating === star).length / REVIEWS.length * 100)
  }));

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header cartItems={cartItems} onCartOpen={() => setCartOpen(true)} onLoginOpen={() => setLoginOpen(true)} />

      <div className="pt-16">
        {/* Breadcrumb */}
        <div className="border-b border-white/10 bg-[#0D0D0D]">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-xs text-white/40">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Icon name="ChevronRightIcon" size={12} />
              <Link href="/products" className="hover:text-white transition-colors">Products</Link>
              <Icon name="ChevronRightIcon" size={12} />
              <Link href="/products?cat=electronics" className="hover:text-white transition-colors">Electronics</Link>
              <Icon name="ChevronRightIcon" size={12} />
              <span className="text-white/70 truncate max-w-[160px]">{PRODUCT.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Main */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
            {/* Left: Image Gallery */}
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <div
                ref={imgRef}
                className="relative rounded-2xl overflow-hidden bg-[#141414] border border-white/10 cursor-zoom-in select-none"
                style={{ aspectRatio: '1/1' }}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleImageMouseMove}>
                
                <AppImage
                  src={PRODUCT.images[activeImage].src}
                  alt={PRODUCT.images[activeImage].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`object-cover transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                  style={isZoomed ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
                  priority />
                
                {isZoomed &&
                <div className="absolute top-3 right-3 glass-card rounded-full px-2.5 py-1 text-xs text-white/60 pointer-events-none">
                    <Icon name="MagnifyingGlassPlusIcon" size={12} className="inline mr-1" />
                    Zoomed
                  </div>
                }
                <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {PRODUCT.discount}% OFF
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {PRODUCT.images.map((img, idx) =>
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImage === idx ? 'border-primary' : 'border-white/10 hover:border-white/30'}`
                  }>
                  
                    <AppImage src={img.src} alt={`Thumbnail ${idx + 1}`} fill sizes="64px" className="object-cover" />
                  </button>
                )}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="flex flex-col gap-5">
              {/* Title & Rating */}
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-2">{PRODUCT.category}</p>
                <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-3">{PRODUCT.name}</h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <StarRating rating={PRODUCT.rating} />
                  <span className="text-accent font-bold text-sm">{PRODUCT.rating}</span>
                  <span className="text-white/40 text-sm">({PRODUCT.totalReviews} reviews)</span>
                  <span className="text-green-400 text-sm font-medium">✓ In Stock</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-white">₹{PRODUCT.price.toLocaleString()}</span>
                <span className="text-white/40 text-lg line-through">₹{PRODUCT.originalPrice.toLocaleString()}</span>
                <span className="bg-primary/20 text-primary text-sm font-semibold px-2 py-0.5 rounded-full">Save ₹{(PRODUCT.originalPrice - PRODUCT.price).toLocaleString()}</span>
              </div>

              {/* Color Selector */}
              <div>
                <p className="text-sm font-semibold text-white mb-2">
                  Color: <span className="text-white/60 font-normal">{selectedColor}</span>
                </p>
                <div className="flex gap-2">
                  {PRODUCT.colors.map((color) =>
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    selectedColor === color ?
                    'bg-primary border-primary text-white' : 'glass-card border-white/10 text-white/70 hover:border-white/30'}`
                    }>
                    
                      {color}
                    </button>
                  )}
                </div>
              </div>

              {/* Variant Selector */}
              <div>
                <p className="text-sm font-semibold text-white mb-2">
                  Bundle: <span className="text-white/60 font-normal">{selectedVariant}</span>
                </p>
                <div className="flex flex-col gap-2">
                  {PRODUCT.variants.map((variant) =>
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm border transition-all text-left ${
                    selectedVariant === variant ?
                    'bg-primary/10 border-primary text-white' : 'glass-card border-white/10 text-white/70 hover:border-white/30'}`
                    }>
                    
                      <span>{variant}</span>
                      {selectedVariant === variant && <Icon name="CheckCircleIcon" size={16} className="text-primary" variant="solid" />}
                    </button>
                  )}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <p className="text-sm font-semibold text-white">Quantity:</p>
                <div className="flex items-center gap-0 glass-card rounded-xl overflow-hidden border border-white/10">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-all text-lg font-medium">
                    
                    −
                  </button>
                  <span className="px-4 py-2.5 text-white font-semibold text-sm min-w-[3rem] text-center border-x border-white/10">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-all text-lg font-medium">
                    
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => addToCart({ id: PRODUCT.id, name: PRODUCT.name, price: PRODUCT.price, image: PRODUCT.images[0].src, variant: `${selectedColor} · ${selectedVariant}` })}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-base transition-all ${
                  addedToCart ?
                  'bg-green-500 text-white scale-[0.98]' :
                  'glass-card glass-card-hover text-white hover:scale-[1.02] active:scale-95'}`
                  }>
                  
                  <Icon name="ShoppingCartIcon" size={18} />
                  {addedToCart ? 'Added!' : 'Add to Cart'}
                </button>
                <button
                  onClick={() => {
                    addToCart({ id: PRODUCT.id, name: PRODUCT.name, price: PRODUCT.price, image: PRODUCT.images[0].src });
                    setCartOpen(true);
                  }}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl py-3.5 font-bold text-base transition-all hover:scale-[1.02] active:scale-95">
                  
                  Buy Now
                </button>
              </div>

              {/* Shipping Info */}
              <div className="glass-card rounded-2xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Icon name="TruckIcon" size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white">Free Delivery in Hetauda</p>
                    <p className="text-xs text-white/50">No charge for Hetauda city orders</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="GlobeAltIcon" size={18} className="text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white">NPR 200 Flat — All Nepal</p>
                    <p className="text-xs text-white/50">Kathmandu, Pokhara, Butwal & everywhere else</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="ArrowPathIcon" size={18} className="text-white/50 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white">7-Day Returns</p>
                    <p className="text-xs text-white/50">Easy return policy for damaged items</p>
                  </div>
                </div>
              </div>

              {/* SKU */}
              <p className="text-xs text-white/30">SKU: {PRODUCT.sku}</p>
            </div>
          </div>

          {/* Tabs: Description / Specs / Reviews */}
          <div className="mt-12">
            <div className="flex gap-1 border-b border-white/10 mb-8 overflow-x-auto scrollbar-hide">
              {(['description', 'specs', 'reviews'] as const).map((tab) =>
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-5 py-3 text-sm font-semibold capitalize transition-all border-b-2 ${
                activeTab === tab ?
                'border-primary text-white' : 'border-transparent text-white/50 hover:text-white'}`
                }>
                
                  {tab === 'reviews' ? `Reviews (${PRODUCT.totalReviews})` : tab}
                </button>
              )}
            </div>

            {/* Description Tab */}
            {activeTab === 'description' &&
            <div className="prose prose-invert max-w-none">
                <p className="text-white/70 leading-relaxed text-base">{PRODUCT.description}</p>
              </div>
            }

            {/* Specs Tab */}
            {activeTab === 'specs' &&
            <div className="max-w-2xl">
                <div className="rounded-2xl overflow-hidden border border-white/10">
                  {PRODUCT.specifications.map((spec, idx) =>
                <div
                  key={spec.label}
                  className={`flex items-start gap-4 px-5 py-4 ${idx % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}`}>
                  
                      <span className="text-white/50 text-sm w-32 flex-shrink-0">{spec.label}</span>
                      <span className="text-white text-sm font-medium">{spec.value}</span>
                    </div>
                )}
                </div>
              </div>
            }

            {/* Reviews Tab */}
            {activeTab === 'reviews' &&
            <div className="space-y-8">
                {/* Rating Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
                  <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center">
                    <p className="text-6xl font-bold text-white mb-1">{PRODUCT.rating}</p>
                    <StarRating rating={PRODUCT.rating} />
                    <p className="text-white/50 text-sm mt-2">{PRODUCT.totalReviews} reviews</p>
                  </div>
                  <div className="glass-card rounded-2xl p-6 space-y-2">
                    {ratingBreakdown.map(({ star, count, pct }) =>
                  <div key={star} className="flex items-center gap-3">
                        <span className="text-xs text-white/50 w-4">{star}</span>
                        <svg className="w-3 h-3 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden">
                          <div className="h-full bg-accent rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-white/40 w-6 text-right">{count}</span>
                      </div>
                  )}
                  </div>
                </div>

                {/* Review List */}
                <div className="space-y-4 max-w-3xl">
                  {REVIEWS.map((review) =>
                <div key={review.id} className="glass-card rounded-2xl p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-white text-sm">{review.name}</p>
                            {review.verified &&
                        <span className="flex items-center gap-1 text-green-400 text-[10px] font-medium">
                                <Icon name="CheckBadgeIcon" size={12} variant="solid" />
                                Verified
                              </span>
                        }
                          </div>
                          <p className="text-white/40 text-xs">{review.location} · {review.date}</p>
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="text-white/70 text-sm leading-relaxed font-semibold mb-1">{review.title}</p>
                      <p className="text-white/60 text-sm leading-relaxed">{review.text}</p>
                    </div>
                )}
                </div>

                {/* Write a Review */}
                <div className="glass-card rounded-2xl p-6 max-w-2xl">
                  <h3 className="text-white font-bold text-lg mb-5">Write a Review</h3>
                  <form onSubmit={(e) => {e.preventDefault();alert('Review submitted! (Connect backend to save)');}} className="space-y-4">
                    <div>
                      <p className="text-sm text-white/60 mb-2">Your Rating</p>
                      <StarRating rating={newReviewRating} interactive onRate={setNewReviewRating} />
                    </div>
                    <div>
                      <input
                      type="text"
                      placeholder="Review title"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-all" />
                    
                    </div>
                    <div>
                      <textarea
                      rows={4}
                      placeholder="Share your experience with this product..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-all resize-none" />
                    
                    </div>
                    <button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95">
                    
                      Submit Review
                    </button>
                  </form>
                </div>
              </div>
            }
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-1">You may also like</p>
                <h2 className="text-2xl font-bold text-white">Related Products</h2>
              </div>
              <Link href="/products?cat=electronics" className="hidden sm:inline-flex items-center gap-2 glass-card glass-card-hover rounded-full px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-all">
                View All
                <Icon name="ArrowRightIcon" size={14} />
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {RELATED_PRODUCTS.map((product) =>
              <Link
                key={product.id}
                href="/product-detail"
                className="flex-shrink-0 w-48 sm:w-56 glass-card glass-card-hover rounded-2xl overflow-hidden group">
                
                  <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
                    <AppImage
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="224px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  
                  </div>
                  <div className="p-3">
                    <p className="text-white text-sm font-medium line-clamp-2 mb-2 leading-snug">{product.name}</p>
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) =>
                      <svg key={s} className={`w-3 h-3 ${s <= Math.round(product.rating) ? 'text-accent' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                      )}
                      </div>
                      <span className="text-white/40 text-[10px]">{product.rating}</span>
                    </div>
                    <p className="text-white font-bold text-sm">₹{product.price.toLocaleString()}</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} onUpdateQty={updateQty} onRemove={removeItem} />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </main>);

}