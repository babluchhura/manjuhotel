import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '../data/initialData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-stone-50 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#b89758] block">
            Guest Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Words From Our Honored Guests
          </h2>
          <p className="text-stone-600 text-sm font-light leading-relaxed">
            Discover why business travelers, touring families, and pilgrims choose Manju Hotel for their stay in Bangomunda.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-lg border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-300 group-hover:text-[#D4AF37] transition-colors" />
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Author & Stay Details */}
              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-stone-900">
                    {t.name}
                  </h4>
                  <span className="text-[11px] text-stone-500 block">
                    {t.location}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block font-sans">
                    Stayed: {t.roomStayed}
                  </span>
                  {t.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      Verified Guest
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
