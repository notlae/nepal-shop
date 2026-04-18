import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function ShippingBanner() {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 lg:px-8">
      <div className="rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #1a0a0f 0%, #2d0d18 40%, #1a0a0f 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #DC143C 0%, transparent 60%), radial-gradient(circle at 80% 50%, #F59E0B 0%, transparent 60%)' }} />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left */}
          <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                <Icon name="TruckIcon" size={24} className="text-green-400" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">Free Delivery</p>
                <p className="text-green-400 text-sm font-semibold">Hetauda City</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Live in Hetauda? Enjoy completely free delivery on all your orders — no minimum order required. Shop as often as you like.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-white/40 uppercase tracking-widest">
              <Icon name="MapPinIcon" size={14} className="text-green-400" />
              Hetauda, Makwanpur
            </div>
          </div>

          {/* Right */}
          <div className="p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center">
                <Icon name="GlobeAltIcon" size={24} className="text-accent" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">All of Nepal</p>
                <p className="text-accent text-sm font-semibold">NPR 200 Flat</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              We deliver to Kathmandu, Pokhara, Butwal, Chitwan and every corner of Nepal for a single flat rate of NPR 200 — no surprises at checkout.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Kathmandu', 'Pokhara', 'Butwal', 'Chitwan', 'Birgunj', 'Biratnagar']?.map((city) => (
                <span key={city} className="glass-card rounded-full px-3 py-1 text-xs text-white/60">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}