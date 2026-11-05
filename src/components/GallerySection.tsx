import React, { useState } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { INITIAL_GALLERY } from '../data/initialData';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === 'all'
    ? INITIAL_GALLERY
    : INITIAL_GALLERY.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-stone-900 text-stone-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] block">
              Visual Tour
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-100 tracking-tight" style={{ textWrap: 'balance' }}>
              The Manju Hotel Experience
            </h2>
            <p className="text-stone-400 text-sm max-w-xl font-light">
              Take a visual journey through our architecture, plush guest suites, welcoming lobby, and the royal restaurant in Bangomunda.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-800/80 rounded-lg overflow-x-auto border border-stone-700/60">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeCategory === 'all' ? 'bg-[#D4AF37] text-stone-950 font-semibold' : 'text-stone-300 hover:text-white'
              }`}
            >
              All Views
            </button>
            <button
              onClick={() => setActiveCategory('rooms')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeCategory === 'rooms' ? 'bg-[#D4AF37] text-stone-950 font-semibold' : 'text-stone-300 hover:text-white'
              }`}
            >
              Rooms &amp; Suites
            </button>
            <button
              onClick={() => setActiveCategory('dining')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeCategory === 'dining' ? 'bg-[#D4AF37] text-stone-950 font-semibold' : 'text-stone-300 hover:text-white'
              }`}
            >
              Restaurant
            </button>
            <button
              onClick={() => setActiveCategory('hotel')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeCategory === 'hotel' ? 'bg-[#D4AF37] text-stone-950 font-semibold' : 'text-stone-300 hover:text-white'
              }`}
            >
              Exterior &amp; Facade
            </button>
            <button
              onClick={() => setActiveCategory('reception')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeCategory === 'reception' ? 'bg-[#D4AF37] text-stone-950 font-semibold' : 'text-stone-300 hover:text-white'
              }`}
            >
              Lobby &amp; Reception
            </button>
          </div>
        </div>

        {/* Gallery Grid (Bento style dynamic spans with 3D Hover) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="relative aspect-[4/3] rounded-lg overflow-hidden bg-stone-800 border border-stone-800 group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:rotate-1 hover:scale-[1.02]"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                <div className="self-end p-2 bg-stone-900/80 rounded-full text-white backdrop-blur-sm shadow border border-stone-700/60 group-hover:scale-110 transition-transform">
                  <ZoomIn className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold block">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-lg font-semibold text-white drop-shadow">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-200 line-clamp-1 mt-0.5">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 text-stone-400 hover:text-white rounded-full bg-stone-900/80 border border-stone-700"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-stone-300 hover:text-white rounded-full bg-stone-900/80 border border-stone-700 hidden sm:block"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-stone-300 hover:text-white rounded-full bg-stone-900/80 border border-stone-700 hidden sm:block"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[75vh] w-auto max-w-full rounded object-contain border border-stone-800 shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center">
              <h3 className="font-serif text-xl font-semibold text-stone-100">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                {filteredItems[lightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
