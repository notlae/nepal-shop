'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const categories = [
{
  name: 'Electronics',
  slug: 'electronics',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_196152baf-1772221159500.png",
  alt: 'Sleek modern electronics on dark desk with ambient blue lighting',
  count: '100+ items',
  span: 'col-span-2 row-span-2'
},
{
  name: 'Fashion',
  slug: 'fashion',
  image: "https://images.unsplash.com/photo-1731341869964-3206b5c08bc2",
  alt: 'Bright clothing rack with colorful garments in well-lit store',
  count: '100+ items',
  span: 'col-span-1 row-span-1'
},
{
  name: 'Home & Living',
  slug: 'home',
  image: "https://images.unsplash.com/photo-1723641879857-142fb90f9ea8",
  alt: 'Cozy modern living room with warm lighting and minimal decor',
  count: '100+ items',
  span: 'col-span-1 row-span-1'
},
{
  name: 'Sports',
  slug: 'sports',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f2fe2c86-1769366130779.png",
  alt: 'Athletic gear and sports equipment on bright white background',
  count: '100+ items',
  span: 'col-span-1 row-span-1'
},
{
  name: 'Beauty',
  slug: 'beauty',
  image: "https://images.unsplash.com/photo-1545735385-aa47cbbd92c2",
  alt: 'Beauty and skincare products arranged on pink pastel surface in bright light',
  count: '1,00+ items',
  span: 'col-span-1 row-span-1'
},
{
  name: 'decoration',
  slug: 'Decoration',
  image: "https://images.unsplash.com/photo-1545735385-aa47cbbd92c2",
  alt: 'Beauty and skincare products arranged on pink pastel surface in bright light',
  count: '100+ items',
  span: 'col-span-1 row-span-1'
},
{
  name: 'Books & Stationery',
  slug: 'books',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1197d933b-1772841006762.png",
  alt: 'Stack of colorful books on wooden table in warm library lighting',
  count: '100+ items',
  span: 'col-span-1 row-span-1'
}];


export default function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-child').forEach((el, i) => {
              (el as HTMLElement).style.animation = `fadeSlideIn 0.8s ease-out ${i * 0.1}s forwards`;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 max-w-7xl mx-auto px-4 lg:px-8">
      <div className="flex items-end justify-between mb-10 reveal-child opacity-0">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Browse by Category</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Shop Everything</h2>
        </div>
        <Link href="/products" className="hidden sm:inline-flex items-center gap-2 glass-card glass-card-hover rounded-full px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-all">
          View All
        </Link>
      </div>

      {/* Bento Grid
           Row 1: [col-1-2: Electronics cs-2 rs-2] [col-3: Fashion cs-1 rs-1]
           Row 2: [col-1-2: Electronics occupies] [col-3: Home & Living cs-1 rs-1]
           Row 3: [col-1: Sports cs-1] [col-2: Beauty cs-1] [col-3: Books cs-1]
           Placed 6/6 ✓
        */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[200px]">
        {/* Electronics — col-span-2 row-span-2 */}
        <Link
          href={`/products?cat=${categories[0].slug}`}
          className="reveal-child opacity-0 lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-2xl group">
          
          <AppImage
            src={categories[0].image}
            alt={categories[0].alt}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="text-white font-bold text-2xl">{categories[0].name}</p>
            <p className="text-white/60 text-sm mt-1">{categories[0].count}</p>
          </div>
          <div className="absolute top-4 right-4 glass-card rounded-full px-3 py-1 text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
            Shop →
          </div>
        </Link>

        {/* Fashion */}
        <Link
          href={`/products?cat=${categories[1].slug}`}
          className="reveal-child opacity-0 relative overflow-hidden rounded-2xl group">
          
          <AppImage
            src={categories[1].image}
            alt={categories[1].alt}
            fill
            sizes="(max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-semibold text-lg">{categories[1].name}</p>
            <p className="text-white/60 text-xs">{categories[1].count}</p>
          </div>
        </Link>

        {/* Home & Living */}
        <Link
          href={`/products?cat=${categories[2].slug}`}
          className="reveal-child opacity-0 relative overflow-hidden rounded-2xl group">
          
          <AppImage
            src={categories[2].image}
            alt={categories[2].alt}
            fill
            sizes="(max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-semibold text-lg">{categories[2].name}</p>
            <p className="text-white/60 text-xs">{categories[2].count}</p>
          </div>
        </Link>

        {/* Sports */}
        <Link
          href={`/products?cat=${categories[3].slug}`}
          className="reveal-child opacity-0 relative overflow-hidden rounded-2xl group">
          
          <AppImage
            src={categories[3].image}
            alt={categories[3].alt}
            fill
            sizes="(max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-semibold text-lg">{categories[3].name}</p>
            <p className="text-white/60 text-xs">{categories[3].count}</p>
          </div>
        </Link>

        {/* Beauty */}
        <Link
          href={`/products?cat=${categories[4].slug}`}
          className="reveal-child opacity-0 relative overflow-hidden rounded-2xl group">
          
          <AppImage
            src={categories[4].image}
            alt={categories[4].alt}
            fill
            sizes="(max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-semibold text-lg">{categories[4].name}</p>
            <p className="text-white/60 text-xs">{categories[4].count}</p>
          </div>
        </Link>

        {/* Books & Stationery */}
        <Link
          href={`/products?cat=${categories[5].slug}`}
          className="reveal-child opacity-0 relative overflow-hidden rounded-2xl group">
          
          <AppImage
            src={categories[5].image}
            alt={categories[5].alt}
            fill
            sizes="(max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-semibold text-lg">{categories[5].name}</p>
            <p className="text-white/60 text-xs">{categories[5].count}</p>
          </div>
        </Link>
      </div>
    </section>);

}