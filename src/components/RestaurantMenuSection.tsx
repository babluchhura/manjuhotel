import React, { useState } from 'react';
import { UtensilsCrossed, Phone, Sparkles, Coffee } from 'lucide-react';
import { INITIAL_MENU } from '../data/initialData';
import { MenuItem } from '../types';

export const RestaurantMenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filterVegOnly, setFilterVegOnly] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'Odia Delicacies', label: 'Odia Specials' },
    { id: 'Breakfast', label: 'Breakfast' },
    { id: 'North Indian', label: 'North Indian' },
    { id: 'Biryani & Rice', label: 'Biryani & Rice' },
    { id: 'Chinese & Tandoor', label: 'Tandoor & Chinese' },
    { id: 'Beverages & Desserts', label: 'Beverages & Sweets' }
  ];

  let items = activeCategory === 'all'
    ? INITIAL_MENU
    : INITIAL_MENU.filter(m => m.category === activeCategory);

  if (filterVegOnly) {
    items = items.filter(m => m.isVeg);
  }

  return (
    <section id="restaurant" className="py-20 bg-[#FBF9F5] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Banner with Restaurant Image */}
        <div className="relative rounded-lg overflow-hidden mb-16 border border-stone-200 shadow-xl aspect-[21/9] sm:aspect-[24/9]">
          <img
            src="/src/assets/images/restaurant_dining_1793871086578.jpg"
            alt="The Royal Dining Hall at Manju Hotel"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 text-white max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Fine Dining &amp; Room Service
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              The Royal Restaurant &amp; In-Room Dining
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 font-light leading-relaxed hidden sm:block">
              Savor rich gastronomic flavors of Western Odisha alongside traditional North &amp; South Indian cuisines, prepared freshly by skilled culinary chefs using locally sourced fresh farm ingredients.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <a
                href="tel:+919668612323"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#c59e2a] text-stone-950 text-xs font-semibold uppercase tracking-wider rounded transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call for Food Orders: +91 9668612323</span>
              </a>
            </div>
          </div>
        </div>

        {/* Section Title & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#b89758] block">
              Curated Menu
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
              Dishes &amp; Culinary Offerings
            </h3>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Veg toggle */}
            <button
              onClick={() => setFilterVegOnly(!filterVegOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded border transition-colors ${
                filterVegOnly
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                  : 'bg-white border-stone-300 text-stone-700 hover:border-stone-400'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full border border-emerald-600 flex items-center justify-center p-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 block"></span>
              </span>
              <span>Pure Veg Only</span>
            </button>

            {/* Category tabs */}
            <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg overflow-x-auto">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                    activeCategory === c.id
                      ? 'bg-stone-900 text-stone-100 shadow-sm'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-lg bg-white border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-2.5">
                    {/* Veg / Non-Veg Mark */}
                    <span
                      className={`w-4 h-4 border rounded flex items-center justify-center shrink-0 mt-0.5 ${
                        item.isVeg ? 'border-emerald-600' : 'border-red-600'
                      }`}
                      title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          item.isVeg ? 'bg-emerald-600' : 'bg-red-600'
                        }`}
                      />
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-base font-semibold text-stone-900">
                          {item.name}
                        </h4>
                        {item.isChefSpecial && (
                          <span className="text-[10px] font-semibold text-[#b89758] flex items-center gap-0.5">
                            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                            Chef Special
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-stone-400 font-sans block mt-0.5">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <span className="font-serif text-lg font-bold text-stone-900 tabular-nums shrink-0">
                    ₹{item.price}
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed font-light pl-6">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* In-Room Dining Note */}
        <div className="mt-8 text-center text-xs text-stone-500">
          <p>
            Restaurant Operational Hours: Breakfast: 7:30 AM &ndash; 10:30 AM &bull; Lunch: 12:30 PM &ndash; 3:30 PM &bull; Dinner: 7:30 PM &ndash; 10:30 PM
          </p>
          <p className="mt-1">
            Dial 9 from room telephone or call <strong className="text-stone-800">+91 9668612323</strong> for immediate in-room food delivery.
          </p>
        </div>
      </div>
    </section>
  );
};
