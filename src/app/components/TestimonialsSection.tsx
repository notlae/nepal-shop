'use client';
import React, { useEffect, useRef } from 'react';

const TESTIMONIALS = [
{
  name: 'Sushila Tamang',
  location: 'Hetauda',
  rating: 5,
  text: 'Ordered a Samsung phone on Tuesday, it arrived by Thursday — and delivery was completely free! The packaging was excellent and the product is exactly as described.',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1899c6c13-1765217063116.png",
  alt: 'Nepali woman smiling in natural outdoor light',
  product: 'Samsung Galaxy A55'
},
{
  name: 'Bikash Shrestha',
  location: 'Kathmandu',
  rating: 5,
  text: 'Finally a Nepali online store that actually works. The NPR 200 delivery charge to Kathmandu is very fair. Got my running shoes in 2 days. Will definitely order again.',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_104432afe-1763296205573.png",
  alt: 'Young Nepali man in casual clothes with pleasant expression',
  product: 'Running Shoes Pro'
},
{
  name: 'Puja Maharjan',
  location: 'Pokhara',
  rating: 4,
  text: 'Love the variety of products. The kurta set I bought is beautiful and the quality is great. Easy to navigate on mobile and the checkout process is smooth.',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fd05d413-1772074755141.png",
  alt: 'Young South Asian woman with warm smile in bright daylight',
  product: 'Nepali Cotton Kurta Set'
}];


export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.testimonial-reveal').forEach((el, i) => {
              (el as HTMLElement).style.animation = `fadeSlideIn 0.8s ease-out ${i * 0.15}s forwards`;
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
    <section ref={sectionRef} className="py-16 max-w-7xl mx-auto px-4 lg:px-8">
      <div className="text-center mb-12 testimonial-reveal opacity-0">
        <p className="text-xs uppercase tracking-widest text-white/50 mb-2">What customers say</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Loved Across Nepal</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TESTIMONIALS.map((t) =>
        <div key={t.name} className="testimonial-reveal opacity-0 glass-card rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) =>
            <svg key={star} className={`w-4 h-4 ${star <= t.rating ? 'text-accent' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            )}
            </div>
            <p className="text-white/70 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
            <div className="flex items-center gap-3 pt-2 border-t border-white/10">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img src={t.avatar} alt={t.alt} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-white/40 text-xs">{t.location} · {t.product}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>);

}