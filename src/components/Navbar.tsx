import React, { useState } from 'react';
import { Phone, Mail, MapPin, Menu, X, Shield, CalendarCheck } from 'lucide-react';
import { HotelInfo } from '../types';

interface NavbarProps {
  hotelInfo: HotelInfo;
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  hotelInfo,
  activeSection,
  onNavigate,
  onOpenBooking,
  onOpenAdmin,
  isAdminLoggedIn
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'rooms', label: 'Rooms & Suites' },
    { id: 'virtual-tour', label: '3D Tour' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'restaurant', label: 'Restaurant' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#12161A]/95 backdrop-blur-md border-b border-stone-800 text-stone-100">
      {/* Top Utility Information Bar */}
      <div className="hidden lg:block border-b border-stone-800/80 bg-[#0d1013] text-[12px] text-stone-300 py-2">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Bangomunda, Odisha &ndash; 767040</span>
            </span>
            <span className="text-stone-700">|</span>
            <a
              href={`tel:${hotelInfo.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1.5 text-stone-300 hover:text-[#D4AF37] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{hotelInfo.phone}</span>
            </a>
            <span className="text-stone-700">|</span>
            <a
              href={`mailto:${hotelInfo.email}`}
              className="flex items-center gap-1.5 text-stone-300 hover:text-[#D4AF37] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{hotelInfo.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-[#D4AF37] transition-colors font-medium px-2 py-0.5 rounded border border-stone-800 hover:border-stone-700"
            >
              <Shield className="w-3 h-3 text-[#D4AF37]" />
              <span>{isAdminLoggedIn ? 'Admin Panel' : 'Admin Login'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation - Strict 3-zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (single text element in display face) */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <span className="block font-serif text-2xl lg:text-3xl font-semibold tracking-wider text-stone-100 group-hover:text-[#D4AF37] transition-colors">
            MANJU HOTEL
          </span>
          <span className="block text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-sans">
            Bangomunda &bull; Odisha
          </span>
        </button>

        {/* Zone 2: 4-6 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium tracking-wide text-stone-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                activeSection === item.id
                  ? 'text-[#D4AF37] font-semibold'
                  : 'text-stone-300 hover:text-stone-100'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-[#D4AF37] hover:bg-[#c59e2a] transition-all rounded shadow-md whitespace-nowrap shrink-0 active:scale-95"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Book Now</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-[#D4AF37] rounded"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-300 hover:text-stone-100 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#161b20] border-t border-stone-800 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2 border-b border-stone-800/60 ${
                  activeSection === item.id ? 'text-[#D4AF37]' : 'text-stone-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-800 space-y-3">
            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-[#D4AF37] rounded"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Reserve Room Online</span>
            </button>

            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-stone-400 bg-stone-800/60 rounded border border-stone-700/60"
            >
              <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Admin Management Dashboard</span>
            </button>

            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Bangomunda, Odisha – 767040</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <a href={`tel:${hotelInfo.phone.replace(/[^0-9+]/g, '')}`}>{hotelInfo.phone}</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
