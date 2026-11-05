import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  LogOut,
  Mail,
  Calendar,
  BedDouble,
  Settings,
  Image as ImageIcon,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Phone,
  Trash2,
  RefreshCw,
  ExternalLink,
  Save,
  Search,
  Filter,
  Eye,
  Send
} from 'lucide-react';
import { Room, Booking, ContactMessage, HotelInfo } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  hotelInfo: HotelInfo;
  onUpdateHotelInfo: (info: HotelInfo) => void;
  rooms: Room[];
  onUpdateRoom: (room: Room) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  hotelInfo,
  onUpdateHotelInfo,
  rooms,
  onUpdateRoom
}) => {
  if (!isOpen) return null;

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('manju_admin_auth') === 'true';
  });
  const [loginEmail, setLoginEmail] = useState('yogeshchhura@gmail.com');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'messages' | 'bookings' | 'rooms' | 'content'>('overview');

  // Data states
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Room editor state
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);
  const [tempAvailable, setTempAvailable] = useState<boolean>(true);

  // Website content state
  const [editableInfo, setEditableInfo] = useState<HotelInfo>(hotelInfo);

  // Load backend data when authenticated
  const fetchData = async () => {
    setLoadingData(true);
    try {
      const [msgRes, bookRes] = await Promise.all([
        fetch('/api/contact'),
        fetch('/api/bookings')
      ]);

      if (msgRes.ok) {
        const msgData = await msgRes.json();
        setMessages(msgData.messages || []);
      }
      if (bookRes.ok) {
        const bookData = await bookRes.json();
        setBookings(bookData.bookings || []);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      setIsAuthenticated(true);
      sessionStorage.setItem('manju_admin_auth', 'true');
      fetchData();
    } catch (err: any) {
      setLoginError(err.message || 'Invalid credentials');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('manju_admin_auth');
  };

  // Update Booking Status
  const handleBookingStatusChange = async (bookingId: string, newStatus: Booking['status']) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
        showToast(`Booking ${bookingId} status updated to ${newStatus}`);
      }
    } catch (err) {
      console.error('Failed to update booking status', err);
    }
  };

  // Update Message Status
  const handleMessageStatusChange = async (msgId: string, status: ContactMessage['status']) => {
    try {
      const res = await fetch(`/api/contact/${msgId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setMessages(messages.map(m => m.id === msgId ? { ...m, status } : m));
        showToast('Inquiry status updated');
      }
    } catch (err) {
      console.error('Failed to update message status', err);
    }
  };

  // Delete Message
  const handleDeleteMessage = async (msgId: string) => {
    if (!window.confirm('Are you sure you want to delete this message record?')) return;
    try {
      const res = await fetch(`/api/contact/${msgId}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages(messages.filter(m => m.id !== msgId));
        showToast('Message deleted');
      }
    } catch (err) {
      console.error('Failed to delete message', err);
    }
  };

  // Save Room Price & Availability
  const handleSaveRoom = async (roomId: string) => {
    try {
      const room = rooms.find(r => r.id === roomId);
      if (!room) return;

      const updated = {
        ...room,
        pricePerNight: tempPrice || room.pricePerNight,
        isAvailable: tempAvailable
      };

      const res = await fetch(`/api/rooms/${roomId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });

      if (res.ok) {
        onUpdateRoom(updated);
        setEditingRoomId(null);
        showToast(`Updated ${room.name} tariff to ₹${tempPrice}/night`);
      }
    } catch (err) {
      console.error('Failed to update room', err);
    }
  };

  // Save Hotel Info Content
  const handleSaveHotelInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/site-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editableInfo)
      });
      if (res.ok) {
        onUpdateHotelInfo(editableInfo);
        showToast('Hotel details & website content updated successfully');
      }
    } catch (err) {
      console.error('Failed to save hotel info', err);
    }
  };

  const showToast = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Calculations
  const totalRevenue = bookings
    .filter(b => b.status === 'Confirmed' || b.status === 'Checked-In' || b.status === 'Completed')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
  const newMessages = messages.filter(m => m.status === 'new').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-white rounded-lg shadow-2xl overflow-hidden border border-stone-200 min-h-[550px] max-h-[92vh] flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-900 text-stone-100 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#D4AF37] text-stone-950 rounded">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] tracking-widest uppercase text-[#D4AF37] font-semibold block">
                Management Portal
              </span>
              <h3 className="font-serif text-xl font-bold text-white">
                Manju Hotel Admin Console
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded transition-colors"
                title="Logout from Admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div className="bg-emerald-50 text-emerald-800 px-6 py-2 border-b border-emerald-200 text-xs font-medium flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {statusMessage}
            </span>
            <button onClick={() => setStatusMessage(null)} className="text-emerald-600 hover:text-emerald-900">
              &times;
            </button>
          </div>
        )}

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Admin Login Screen */
          <div className="flex-1 flex items-center justify-center p-6 bg-stone-50">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-stone-200 space-y-6">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 bg-stone-900 text-[#D4AF37] rounded-full mx-auto flex items-center justify-center mb-3">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl font-semibold text-stone-900">
                  Administrator Access
                </h4>
                <p className="text-xs text-stone-500 font-light">
                  Protected portal for Manju Hotel management (Bangomunda).
                </p>
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                    Admin Email Address
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="yogeshchhura@gmail.com"
                    className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3.5 py-2.5 focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                  <span className="text-[11px] text-stone-400">Default admin: yogeshchhura@gmail.com</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                    Security Password
                  </label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter admin password (e.g. admin123)"
                    className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3.5 py-2.5 focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                  <span className="text-[11px] text-stone-400">Demo password: <code className="bg-stone-100 px-1 py-0.5 rounded">admin123</code></span>
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-stone-100 font-semibold text-xs uppercase tracking-wider rounded transition-all shadow active:scale-95 disabled:opacity-50"
                >
                  {isLoggingIn ? 'Authenticating...' : 'Sign In to Dashboard'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-60 bg-stone-100 border-r border-stone-200 p-4 space-y-2 shrink-0 overflow-y-auto">
              <div className="px-3 py-2 text-[11px] uppercase tracking-wider font-bold text-stone-400">
                Menu
              </div>

              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded transition-colors ${
                  activeTab === 'overview' ? 'bg-stone-900 text-stone-100 font-semibold' : 'text-stone-700 hover:bg-stone-200/80'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-[#D4AF37]" />
                  <span>Overview</span>
                </span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded transition-colors ${
                  activeTab === 'messages' ? 'bg-stone-900 text-stone-100 font-semibold' : 'text-stone-700 hover:bg-stone-200/80'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                  <span>Inquiries &amp; Email Log</span>
                </span>
                {newMessages > 0 && (
                  <span className="px-1.5 py-0.5 bg-red-600 text-white text-[10px] rounded-full font-bold">
                    {newMessages}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('bookings')}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded transition-colors ${
                  activeTab === 'bookings' ? 'bg-stone-900 text-stone-100 font-semibold' : 'text-stone-700 hover:bg-stone-200/80'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>Manage Bookings</span>
                </span>
                <span className="text-[11px] text-stone-500 font-mono tabular-nums">
                  {bookings.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('rooms')}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded transition-colors ${
                  activeTab === 'rooms' ? 'bg-stone-900 text-stone-100 font-semibold' : 'text-stone-700 hover:bg-stone-200/80'
                }`}
              >
                <span className="flex items-center gap-2">
                  <BedDouble className="w-4 h-4 text-[#D4AF37]" />
                  <span>Room Tariffs</span>
                </span>
                <span className="text-[11px] text-stone-500 font-mono tabular-nums">
                  {rooms.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('content')}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded transition-colors ${
                  activeTab === 'content' ? 'bg-stone-900 text-stone-100 font-semibold' : 'text-stone-700 hover:bg-stone-200/80'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-[#D4AF37]" />
                  <span>Hotel Info &amp; Settings</span>
                </span>
              </button>

              <div className="pt-6 mt-6 border-t border-stone-200 px-3 text-[11px] text-stone-500 space-y-1">
                <div>Admin: Yogesh Chhura</div>
                <div>Alerts to: yogeshchhura@gmail.com</div>
              </div>
            </aside>

            {/* Main Content Pane */}
            <main className="flex-1 p-6 overflow-y-auto bg-stone-50/50 space-y-6">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 bg-white rounded-lg border border-stone-200 shadow-sm space-y-1">
                      <span className="text-xs text-stone-500 block uppercase font-medium">Total Bookings</span>
                      <div className="font-serif text-3xl font-bold text-stone-900 tabular-nums">
                        {bookings.length}
                      </div>
                      <span className="text-[11px] text-emerald-600 font-medium">Registered in DB</span>
                    </div>

                    <div className="p-5 bg-white rounded-lg border border-stone-200 shadow-sm space-y-1">
                      <span className="text-xs text-stone-500 block uppercase font-medium">Guest Inquiries</span>
                      <div className="font-serif text-3xl font-bold text-stone-900 tabular-nums">
                        {messages.length}
                      </div>
                      <span className="text-[11px] text-stone-500">
                        {newMessages} New / Unread
                      </span>
                    </div>

                    <div className="p-5 bg-white rounded-lg border border-stone-200 shadow-sm space-y-1">
                      <span className="text-xs text-stone-500 block uppercase font-medium">Confirmed Revenue</span>
                      <div className="font-serif text-3xl font-bold text-stone-900 tabular-nums">
                        ₹{totalRevenue.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[11px] text-emerald-600 font-medium">Active Bookings</span>
                    </div>

                    <div className="p-5 bg-white rounded-lg border border-stone-200 shadow-sm space-y-1">
                      <span className="text-xs text-stone-500 block uppercase font-medium">Email Dispatcher</span>
                      <div className="font-sans text-sm font-semibold text-stone-900 truncate">
                        yogeshchhura@gmail.com
                      </div>
                      <span className="text-[11px] text-emerald-600 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        Automated Delivery Active
                      </span>
                    </div>
                  </div>

                  {/* Recent Activity Split */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Inquiries */}
                    <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-lg font-semibold text-stone-900">
                          Recent Contact Inquiries
                        </h4>
                        <button
                          onClick={() => setActiveTab('messages')}
                          className="text-xs text-[#b89758] hover:underline font-medium"
                        >
                          View All ({messages.length}) &rarr;
                        </button>
                      </div>

                      <div className="space-y-3">
                        {messages.slice(0, 3).map((m) => (
                          <div key={m.id} className="p-3 bg-stone-50 rounded border border-stone-200 text-xs space-y-1">
                            <div className="flex items-center justify-between font-semibold text-stone-900">
                              <span>{m.fullName}</span>
                              <span className="text-[10px] text-stone-500 font-normal">{new Date(m.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-stone-600 font-medium truncate">{m.subject}</p>
                            <p className="text-stone-500 line-clamp-1">{m.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Bookings */}
                    <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-lg font-semibold text-stone-900">
                          Recent Room Bookings
                        </h4>
                        <button
                          onClick={() => setActiveTab('bookings')}
                          className="text-xs text-[#b89758] hover:underline font-medium"
                        >
                          View All ({bookings.length}) &rarr;
                        </button>
                      </div>

                      <div className="space-y-3">
                        {bookings.slice(0, 3).map((b) => (
                          <div key={b.id} className="p-3 bg-stone-50 rounded border border-stone-200 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-stone-900">{b.customerName}</span>
                              <span className="font-mono text-[11px] font-bold text-stone-700">{b.id}</span>
                            </div>
                            <div className="flex items-center justify-between text-stone-600">
                              <span>{b.roomName} &bull; {b.totalNights} Night(s)</span>
                              <span className="font-bold text-stone-900 tabular-nums">₹{b.totalAmount}</span>
                            </div>
                            <span className="inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                              {b.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CONTACT MESSAGES & EMAIL DISPATCH LOG */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-xl font-semibold text-stone-900">
                        Inquiries &amp; Automated Email Dispatches
                      </h4>
                      <p className="text-xs text-stone-500">
                        All inquiries received via the website contact form. Instant notification is sent to yogeshchhura@gmail.com with customer reply-to.
                      </p>
                    </div>

                    <button
                      onClick={fetchData}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-700 hover:text-stone-900 bg-white border border-stone-300 rounded shadow-sm"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Refresh</span>
                    </button>
                  </div>

                  {messages.length === 0 ? (
                    <div className="p-8 text-center text-xs text-stone-500 bg-white rounded border border-stone-200">
                      No customer inquiries found.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((m) => (
                        <div
                          key={m.id}
                          className={`p-5 rounded-lg border transition-all ${
                            m.status === 'new'
                              ? 'bg-amber-50/40 border-amber-200'
                              : 'bg-white border-stone-200'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-stone-200 pb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-serif text-lg font-bold text-stone-900">
                                  {m.fullName}
                                </span>
                                {m.status === 'new' && (
                                  <span className="px-2 py-0.5 bg-amber-500 text-stone-950 font-bold text-[10px] rounded uppercase">
                                    New Inquiry
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600 mt-1">
                                <a href={`mailto:${m.email}`} className="text-[#b89758] font-medium hover:underline flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {m.email}
                                </a>
                                <a href={`tel:${m.phone}`} className="text-stone-800 font-medium hover:underline flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {m.phone}
                                </a>
                                <span className="text-stone-400">
                                  Submitted: {new Date(m.createdAt).toLocaleString('en-IN')}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 self-start">
                              <select
                                value={m.status}
                                onChange={(e) => handleMessageStatusChange(m.id, e.target.value as any)}
                                className="text-xs bg-white border border-stone-300 rounded px-2 py-1 text-stone-700"
                              >
                                <option value="new">Status: New</option>
                                <option value="read">Status: Read</option>
                                <option value="replied">Status: Replied</option>
                              </select>

                              <button
                                onClick={() => handleDeleteMessage(m.id)}
                                className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                                title="Delete inquiry record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Message Content */}
                          <div className="py-3 space-y-1">
                            <span className="text-xs font-bold text-stone-800 block">
                              Subject: {m.subject}
                            </span>
                            <div className="p-3 bg-stone-50 rounded border border-stone-200 text-xs text-stone-800 leading-relaxed whitespace-pre-wrap">
                              {m.message}
                            </div>
                          </div>

                          {/* Actions Strip */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                            <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Dispatched to Admin ({m.adminEmail})</span>
                              {m.dispatchId && <span className="font-mono text-stone-400">[{m.dispatchId}]</span>}
                            </div>

                            <div className="flex items-center gap-2">
                              <a
                                href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)} - Manju Hotel Bangomunda`}
                                className="flex items-center gap-1 px-3 py-1.5 bg-stone-900 text-stone-100 hover:bg-stone-800 rounded font-medium text-xs transition-colors"
                              >
                                <Send className="w-3 h-3 text-[#D4AF37]" />
                                <span>Reply to Guest</span>
                              </a>
                              <a
                                href={`tel:${m.phone}`}
                                className="flex items-center gap-1 px-3 py-1.5 bg-[#D4AF37] text-stone-950 hover:bg-[#c59e2a] rounded font-semibold text-xs transition-colors"
                              >
                                <Phone className="w-3 h-3" />
                                <span>Call {m.phone}</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: MANAGE BOOKINGS */}
              {activeTab === 'bookings' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-xl font-semibold text-stone-900">
                        Guest Room Bookings
                      </h4>
                      <p className="text-xs text-stone-500">
                        Review, confirm, or modify upcoming guest stays and check-in statuses.
                      </p>
                    </div>

                    <button
                      onClick={fetchData}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-700 hover:text-stone-900 bg-white border border-stone-300 rounded shadow-sm"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Refresh</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto bg-white rounded-lg border border-stone-200 shadow-sm">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-stone-100 border-b border-stone-200 text-stone-700 uppercase font-semibold text-[11px]">
                        <tr>
                          <th className="p-3">Ref ID</th>
                          <th className="p-3">Guest Details</th>
                          <th className="p-3">Room Type</th>
                          <th className="p-3">Dates</th>
                          <th className="p-3">Guests</th>
                          <th className="p-3">Amount</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        {bookings.map((b) => (
                          <tr key={b.id} className="hover:bg-stone-50/80 transition-colors">
                            <td className="p-3 font-mono font-bold text-stone-900 whitespace-nowrap">
                              {b.id}
                            </td>
                            <td className="p-3">
                              <span className="font-semibold text-stone-900 block">{b.customerName}</span>
                              <span className="text-stone-500 text-[11px] block">{b.phone}</span>
                              <span className="text-stone-500 text-[11px] block">{b.email}</span>
                            </td>
                            <td className="p-3 font-medium text-stone-800">
                              {b.roomName}
                            </td>
                            <td className="p-3 text-stone-600 whitespace-nowrap">
                              <div>In: {b.checkIn}</div>
                              <div>Out: {b.checkOut}</div>
                              <span className="text-[10px] text-[#b89758] font-semibold">{b.totalNights} Night(s)</span>
                            </td>
                            <td className="p-3 text-stone-600">
                              {b.guests?.adults || 2} Adults, {b.guests?.children || 0} Child
                            </td>
                            <td className="p-3 font-serif font-bold text-stone-900 tabular-nums">
                              ₹{b.totalAmount}
                            </td>
                            <td className="p-3">
                              <select
                                value={b.status}
                                onChange={(e) => handleBookingStatusChange(b.id, e.target.value as any)}
                                className={`text-xs font-semibold px-2 py-1 rounded border ${
                                  b.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                                  b.status === 'Checked-In' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                                  b.status === 'Cancelled' ? 'bg-red-50 text-red-800 border-red-300' :
                                  'bg-stone-100 text-stone-800 border-stone-300'
                                }`}
                              >
                                <option value="Confirmed">Confirmed</option>
                                <option value="Pending">Pending</option>
                                <option value="Checked-In">Checked-In</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: ROOM TARIFFS & AVAILABILITY */}
              {activeTab === 'rooms' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-serif text-xl font-semibold text-stone-900">
                      Manage Room Tariffs &amp; Details
                    </h4>
                    <p className="text-xs text-stone-500">
                      Update rates, original prices, and room availability in real-time.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rooms.map((room) => {
                      const isEditing = editingRoomId === room.id;

                      return (
                        <div
                          key={room.id}
                          className="bg-white p-5 rounded-lg border border-stone-200 shadow-sm space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[11px] uppercase tracking-wider text-[#b89758] font-semibold block">
                                {room.category}
                              </span>
                              <h5 className="font-serif text-lg font-semibold text-stone-900">
                                {room.name}
                              </h5>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                              room.isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {room.isAvailable ? 'Available' : 'Sold Out'}
                            </span>
                          </div>

                          {isEditing ? (
                            <div className="space-y-3 pt-2 border-t border-stone-200">
                              <div className="space-y-1">
                                <label className="text-xs font-semibold text-stone-700 block">
                                  Tariff (₹ per night)
                                </label>
                                <input
                                  type="number"
                                  value={tempPrice}
                                  onChange={(e) => setTempPrice(parseInt(e.target.value, 10))}
                                  className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3 py-2"
                                />
                              </div>

                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  id={`avail_${room.id}`}
                                  checked={tempAvailable}
                                  onChange={(e) => setTempAvailable(e.target.checked)}
                                  className="rounded border-stone-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                                />
                                <label htmlFor={`avail_${room.id}`} className="text-xs text-stone-700">
                                  Mark Room Available for Booking
                                </label>
                              </div>

                              <div className="flex items-center gap-2 pt-2">
                                <button
                                  onClick={() => handleSaveRoom(room.id)}
                                  className="px-4 py-1.5 bg-stone-900 text-stone-100 text-xs font-semibold rounded hover:bg-stone-800"
                                >
                                  Save Tariff
                                </button>
                                <button
                                  onClick={() => setEditingRoomId(null)}
                                  className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-end justify-between pt-2 border-t border-stone-100">
                              <div>
                                <span className="text-xs text-stone-500 block">Current Rate:</span>
                                <span className="font-serif text-2xl font-bold text-stone-900 tabular-nums">
                                  ₹{room.pricePerNight}
                                </span>
                                <span className="text-xs text-stone-500"> / night</span>
                              </div>

                              <button
                                onClick={() => {
                                  setEditingRoomId(room.id);
                                  setTempPrice(room.pricePerNight);
                                  setTempAvailable(room.isAvailable);
                                }}
                                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-medium transition-colors"
                              >
                                Edit Tariff
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 5: HOTEL CONTENT & SETTINGS */}
              {activeTab === 'content' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-serif text-xl font-semibold text-stone-900">
                      Website Content &amp; Contact Configurations
                    </h4>
                    <p className="text-xs text-stone-500">
                      Adjust hotel details, phone numbers, recipient email, and announcements.
                    </p>
                  </div>

                  <form onSubmit={handleSaveHotelInfo} className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm space-y-4 max-w-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                          Hotel Name
                        </label>
                        <input
                          type="text"
                          value={editableInfo.name}
                          onChange={(e) => setEditableInfo({ ...editableInfo, name: e.target.value })}
                          className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3 py-2"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                          Hotel Subtitle / Tagline
                        </label>
                        <input
                          type="text"
                          value={editableInfo.tagline}
                          onChange={(e) => setEditableInfo({ ...editableInfo, tagline: e.target.value })}
                          className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3 py-2"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                          Front Desk Contact Number
                        </label>
                        <input
                          type="text"
                          value={editableInfo.phone}
                          onChange={(e) => setEditableInfo({ ...editableInfo, phone: e.target.value })}
                          className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3 py-2"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                          Admin Notification Email
                        </label>
                        <input
                          type="email"
                          value={editableInfo.email}
                          onChange={(e) => setEditableInfo({ ...editableInfo, email: e.target.value })}
                          className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3 py-2"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                          Address &amp; Location
                        </label>
                        <input
                          type="text"
                          value={editableInfo.address}
                          onChange={(e) => setEditableInfo({ ...editableInfo, address: e.target.value })}
                          className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3 py-2"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                          PIN Code
                        </label>
                        <input
                          type="text"
                          value={editableInfo.pincode}
                          onChange={(e) => setEditableInfo({ ...editableInfo, pincode: e.target.value })}
                          className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3 py-2"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block">
                        Promotional Announcement Banner
                      </label>
                      <textarea
                        rows={2}
                        value={editableInfo.announcement}
                        onChange={(e) => setEditableInfo({ ...editableInfo, announcement: e.target.value })}
                        className="w-full text-xs font-medium text-stone-800 bg-stone-50 border border-stone-300 rounded px-3 py-2"
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="flex items-center gap-1.5 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                      >
                        <Save className="w-4 h-4 text-[#D4AF37]" />
                        <span>Save Website Settings</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
};
