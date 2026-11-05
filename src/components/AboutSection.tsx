import React from 'react';
import { Award, Compass, HeartHandshake, MapPin, CheckCircle2 } from 'lucide-react';
import { HotelInfo } from '../types';

interface AboutSectionProps {
  hotelInfo: HotelInfo;
  onExploreRooms: () => void;
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  hotelInfo,
  onExploreRooms,
  onContactClick
}) => {
  return (
    <section id="about" className="py-20 bg-[#FBF9F5] text-stone-900 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl border border-stone-200">
              <img
                src="/src/assets/images/hotel_lobby_lounge_1793871087240.jpg"
                alt="Manju Hotel welcoming lobby reception"
                className="w-full h-[440px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block">
                  Bangomunda Hospitality
                </span>
                <p className="font-serif text-xl font-medium mt-1">
                  &ldquo;A haven of rest and warm Odia hospitality.&rdquo;
                </p>
              </div>
            </div>

            {/* Float badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:block bg-stone-900 text-stone-100 p-5 rounded shadow-xl border border-stone-800 max-w-xs">
              <div className="flex items-center gap-2 text-[#D4AF37] mb-1">
                <Award className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase tracking-wider">Trusted Choice</span>
              </div>
              <p className="text-xs text-stone-300">
                Preferred stay for business travelers, touring families, and destination celebrations.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial & Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#b89758]">
                <Compass className="w-3.5 h-3.5" />
                <span>Our Story & Philosophy</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
                Your Home Away From Home in Bangomunda
              </h2>
            </div>

            <p className="text-stone-700 leading-relaxed text-sm sm:text-base font-light">
              Located on Main Road in Bangomunda, Odisha (PIN 767040), <strong className="font-semibold text-stone-900">Manju Hotel</strong> was founded with a clear vision: to introduce world-class accommodation standards, hygienic luxury, and dependable guest services to travelers and local patrons.
            </p>

            <p className="text-stone-600 leading-relaxed text-sm font-light">
              Whether you are passing through Western Odisha on commercial business, attending a sacred local function, or exploring the cultural heritage of the region, our team ensures every detail—from sparkling clean linen to freshly cooked home-style meals—is executed with precision and courtesy.
            </p>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-xs text-stone-700 font-medium">Spotless Air-Conditioned Rooms</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-xs text-stone-700 font-medium">Uninterrupted Power & 24/7 Hot Water</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-xs text-stone-700 font-medium">Authentic Odia & North Indian Dining</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-xs text-stone-700 font-medium">24/7 Warm & Courteous Front Desk</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onExploreRooms}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 font-medium text-xs uppercase tracking-wider rounded transition-colors"
              >
                View Accommodations
              </button>
              <button
                onClick={onContactClick}
                className="px-6 py-2.5 border border-stone-300 hover:border-stone-400 text-stone-800 font-medium text-xs uppercase tracking-wider rounded transition-colors"
              >
                Get Directions & Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
