import React, { useState } from 'react';
import { Calendar, Users, BedDouble, Search } from 'lucide-react';
import { Room } from '../types';

interface BookingBarProps {
  rooms: Room[];
  onSearch: (params: { checkIn: string; checkOut: string; guests: number; roomId: string }) => void;
}

export const BookingBar: React.FC<BookingBarProps> = ({ rooms, onSearch }) => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState('2');
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0]?.id || 'deluxe-ac');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      checkIn,
      checkOut,
      guests: parseInt(guests, 10),
      roomId: selectedRoomId
    });
  };

  return (
    <div className="relative -mt-8 z-30 max-w-6xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-xl border border-stone-200/80 p-4 md:p-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* Check-In */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Check-In</span>
            </label>
            <input
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3 py-2.5 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
              required
            />
          </div>

          {/* Check-Out */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Check-Out</span>
            </label>
            <input
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3 py-2.5 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
              required
            />
          </div>

          {/* Guests */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600">
              <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Guests</span>
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3 py-2.5 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            >
              <option value="1">1 Adult (Solo)</option>
              <option value="2">2 Adults (Couple)</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests (Family)</option>
              <option value="5">5+ Guests (Group)</option>
            </select>
          </div>

          {/* Room Type */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600">
              <BedDouble className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Room Type</span>
            </label>
            <select
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
              className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3 py-2.5 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            >
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name} &ndash; ₹{room.pricePerNight}/night
                </option>
              ))}
            </select>
          </div>

          {/* Action */}
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 font-semibold text-xs uppercase tracking-wider rounded transition-all active:scale-95 shadow"
            >
              <Search className="w-4 h-4 text-[#D4AF37]" />
              <span>Check Rates</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
