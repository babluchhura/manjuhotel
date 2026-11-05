import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { HotelInfo } from '../types';

interface ContactSectionProps {
  hotelInfo: HotelInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ hotelInfo }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  // Spam prevention honeypot field (hidden from real users)
  const [honeypot, setHoneypot] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{
    message: string;
    notification?: { sentTo: string; dispatchId: string; date: string };
  } | null>(null);

  const cleanPhone = hotelInfo.phone.replace(/[^0-9+]/g, '');
  const cleanWa = hotelInfo.whatsapp.replace(/[^0-9]/g, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessInfo(null);

    // Spam honeypot trap check
    if (honeypot) {
      // Quietly ignore bots
      setSuccessInfo({
        message: 'Your message has been processed.'
      });
      return;
    }

    // Form field validations
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Please enter a valid email address so we can reply to you.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMessage('Please enter a valid phone number for SMS/call coordination.');
      return;
    }
    if (!subject.trim() || subject.trim().length < 3) {
      setErrorMessage('Please specify the subject of your inquiry.');
      return;
    }
    if (!message.trim() || message.trim().length < 5) {
      setErrorMessage('Please enter your message (minimum 5 characters).');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          subject: subject.trim(),
          message: message.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit contact inquiry');
      }

      setSuccessInfo({
        message: data.message,
        notification: data.notification
      });

      // Clear form on success
      setFullName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to connect to the mail server. Please call us directly at +91 9668612323.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#b89758] block">
            Get in Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight" style={{ textWrap: 'balance' }}>
            Contact Manju Hotel
          </h2>
          <p className="text-stone-600 text-sm font-light leading-relaxed">
            Have questions regarding room reservations, group bookings, event dining, or travel routes to Bangomunda? Send us an inquiry below or reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Cards & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF8F5] p-6 rounded-lg border border-stone-200/80 space-y-6">
              <h3 className="font-serif text-xl font-semibold text-stone-900">
                Hotel Information &amp; Front Desk
              </h3>

              <div className="space-y-4 text-xs text-stone-700">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded border border-stone-200 text-[#D4AF37] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 block text-xs">Hotel Address</span>
                    <p className="text-stone-600 mt-0.5 leading-relaxed">
                      {hotelInfo.address}, {hotelInfo.city}, {hotelInfo.state}, India &ndash; {hotelInfo.pincode}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded border border-stone-200 text-[#D4AF37] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 block text-xs">Phone Numbers</span>
                    <a
                      href={`tel:${cleanPhone}`}
                      className="text-stone-900 font-medium hover:text-[#b89758] transition-colors block mt-0.5"
                    >
                      {hotelInfo.phone}
                    </a>
                    <span className="text-[11px] text-stone-500 block">Available 24/7 for booking &amp; inquiries</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded border border-stone-200 text-[#D4AF37] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 block text-xs">Official Email</span>
                    <a
                      href={`mailto:${hotelInfo.email}`}
                      className="text-stone-900 font-medium hover:text-[#b89758] transition-colors block mt-0.5"
                    >
                      {hotelInfo.email}
                    </a>
                    <span className="text-[11px] text-stone-500 block">Immediate email notifications configured</span>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded border border-stone-200 text-[#D4AF37] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 block text-xs">Check-In / Out Policy</span>
                    <p className="text-stone-600 mt-0.5">
                      Check-In: {hotelInfo.checkInTime} &bull; Check-Out: {hotelInfo.checkOutTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Quick Action Buttons */}
              <div className="pt-2 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <a
                  href={`tel:${cleanPhone}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded text-xs font-semibold uppercase tracking-wider transition-colors text-center"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Call Now</span>
                </a>

                <a
                  href={`mailto:${hotelInfo.email}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded text-xs font-semibold uppercase tracking-wider transition-colors text-center"
                >
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Email</span>
                </a>

                <a
                  href={`https://wa.me/${cleanWa}?text=Hello%20Manju%20Hotel,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20room.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors text-center"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Google Map Location Frame */}
            <div className="rounded-lg overflow-hidden border border-stone-200 shadow-sm bg-stone-100">
              <div className="px-4 py-2 bg-stone-200 text-stone-700 text-xs font-medium flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#b89758]" />
                  <span>Bangomunda, Odisha (767040) Map</span>
                </span>
                <a
                  href="https://maps.google.com/?q=Bangomunda+Odisha+767040"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-900 hover:underline font-semibold"
                >
                  Open in Maps &rarr;
                </a>
              </div>
              <iframe
                title="Manju Hotel Location Bangomunda Odisha"
                src="https://maps.google.com/maps?q=Bangomunda,Odisha,767040&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Functional Contact Us Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-lg border border-stone-200 shadow-sm space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#b89758] font-semibold block">
                  Send Direct Message
                </span>
                <h3 className="font-serif text-2xl font-semibold text-stone-900">
                  Guest Inquiry &amp; Feedback Form
                </h3>
                <p className="text-xs text-stone-600 mt-1 font-light">
                  Messages submitted here are routed directly to admin <span className="font-medium text-stone-900">yogeshchhura@gmail.com</span> with immediate notification.
                </p>
              </div>

              {/* Status Alert Messages */}
              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Submission Error</span>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              {successInfo && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-sm text-emerald-950 block">Message Sent Successfully!</span>
                      <p className="mt-0.5 leading-relaxed">{successInfo.message}</p>
                    </div>
                  </div>

                  {successInfo.notification && (
                    <div className="ml-7 pt-2 border-t border-emerald-200/80 text-[11px] text-emerald-900">
                      <span>Instant Email Notification Transmitted to: <strong>{successInfo.notification.sentTo}</strong></span>
                      <span className="block text-stone-500 font-mono mt-0.5">
                        Dispatch Ref: {successInfo.notification.dispatchId} &bull; {successInfo.notification.date}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field for anti-spam (visually hidden) */}
                <input
                  type="text"
                  name="hotel_website_token"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Yogesh Chhura"
                    className="w-full text-xs font-medium text-stone-800 bg-white border border-stone-300 rounded px-3.5 py-2.5 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                    required
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. anand@gmail.com"
                      className="w-full text-xs font-medium text-stone-800 bg-white border border-stone-300 rounded px-3.5 py-2.5 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 9668612323"
                      className="w-full text-xs font-medium text-stone-800 bg-white border border-stone-300 rounded px-3.5 py-2.5 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Room Inquiry / Banquet Hall Booking / Travel Guidance"
                    className="w-full text-xs font-medium text-stone-800 bg-white border border-stone-300 rounded px-3.5 py-2.5 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                    required
                  />
                </div>

                {/* Complete Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                    Complete Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your detailed inquiry, requested dates, number of rooms, or special arrangements..."
                    className="w-full text-xs font-medium text-stone-800 bg-white border border-stone-300 rounded px-3.5 py-2.5 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                    required
                  />
                </div>

                {/* Privacy & Anti-spam badge */}
                <div className="flex items-center gap-2 text-[11px] text-stone-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Secure SSL transmission. We respect your privacy and never share contact details.</span>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-100 font-semibold text-xs uppercase tracking-wider rounded transition-all shadow active:scale-95 disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Sending Notification to Admin...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#D4AF37]" />
                        <span>Submit Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
