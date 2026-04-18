'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / 800, 1);
      const blur = progress * 20;
      const brightness = 1 - progress * 0.7;
      const scale = 1 + progress * 0.05;
      bgRef.current.style.filter = `blur(${blur}px) brightness(${brightness})`;
      bgRef.current.style.transform = `scale(${scale})`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Cinematic BG */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&q=80')`,
        }}
        aria-hidden="true"
      />
      {/* Gradient scrim — dark at bottom for white text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-32 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end">
          {/* Left */}
          <div
            className="opacity-0"
            style={{ animation: 'slideInBlur 1.2s ease-out 0.4s forwards' }}
          >
            <div
              className="inline-flex items-center gap-2 glass-card rounded-full px-3 py-1.5 text-xs text-white/70 uppercase tracking-widest mb-6 opacity-0"
              style={{ animation: 'fadeInSlide 0.8s ease-out 0.6s forwards' }}
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Free Delivery in Hetauda
            </div>
            <h1
              className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tighter text-white mb-6 opacity-0"
              style={{ animation: 'fadeInUp 1s ease-out 0.2s forwards' }}
            >
              Shop<br />
              <span className="text-gradient-crimson">Nepal</span><br />
              Online.
            </h1>
            <p
              className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-md mb-8 opacity-0"
              style={{ animation: 'fadeInUp 0.8s ease-out 0.8s forwards' }}
            >
              Electronics, fashion, home goods & more — delivered anywhere in Nepal. Free delivery in Hetauda.
            </p>
            <div
              className="flex flex-wrap gap-4 items-center opacity-0"
              style={{ animation: 'fadeInScale 0.8s ease-out 1s forwards' }}
            >
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-3.5 font-semibold text-base transition-all hover:scale-105 active:scale-95"
              >
                Shop Now
                <Icon name="ArrowRightIcon" size={18} />
              </Link>
              <Link
                href="/products?cat=electronics"
                className="inline-flex items-center gap-2 glass-card glass-card-hover rounded-full px-6 py-3.5 text-sm font-medium text-white/90 transition-all"
              >
                <Icon name="DevicePhoneMobileIcon" size={16} className="text-white/70" />
                Electronics
              </Link>
            </div>
          </div>

          {/* Right — stat chips */}
          <div
            className="flex flex-col gap-3 opacity-0"
            style={{ animation: 'fadeInSlide 0.8s ease-out 1.2s forwards' }}
          >
            {[
              { icon: 'ShoppingBagIcon', label: '10,000+ Products', sub: 'All categories' },
              { icon: 'TruckIcon', label: 'Free in Hetauda', sub: 'NPR 200 elsewhere' },
              { icon: 'StarIcon', label: '4.8/5 Rating', sub: 'From 3,200+ reviews' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card rounded-2xl px-5 py-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name={stat.icon as 'StarIcon'} size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{stat.label}</p>
                  <p className="text-white/50 text-xs">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="flex items-center gap-2 mt-16 text-white/40 text-xs uppercase tracking-widest opacity-0"
          style={{ animation: 'fadeInUp 0.6s ease-out 1.6s forwards' }}
        >
          <Icon name="ChevronDownIcon" size={16} className="animate-bounce" />
          Scroll to explore
        </div>
      </div>
    </section>
  );
}