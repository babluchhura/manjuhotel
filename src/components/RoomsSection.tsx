import React, { useState } from 'react';
import { BedDouble, Users, Maximize2, Check, ArrowRight, Eye } from 'lucide-react';
import { Room } from '../types';

interface RoomsSectionProps {
  rooms: Room[];
  onSelectRoomDetails: (room: Room) => void;
  onBookRoom: (room: Room) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({
  rooms,
  onSelectRoomDetails,
  onBookRoom
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'Deluxe' | 'Super Deluxe' | 'Executive Suite' | 'Family Suite'>('all');
  const [hoveredCard, setHoveredCard] = useState<{ id: string; x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6; // 6 deg tilt
    const rotateY = ((x - centerX) / centerX) * 6;
    setHoveredCard({ id, x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const filteredRooms = activeFilter === 'all'
    ? rooms
    : rooms.filter(r => r.category === activeFilter);

  return (
    <section id="rooms" className="py-20 bg-stone-50 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#b89758] block">
              Accommodations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
              Rooms &amp; Suites Designed for Rest
            </h2>
            <p className="text-stone-600 text-sm max-w-xl font-light">
              Each room at Manju Hotel is appointed with climate control, high-speed Wi-Fi, premium plush bedding, and pristine private bathrooms.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg overflow-x-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-stone-900 text-stone-100 shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              All Rooms
            </button>
            <button
              onClick={() => setActiveFilter('Deluxe')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeFilter === 'Deluxe'
                  ? 'bg-stone-900 text-stone-100 shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              Deluxe
            </button>
            <button
              onClick={() => setActiveFilter('Super Deluxe')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeFilter === 'Super Deluxe'
                  ? 'bg-stone-900 text-stone-100 shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              Super Deluxe
            </button>
            <button
              onClick={() => setActiveFilter('Executive Suite')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeFilter === 'Executive Suite'
                  ? 'bg-stone-900 text-stone-100 shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              Executive Suite
            </button>
            <button
              onClick={() => setActiveFilter('Family Suite')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeFilter === 'Family Suite'
                  ? 'bg-stone-900 text-stone-100 shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              Family Suite
            </button>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => {
            const isHovered = hoveredCard?.id === room.id;

            return (
              <div
                key={room.id}
                onMouseMove={(e) => handleMouseMove(e, room.id)}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: isHovered
                    ? `perspective(1000px) rotateX(${hoveredCard.x}deg) rotateY(${hoveredCard.y}deg) translateY(-4px) scale3d(1.02, 1.02, 1.02)`
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)',
                  transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transformStyle: 'preserve-3d'
                }}
                className="bg-white rounded-lg overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-2xl transition-shadow duration-300 flex flex-col group will-change-transform"
              >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Pricing Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] block font-medium">
                      Starts From
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-2xl font-bold tracking-tight text-white tabular-nums">
                        ₹{room.pricePerNight}
                      </span>
                      <span className="text-xs text-stone-300 font-light">/ night</span>
                    </div>
                  </div>

                  {room.originalPrice && (
                    <span className="text-xs text-stone-300 line-through tabular-nums">
                      ₹{room.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  {/* Clean unboxed metadata with bullet separators (anti-pill discipline) */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                    <span>{room.category}</span>
                    <span aria-hidden="true">&bull;</span>
                    <span>{room.roomSize}</span>
                    <span aria-hidden="true">&bull;</span>
                    <span>Max {room.capacity.adults} Adults</span>
                  </div>

                  <h3 className="font-serif text-2xl font-semibold text-stone-900 group-hover:text-[#b89758] transition-colors">
                    {room.name}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {room.description}
                  </p>

                  {/* Room Specs */}
                  <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-stone-700">
                    <div className="flex items-center gap-1.5">
                      <BedDouble className="w-3.5 h-3.5 text-[#b89758]" />
                      <span className="truncate">{room.bedType}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#b89758]" />
                      <span>{room.capacity.adults} Adults, {room.capacity.children} Child</span>
                    </div>
                  </div>

                  {/* Selected Features */}
                  <div className="pt-2 border-t border-stone-100 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-stone-600">
                    {room.features.slice(0, 3).map((f, i) => (
                      <span key={i} className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>{f}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-stone-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectRoomDetails(room)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 rounded transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  <button
                    onClick={() => onBookRoom(room)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-900 bg-[#D4AF37] hover:bg-[#c59e2a] rounded transition-all active:scale-95 shadow-sm"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
