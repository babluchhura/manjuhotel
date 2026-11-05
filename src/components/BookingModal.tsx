import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, BedDouble, Users, Phone, Mail, ShieldAlert, Sparkles, Printer } from 'lucide-react';
import { Room, Booking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: Room[];
  initialRoomId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  rooms,
  initialRoomId,
  initialCheckIn,
  initialCheckOut,
  initialGuests
}) => {
  if (!isOpen) return null;

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState(initialCheckIn || today);
  const [checkOut, setCheckOut] = useState(initialCheckOut || tomorrow);
  const [adults, setAdults] = useState(initialGuests || 2);
  const [children, setChildren] = useState(0);
  const [selectedRoomId, setSelectedRoomId] = useState(initialRoomId || rooms[0]?.id || 'deluxe-ac');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Pay at Hotel (Cash / UPI / Card)' | 'UPI Advance'>('Pay at Hotel (Cash / UPI / Card)');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Selected room object
  const currentRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0];

  // Calculate nights & price
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = end.getTime() - start.getTime();
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const basePrice = currentRoom ? currentRoom.pricePerNight * nights : 0;
  const taxes = 0; // Transparent zero hidden fees
  const grandTotal = basePrice + taxes;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!customerName.trim() || customerName.trim().length < 2) {
      setError('Please provide your full legal name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address for your confirmation voucher.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setError('Please provide a valid 10-digit mobile number for SMS/WhatsApp confirmation.');
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setError('Check-out date must be at least 1 day after check-in date.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          checkIn,
          checkOut,
          guests: { adults, children },
          roomId: selectedRoomId,
          specialRequests: specialRequests.trim(),
          paymentMethod
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete booking');
      }

      setConfirmedBooking(data.booking);
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again or call +91 9668612323.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden border border-stone-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#b89758] font-semibold block">
              Direct Reservation
            </span>
            <h3 className="font-serif text-2xl font-semibold text-stone-900">
              {confirmedBooking ? 'Booking Confirmed' : 'Online Room Booking'}
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

        {/* Content Area */}
        <div className="overflow-y-auto p-6">
          {confirmedBooking ? (
            /* Confirmation View */
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 flex items-start gap-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-bold text-emerald-950">
                    Your Reservation is Confirmed!
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Thank you, <strong className="font-semibold">{confirmedBooking.customerName}</strong>. Your room reservation has been registered in the Manju Hotel system and an instant booking notification has been transmitted to our management at <span className="font-semibold text-emerald-900">yogeshchhura@gmail.com</span>.
                  </p>
                </div>
              </div>

              {/* Booking Summary Card */}
              <div className="border border-stone-200 rounded-lg p-5 space-y-4 bg-stone-50/50 print:border-stone-900">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div>
                    <span className="text-xs text-stone-500 block">Booking Reference:</span>
                    <span className="font-mono text-base font-bold text-stone-900 tracking-wider">
                      {confirmedBooking.id}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-500 block">Status:</span>
                    <span className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded text-xs font-semibold">
                      {confirmedBooking.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-stone-500 block">Room Selected:</span>
                    <span className="font-semibold text-stone-900">{confirmedBooking.roomName}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Duration of Stay:</span>
                    <span className="font-semibold text-stone-900">{confirmedBooking.totalNights} Night(s)</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Check-In Date:</span>
                    <span className="font-semibold text-stone-900">{confirmedBooking.checkIn} (from 12:00 PM)</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Check-Out Date:</span>
                    <span className="font-semibold text-stone-900">{confirmedBooking.checkOut} (until 11:00 AM)</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Guests:</span>
                    <span className="font-semibold text-stone-900">
                      {confirmedBooking.guests.adults} Adults, {confirmedBooking.guests.children} Children
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Payment Mode:</span>
                    <span className="font-semibold text-stone-900">{confirmedBooking.paymentMethod}</span>
                  </div>
                </div>

                <div className="border-t border-stone-200 pt-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-700">Total Payable at Hotel:</span>
                  <span className="font-serif text-2xl font-bold text-stone-900 tabular-nums">
                    ₹{confirmedBooking.totalAmount}
                  </span>
                </div>
              </div>

              {/* Instructions */}
              <div className="text-xs text-stone-600 space-y-1 bg-[#FAF8F5] p-4 rounded border border-stone-200">
                <div className="font-semibold text-stone-800">Important Guest Information:</div>
                <p>&bull; Please present this booking reference and an official photo ID upon arrival.</p>
                <p>&bull; Hotel Location: Main Road, Bangomunda, Odisha &ndash; 767040.</p>
                <p>&bull; Front Desk Assistance: +91 9668612323 | yogeshchhura@gmail.com</p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-4 py-2 border border-stone-300 hover:border-stone-400 rounded text-xs font-medium text-stone-800 transition-colors"
                >
                  <Printer className="w-4 h-4 text-stone-600" />
                  <span>Print Booking Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 font-semibold text-xs uppercase tracking-wider rounded transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Room Selection Strip */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                  Select Room Accommodation
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {rooms.map((r) => (
                    <button
                      type="button"
                      key={r.id}
                      onClick={() => setSelectedRoomId(r.id)}
                      className={`p-3 text-left rounded border transition-all flex flex-col justify-between ${
                        selectedRoomId === r.id
                          ? 'border-[#D4AF37] bg-stone-50 ring-1 ring-[#D4AF37]'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-stone-900">{r.name}</span>
                        <span className="font-serif font-bold text-xs text-[#b89758] tabular-nums">
                          ₹{r.pricePerNight}/night
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-500 mt-1">{r.bedType} &bull; {r.roomSize}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3 py-2.5 focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    min={checkIn || today}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3 py-2.5 focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                    Adult Guests (12+ yrs)
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value, 10))}
                    className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3 py-2.5 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Adults</option>
                    <option value={3}>3 Adults</option>
                    <option value={4}>4 Adults</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                    Children (0-11 yrs)
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(parseInt(e.target.value, 10))}
                    className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3 py-2.5 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value={0}>0 Children</option>
                    <option value={1}>1 Child</option>
                    <option value={2}>2 Children</option>
                  </select>
                </div>
              </div>

              {/* Guest Contact Information */}
              <div className="space-y-3 pt-2 border-t border-stone-200">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-800 block">
                  Guest Contact Details
                </span>

                <div className="space-y-1.5">
                  <label className="text-xs text-stone-600 block">Full Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ramesh Chandra Dash"
                    className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3 py-2.5 focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs text-stone-600 block">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. ramesh@example.com"
                      className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3 py-2.5 focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-stone-600 block">Mobile Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 9861012345"
                      className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3 py-2.5 focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-stone-600 block">Special Requests (Optional)</label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Early check-in request, ground floor room, extra pillow, etc."
                    className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3 py-2 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Price Calculation Card */}
              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200/80 space-y-2 text-xs">
                <div className="flex items-center justify-between text-stone-600">
                  <span>{currentRoom.name} &times; {nights} Night(s)</span>
                  <span className="font-semibold text-stone-800 tabular-nums">₹{basePrice}</span>
                </div>
                <div className="flex items-center justify-between text-stone-600">
                  <span>Taxes &amp; Service Charges</span>
                  <span className="text-emerald-700 font-semibold">Included (No hidden fees)</span>
                </div>
                <div className="border-t border-stone-200 pt-2 flex items-center justify-between text-sm font-bold text-stone-900">
                  <span>Estimated Total Amount</span>
                  <span className="font-serif text-xl text-[#b89758] tabular-nums">₹{grandTotal}</span>
                </div>
                <p className="text-[11px] text-stone-500 italic">
                  * Payment is collected upon check-in at hotel via Cash, UPI (Google Pay, PhonePe, Paytm), or Credit/Debit Card.
                </p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-[#D4AF37] hover:bg-[#c59e2a] text-stone-950 font-semibold text-xs uppercase tracking-wider rounded transition-all shadow active:scale-95 disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <span>Confirming...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Confirm Reservation</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
