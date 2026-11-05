import React from 'react';
import {
  Clock,
  Wifi,
  UtensilsCrossed,
  Sparkles,
  Droplets,
  Zap,
  ShieldCheck,
  Bell,
  Tv,
  Car,
  Coffee,
  CheckCircle2
} from 'lucide-react';
import { INITIAL_FACILITIES } from '../data/initialData';

const iconMap: Record<string, React.ReactNode> = {
  Clock: <Clock className="w-5 h-5" />,
  Wifi: <Wifi className="w-5 h-5" />,
  UtensilsCrossed: <UtensilsCrossed className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Droplets: <Droplets className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  Bell: <Bell className="w-5 h-5" />
};

export const FacilitiesSection: React.FC = () => {
  return (
    <section id="facilities" className="py-20 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#b89758] block">
            Guest Amenities
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Thoughtful Facilities for a Seamless Stay
          </h2>
          <p className="text-stone-600 text-sm font-light leading-relaxed">
            From modern business requirements to relaxing holiday comforts, Manju Hotel is equipped to cater to your every requirement with attention to detail.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_FACILITIES.map((facility, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-stone-200/80 bg-stone-50/50 hover:bg-stone-50 hover:border-stone-300 transition-all hover:shadow-md flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded bg-stone-900 text-[#D4AF37] flex items-center justify-center transition-transform group-hover:scale-105">
                  {iconMap[facility.icon] || <Sparkles className="w-5 h-5" />}
                </div>
                <h3 className="font-serif text-lg font-semibold text-stone-900">
                  {facility.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  {facility.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-200/60 flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Complimentary Service</span>
              </div>
            </div>
          ))}
        </div>

        {/* Extra Highlight Strip */}
        <div className="mt-12 p-6 rounded-lg bg-stone-900 text-stone-100 flex flex-col md:flex-row items-center justify-between gap-6 border border-stone-800">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-xl text-stone-100 font-medium">
              Planning a Marriage, Reception, or Corporate Meeting in Bangomunda?
            </h4>
            <p className="text-xs text-stone-400 font-light">
              We offer exclusive group room tariffs, banquet catering, and customized hospitality arrangements.
            </p>
          </div>
          <a
            href="tel:+919668612323"
            className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#c59e2a] text-stone-950 font-semibold text-xs uppercase tracking-wider rounded whitespace-nowrap transition-colors"
          >
            Inquire for Group Stays
          </a>
        </div>
      </div>
    </section>
  );
};
