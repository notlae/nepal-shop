'use client';
import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
  variant?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}

const FREE_DELIVERY_THRESHOLD = 0;
const OUTSIDE_HETAUDA_CHARGE = 200;

export default function CartDrawer({ isOpen, onClose, items, onUpdateQty, onRemove }: CartDrawerProps) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]" onClick={onClose} />}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#141414] border-l border-white/10 z-[90] flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="font-bold text-lg text-white">Your Cart</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <Icon name="XMarkIcon" size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <Icon name="ShoppingCartIcon" size={48} className="text-white/20" />
              <p className="text-white/50 text-sm">Your cart is empty</p>
              <Link
                href="/products"
                onClick={onClose}
                className="bg-primary text-white rounded-xl px-6 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 glass-card rounded-xl p-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <AppImage src={item.image} alt={item.name} width={64} height={64} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{item.name}</p>
                  {item.variant && <p className="text-xs text-white/50 mt-0.5">{item.variant}</p>}
                  <p className="text-primary font-bold text-sm mt-1">₹{item.price.toLocaleString()}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQty(item.id, Math.max(1, item.qty - 1))}
                      className="w-6 h-6 rounded-full glass-card flex items-center justify-center text-white/70 hover:text-white text-xs"
                    >
                      −
                    </button>
                    <span className="text-sm text-white w-4 text-center">{item.qty}</span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.qty + 1)}
                      className="w-6 h-6 rounded-full glass-card flex items-center justify-center text-white/70 hover:text-white text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-white/30 hover:text-red-400 transition-colors self-start mt-1">
                  <Icon name="TrashIcon" size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-5 border-t border-white/10 space-y-3">
            <div className="flex justify-between text-sm text-white/70">
              <span>Subtotal</span>
              <span className="text-white font-semibold">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-white/70">
              <span>Delivery (Hetauda)</span>
              <span className="text-green-400 font-semibold">Free</span>
            </div>
            <div className="flex justify-between text-sm text-white/70">
              <span>Delivery (Other Nepal)</span>
              <span className="text-white font-semibold">₹{OUTSIDE_HETAUDA_CHARGE}</span>
            </div>
            <button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-3.5 font-bold text-base transition-colors mt-2">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}