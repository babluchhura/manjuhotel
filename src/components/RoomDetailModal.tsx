import React, { useState } from 'react';
import { X, Check, BedDouble, Users, Maximize2, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import { Room } from '../types';

interface RoomDetailModalProps {
  room: Room | null;
  onClose: () => void;
  onBookNow: (room: Room) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  onClose,
  onBookNow
}) => {
  if (!room) return null;

  const [activeImage, setActiveImage] = useState(room.image);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden border border-stone-200 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#b89758] font-semibold block">
              {room.category} &bull; Room Details
            </span>
            <h3 className="font-serif text-2xl font-semibold text-stone-900">
              {room.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Visual & Gallery Strip */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={activeImage}
                alt={room.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 right-4 bg-stone-900/90 text-white px-4 py-2 rounded shadow backdrop-blur-sm">
                <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] block font-medium">Tariff</span>
                <span className="font-serif text-2xl font-bold tabular-nums">₹{room.pricePerNight}</span>
                <span className="text-xs text-stone-300 font-light"> / night</span>
              </div>
            </div>

            {/* Thumbnails */}
            {room.galleryImages && room.galleryImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {room.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-14 rounded overflow-hidden shrink-0 border-2 transition-all ${
                      activeImage === img ? 'border-[#D4AF37] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Specs Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs">
            <div>
              <span className="text-stone-500 block">Bedding:</span>
              <span className="font-semibold text-stone-800 flex items-center gap-1 mt-0.5">
                <BedDouble className="w-3.5 h-3.5 text-[#b89758]" />
                {room.bedType}
              </span>
            </div>
            <div>
              <span className="text-stone-500 block">Dimensions:</span>
              <span className="font-semibold text-stone-800 flex items-center gap-1 mt-0.5">
                <Maximize2 className="w-3.5 h-3.5 text-[#b89758]" />
                {room.roomSize}
              </span>
            </div>
            <div>
              <span className="text-stone-500 block">Max Guests:</span>
              <span className="font-semibold text-stone-800 flex items-center gap-1 mt-0.5">
                <Users className="w-3.5 h-3.5 text-[#b89758]" />
                {room.capacity.adults} Adults, {room.capacity.children} Child
              </span>
            </div>
            <div>
              <span className="text-stone-500 block">Breakfast:</span>
              <span className="font-semibold text-stone-800 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Complimentary
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="font-serif text-lg font-semibold text-stone-900">Room Overview</h4>
            <p className="text-sm text-stone-600 leading-relaxed font-light">
              {room.description}
            </p>
          </div>

          {/* Comprehensive Amenities List */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-stone-900">Room Amenities &amp; Services</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
              {room.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2 py-1">
                  <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hotel Policies */}
          <div className="bg-[#FAF8F5] p-4 rounded-lg border border-stone-200/80 text-xs text-stone-600 space-y-1">
            <div className="font-semibold text-stone-800 mb-1">Check-In &amp; Check-Out Guidelines:</div>
            <p>&bull; Standard Check-in Time: 12:00 PM | Standard Check-out Time: 11:00 AM</p>
            <p>&bull; Early check-in or late check-out is subject to room availability.</p>
            <p>&bull; Government-approved photo ID (Aadhaar, Passport, Voter ID) required at check-in.</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-stone-500 block">Total Rate</span>
            <span className="font-serif text-2xl font-bold text-stone-900 tabular-nums">
              ₹{room.pricePerNight}
              <span className="text-xs text-stone-500 font-normal"> / night</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(room);
              }}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#D4AF37] hover:bg-[#c59e2a] text-stone-950 font-semibold text-xs uppercase tracking-wider rounded transition-all shadow active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book This Room</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
