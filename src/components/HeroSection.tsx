import React from 'react';
import { Sparkles, Calendar, ChevronRight, ShieldCheck, Wifi, UtensilsCrossed, Clock } from 'lucide-react';
import { HotelInfo } from '../types';

interface HeroSectionProps {
  hotelInfo: HotelInfo;
  onBookNow: () => void;
  onExploreRooms: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  hotelInfo,
  onBookNow,
  onExploreRooms
}) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-stone-950 text-white">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hotel_exterior_hero_1793871084312.jpg"
          alt="Manju Hotel Bangomunda exterior at dusk"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Deep luxury dual overlay for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/70 to-stone-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          {/* Subtle location kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-900/80 border border-[#D4AF37]/30 rounded-full text-xs font-medium text-stone-200 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Bangomunda, Odisha &bull; Pin 767040</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-stone-100 leading-[1.15]" style={{ textWrap: 'balance' }}>
            Welcome to <span className="text-[#D4AF37] italic font-normal">Manju Hotel</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-stone-200 font-light tracking-wide">
            {hotelInfo.tagline || 'Experience Comfort, Hospitality & Luxury'}
          </p>

          <p className="text-sm sm:text-base text-stone-300/90 max-w-2xl font-light leading-relaxed">
            Discover unmatched tranquility, well-appointed air-conditioned rooms, authentic regional and Indian culinary specialties, and genuine heartfelt hospitality in the heart of Bangomunda.
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onBookNow}
              className="flex items-center gap-2 px-8 py-3.5 bg-[#D4AF37] hover:bg-[#c59e2a] text-stone-950 font-semibold text-sm uppercase tracking-wider rounded transition-all shadow-lg hover:shadow-[#D4AF37]/20 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </button>

            <button
              onClick={onExploreRooms}
              className="flex items-center gap-2 px-7 py-3.5 bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-white font-medium text-sm tracking-wide rounded border border-stone-600/60 backdrop-blur-sm transition-all"
            >
              <span>Explore Rooms</span>
              <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom KPI Trust Bar (Full-width row below hero split) */}
      <div className="relative z-10 bg-stone-950/85 backdrop-blur-md border-t border-stone-800/80 py-4">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-stone-300">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-stone-900 border border-stone-800 text-[#D4AF37] shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-stone-100 block">24/7 Front Desk</span>
              <span className="text-stone-400">Always at your service</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-stone-900 border border-stone-800 text-[#D4AF37] shrink-0">
              <Wifi className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-stone-100 block">Free High-Speed Wi-Fi</span>
              <span className="text-stone-400">In every room & lounge</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-stone-900 border border-stone-800 text-[#D4AF37] shrink-0">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-stone-100 block">Fine Dining Restaurant</span>
              <span className="text-stone-400">Odia & Indian cuisines</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-stone-900 border border-stone-800 text-[#D4AF37] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-stone-100 block">100% Power Backup</span>
              <span className="text-stone-400">Full generator support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
