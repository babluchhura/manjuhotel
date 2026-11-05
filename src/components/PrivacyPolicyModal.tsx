import React from 'react';
import { X, ShieldCheck, Lock, FileText } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-2xl overflow-hidden border border-stone-200 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif text-xl font-semibold text-stone-900">
              Privacy Policy &bull; Manju Hotel
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

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-5 text-xs text-stone-700 leading-relaxed font-light">
          <div>
            <h4 className="font-serif text-sm font-semibold text-stone-900 uppercase tracking-wide">
              1. Introduction &amp; Scope
            </h4>
            <p className="mt-1">
              At Manju Hotel, located in Bangomunda, Odisha (PIN 767040), we respect your privacy and are committed to protecting the personal information you share with us through our website, online room reservation system, and direct contact forms.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold text-stone-900 uppercase tracking-wide">
              2. Information We Collect
            </h4>
            <p className="mt-1">
              When making an inquiry or reserving a room, we collect:
            </p>
            <ul className="list-disc pl-5 mt-1 space-y-0.5">
              <li>Guest Name, Contact Mobile Number, and Email Address.</li>
              <li>Stay dates, number of guests, and room type preference.</li>
              <li>Special dietary or room accommodation requests.</li>
              <li>Government identification details required during physical check-in as per regulatory hotel compliance laws in India.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold text-stone-900 uppercase tracking-wide">
              3. Use of Information &amp; Email Notifications
            </h4>
            <p className="mt-1">
              Your contact details are utilized solely for:
            </p>
            <ul className="list-disc pl-5 mt-1 space-y-0.5">
              <li>Processing room reservation confirmations and voucher delivery.</li>
              <li>Transmitting immediate email notifications to our hotel management desk (<strong className="font-medium text-stone-900">yogeshchhura@gmail.com</strong>) to respond promptly to guest inquiries.</li>
              <li>Coordinating arrival, dining, and front desk assistance.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold text-stone-900 uppercase tracking-wide">
              4. Data Confidentiality &amp; Security
            </h4>
            <p className="mt-1">
              We never sell, lease, or rent your personal data to any third-party marketing companies. All communications and database records are held securely with administrative authorization safeguards.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold text-stone-900 uppercase tracking-wide">
              5. Contacting the Hotel Management
            </h4>
            <p className="mt-1">
              For any questions regarding your data, reservations, or cancellations, please contact:
            </p>
            <div className="mt-2 p-3 bg-stone-50 rounded border border-stone-200">
              <p className="font-medium text-stone-900">Hotel Administrator &bull; Manju Hotel</p>
              <p>Email: <a href="mailto:yogeshchhura@gmail.com" className="text-[#b89758] underline">yogeshchhura@gmail.com</a></p>
              <p>Phone: <a href="tel:+919668612323" className="text-[#b89758] underline">+91 9668612323</a></p>
              <p>Address: Main Road, Bangomunda, Odisha &ndash; 767040, India</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
