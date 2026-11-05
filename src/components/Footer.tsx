import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Shield, ArrowUp, Heart } from 'lucide-react';
import { HotelInfo } from '../types';

interface FooterProps {
  hotelInfo: HotelInfo;
  onNavigate: (section: string) => void;
  onOpenBooking: () => void;
  onOpenPrivacy: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  hotelInfo,
  onNavigate,
  onOpenBooking,
  onOpenPrivacy,
  onOpenAdmin
}) => {
  const cleanPhone = hotelInfo.phone.replace(/[^0-9+]/g, '');
  const cleanWa = hotelInfo.whatsapp.replace(/[^0-9]/g, '');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0f1317] text-stone-300 border-t border-stone-800">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Description (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-wide text-white block">
                MANJU HOTEL
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-sans font-semibold">
                Bangomunda &bull; Odisha &bull; Pin 767040
              </span>
            </div>

            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Experience comfort, hospitality &amp; luxury at Manju Hotel. Featuring premium air-conditioned rooms, fine dining, banquet catering, high-speed Wi-Fi, and 24/7 dedicated service in Bangomunda, Odisha.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`tel:${cleanPhone}`}
                className="p-2.5 rounded bg-stone-900 border border-stone-800 text-stone-300 hover:text-[#D4AF37] hover:border-stone-700 transition-colors"
                title="Direct Phone Call"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${hotelInfo.email}`}
                className="p-2.5 rounded bg-stone-900 border border-stone-800 text-stone-300 hover:text-[#D4AF37] hover:border-stone-700 transition-colors"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${cleanWa}?text=Hello%20Manju%20Hotel`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded bg-stone-900 border border-stone-800 text-stone-300 hover:text-[#25D366] hover:border-stone-700 transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (Col 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">
              Explore Pages
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rooms')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Rooms &amp; Accommodation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('virtual-tour')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  3D Virtual Tour
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('facilities')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Hotel Facilities &amp; Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('restaurant')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Restaurant &amp; Food Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Photo Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Guest Services & Actions (Col 8-9) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">
              Guest Services
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-[#D4AF37] hover:underline font-semibold"
                >
                  Online Room Booking
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Contact Us &amp; Map
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors pt-2"
                >
                  <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Admin Login</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">
              Hotel Office
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400 font-light">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Main Road, Bangomunda, Odisha &ndash; 767040, India</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-white font-medium">
                  {hotelInfo.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`mailto:${hotelInfo.email}`} className="hover:text-white font-medium">
                  {hotelInfo.email}
                </a>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2 px-3 bg-[#D4AF37] hover:bg-[#c59e2a] text-stone-950 font-semibold text-xs uppercase tracking-wider rounded transition-colors text-center"
              >
                Reserve Room Direct
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} Manju Hotel, Bangomunda. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-stone-300 transition-colors"
            >
              Privacy Policy &amp; Terms
            </button>
            <span>&bull;</span>
            <button
              onClick={onOpenAdmin}
              className="hover:text-stone-300 transition-colors"
            >
              Management Portal
            </button>
            <span>&bull;</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors"
              title="Back to Top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
