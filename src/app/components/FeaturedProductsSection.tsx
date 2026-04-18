'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { CartItem } from '@/components/CartDrawer';

const FEATURED_PRODUCTS = [
{
  id: 1,
  name: 'Samsung Galaxy A55 5G',
  category: 'Electronics',
  price: 52000,
  originalPrice: 58000,
  rating: 4.7,
  reviews: 284,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_155c8307b-1775384135168.png",
  alt: 'Samsung Galaxy smartphone on clean white background with screen lit',
  badge: 'Best Seller'
},
{
  id: 2,
  name: 'Nepali Cotton Kurta Set',
  category: 'Fashion',
  price: 2800,
  originalPrice: 3500,
  rating: 4.5,
  reviews: 126,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_151ed24e2-1772337220718.png",
  alt: 'Traditional cotton kurta in natural beige tones on white background',
  badge: 'Sale'
},
{
  id: 3,
  name: 'BoAt Rockerz 450 Headphones',
  category: 'Electronics',
  price: 4500,
  originalPrice: 6000,
  rating: 4.3,
  reviews: 412,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1119295e3-1765076790006.png",
  alt: 'Over-ear headphones in black on minimal white surface',
  badge: '25% Off'
},
{
  id: 4,
  name: 'Yoga Mat Premium',
  category: 'Sports',
  price: 1800,
  originalPrice: 2200,
  rating: 4.6,
  reviews: 89,
  image: "https://images.unsplash.com/photo-1567281105305-11c3e4ace86b",
  alt: 'Rolled purple yoga mat on wooden floor in bright studio',
  badge: null
},
{
  id: 5,
  name: 'Himalayan Face Cream',
  category: 'Beauty',
  price: 650,
  originalPrice: 850,
  rating: 4.8,
  reviews: 203,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_144dc3269-1771552474382.png",
  alt: 'White skincare cream jar with minimal label on pastel background',
  badge: 'New'
},
{
  id: 6,
  name: 'Wooden Bookshelf 5-Tier',
  category: 'Home & Living',
  price: 8500,
  originalPrice: 10000,
  rating: 4.4,
  reviews: 67,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_157afa73c-1767790331126.png",
  alt: 'Modern wooden bookshelf with books and plants in bright living room',
  badge: null
},
{
  id: 7,
  name: 'Canon EOS M50 Camera',
  category: 'Electronics',
  price: 95000,
  originalPrice: 108000,
  rating: 4.9,
  reviews: 156,
  image: "https://images.unsplash.com/photo-1699676095808-20f0352443af",
  alt: 'Canon mirrorless camera on dark surface with lens attached',
  badge: 'Top Rated'
},
{
  id: 8,
  name: 'Running Shoes Pro',
  category: 'Sports',
  price: 5200,
  originalPrice: 6500,
  rating: 4.5,
  reviews: 318,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_13cea4cec-1764662734824.png",
  alt: 'Bright red running shoes on white background with shadow',
  badge: null
}];


function StarRating({ rating }: {rating: number;}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) =>
      <svg key={star} className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? 'text-accent' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
    </div>);

}

interface Props {
  onAddToCart: (item: Omit<CartItem, 'qty'>) => void;
}

export default function FeaturedProductsSection({ onAddToCart }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.product-reveal').forEach((el, i) => {
              (el as HTMLElement).style.animation = `fadeSlideIn 0.6s ease-out ${i * 0.08}s forwards`;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 max-w-7xl mx-auto px-4 lg:px-8">
      <div className="flex items-end justify-between mb-10 product-reveal opacity-0">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Hand-picked for you</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Featured Products</h2>
        </div>
        <Link href="/products" className="hidden sm:inline-flex items-center gap-2 glass-card glass-card-hover rounded-full px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-all">
          See All
          <Icon name="ArrowRightIcon" size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {FEATURED_PRODUCTS.map((product) =>
        <div
          key={product.id}
          className="product-reveal opacity-0 glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col group">
          
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
            </Link>
            <div className="p-3 flex flex-col flex-1">
              <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1">{product.category}</p>
              <Link href="/product-detail" className="text-white font-medium text-sm leading-snug hover:text-primary transition-colors line-clamp-2 mb-2">
                {product.name}
              </Link>
              <div className="flex items-center gap-1.5 mb-2">
                <StarRating rating={product.rating} />
                <span className="text-white/40 text-[10px]">({product.reviews})</span>
              </div>
              <div className="flex items-baseline gap-2 mb-3 mt-auto">
                <span className="text-white font-bold text-base">₹{product.price.toLocaleString()}</span>
                <span className="text-white/30 text-xs line-through">₹{product.originalPrice.toLocaleString()}</span>
              </div>
              <button
              onClick={() => onAddToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-2.5 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95">
              
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </section>);

}