import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

interface Props {
  phone: string;
  whatsapp: string;
}

export const WhatsAppFloat: React.FC<Props> = ({ phone, whatsapp }) => {
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const cleanWa = whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
      {/* Quick Phone Call */}
      <a
        href={`tel:${cleanPhone}`}
        className="flex items-center gap-2 bg-stone-900 text-stone-100 hover:bg-stone-800 px-3.5 py-2.5 rounded-full shadow-lg border border-stone-700/60 transition-transform hover:scale-105 group text-xs font-medium"
        title="Call Front Desk"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-stone-200">
          Call +91 9668612323
        </span>
        <Phone className="w-4 h-4 text-[#D4AF37]" />
      </a>

      {/* WhatsApp Quick Chat */}
      <a
        href={`https://wa.me/${cleanWa}?text=Hello%20Manju%20Hotel,%20I%20would%20like%20to%20inquire%20about%20room%20availability%20in%20Bangomunda.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#20ba5a] px-4 py-3 rounded-full shadow-xl transition-all hover:scale-105 group text-xs font-semibold"
        title="Chat on WhatsApp"
      >
        <span className="hidden sm:inline-block">WhatsApp Us</span>
        <MessageCircle className="w-5 h-5 fill-current" />
      </a>
    </div>
  );
};
