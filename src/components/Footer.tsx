import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2">
            <AppLogo size={32} />
            <span className="font-bold text-white">Nepal<span className="text-primary">Shop</span></span>
          </Link>
          <nav className="flex flex-wrap items-center gap-6 justify-center">
            <Link href="/products" className="text-sm text-white/60 hover:text-white transition-colors font-medium">Products</Link>
            <Link href="/products?cat=electronics" className="text-sm text-white/60 hover:text-white transition-colors font-medium">Electronics</Link>
            <Link href="/products?cat=fashion" className="text-sm text-white/60 hover:text-white transition-colors font-medium">Fashion</Link>
            <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors font-medium">Privacy</Link>
            <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors font-medium">Terms</Link>
          </nav>
          <p className="text-sm text-white/40">© 2026 NepalShop</p>
        </div>
      </div>
    </footer>
  );
}