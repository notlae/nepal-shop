'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

<script src="main.js" defer type="module"></script>

interface CartItem { id: number; name: string; price: number; qty: number; }

interface HeaderProps {
  cartItems?: CartItem[];
  onCartOpen?: () => void;
  onLoginOpen?: () => void;
}

export default function Header({ cartItems = [], onCartOpen, onLoginOpen }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <AppLogo size={36} />
              <span className="font-bold text-lg tracking-tight text-white hidden sm:block">
                Nepal<span className="text-primary">Shop</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/" className="text-sm text-white/70 hover:text-white transition-colors">Home</Link>
              <Link href="/products" className="text-sm text-white/70 hover:text-white transition-colors">Products</Link>
              <Link href="/products?cat=electronics" className="text-sm text-white/70 hover:text-white transition-colors">Electronics</Link>
              <Link href="/products?cat=fashion" className="text-sm text-white/70 hover:text-white transition-colors">Fashion</Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Cart */}
              <button
                onClick={onCartOpen}
                className="relative glass-card glass-card-hover rounded-full p-2.5 transition-all"
                aria-label="Open cart"
              >
                <Icon name="ShoppingCartIcon" size={20} className="text-white/80" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center pulse-glow">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Login */}
              <button
                onClick={onLoginOpen}
                className="hidden sm:inline-flex items-center gap-2 glass-card glass-card-hover rounded-full px-4 py-2 text-sm font-medium text-white/90 transition-all"
              >
                <Icon name="UserIcon" size={16} className="text-white/70" />
                Sign In
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden glass-card rounded-full p-2.5"
                aria-label="Open menu"
              >
                <Icon name="Bars3Icon" size={20} className="text-white/80" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex flex-col">
          <div className="flex items-center justify-between px-4 h-16 border-b border-white/10">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <AppLogo size={32} />
              <span className="font-bold text-white">Nepal<span className="text-primary">Shop</span></span>
            </Link>
            <button onClick={() => setMobileOpen(false)} className="glass-card rounded-full p-2.5">
              <Icon name="XMarkIcon" size={20} className="text-white/80" />
            </button>
          </div>
          <nav className="flex flex-col gap-4 p-6 flex-1">
            {[
              { label: 'Home', href: '/' },
              { label: 'All Products', href: '/products' },
              { label: 'Electronics', href: '/products?cat=electronics' },
              { label: 'Fashion', href: '/products?cat=fashion' },
              { label: 'Home & Living', href: '/products?cat=home' },
              { label: 'Sports', href: '/products?cat=sports' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-2xl font-medium text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="p-6 border-t border-white/10">
            <button
              onClick={() => { setMobileOpen(false); onLoginOpen?.(); }}
              className="w-full bg-primary text-white rounded-xl py-3 font-semibold text-base"
            >
              Sign In with Google / Facebook
            </button>
          </div>
        </div>
      )}
    </>
  );
}