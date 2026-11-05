import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BookingBar } from './components/BookingBar';
import { AboutSection } from './components/AboutSection';
import { RoomsSection } from './components/RoomsSection';
import { RoomDetailModal } from './components/RoomDetailModal';
import { BookingModal } from './components/BookingModal';
import { FacilitiesSection } from './components/FacilitiesSection';
import { RestaurantMenuSection } from './components/RestaurantMenuSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { VirtualTour3D } from './components/VirtualTour3D';
import { INITIAL_HOTEL_INFO, INITIAL_ROOMS } from './data/initialData';
import { HotelInfo, Room } from './types';
import { Sparkles, X } from 'lucide-react';

export default function App() {
  const [hotelInfo, setHotelInfo] = useState<HotelInfo>(INITIAL_HOTEL_INFO);
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Modals & Sheets
  const [selectedRoomForDetail, setSelectedRoomForDetail] = useState<Room | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingPreselect, setBookingPreselect] = useState<{
    roomId?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  }>({});
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState<boolean>(false);
  const [showAnnouncement, setShowAnnouncement] = useState<boolean>(true);

  // Fetch updated info & rooms from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [infoRes, roomsRes] = await Promise.all([
          fetch('/api/site-content'),
          fetch('/api/rooms')
        ]);
        if (infoRes.ok) {
          const infoData = await infoRes.json();
          if (infoData.info) setHotelInfo(infoData.info);
        }
        if (roomsRes.ok) {
          const roomsData = await roomsRes.json();
          if (roomsData.rooms && roomsData.rooms.length > 0) {
            setRooms(roomsData.rooms);
          }
        }
      } catch (err) {
        console.warn('Backend loading note (using initial data seed):', err);
      }
    };
    fetchData();
  }, []);

  // Smooth scroll or navigate to section
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (roomId?: string) => {
    if (roomId) {
      setBookingPreselect(prev => ({ ...prev, roomId }));
    }
    setIsBookingModalOpen(true);
  };

  const handleBookingBarSearch = (params: { checkIn: string; checkOut: string; guests: number; roomId: string }) => {
    setBookingPreselect(params);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-stone-900 font-sans selection:bg-[#D4AF37]/20 selection:text-[#8C6D1F]">
      {/* Promotional Top Announcement Banner */}
      {showAnnouncement && hotelInfo.announcement && (
        <div className="bg-[#D4AF37] text-stone-950 px-4 py-2 text-xs font-semibold flex items-center justify-between shadow-sm z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center flex-1">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{hotelInfo.announcement}</span>
            <button
              onClick={() => handleOpenBooking()}
              className="underline hover:text-white font-bold whitespace-nowrap ml-1 cursor-pointer"
            >
              Book Direct &rarr;
            </button>
          </div>
          <button
            onClick={() => setShowAnnouncement(false)}
            className="p-1 hover:bg-black/10 rounded-full transition-colors text-stone-900"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Primary Top Bar Navbar */}
      <Navbar
        hotelInfo={hotelInfo}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setIsAdminDashboardOpen(true)}
        isAdminLoggedIn={sessionStorage.getItem('manju_admin_auth') === 'true'}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          hotelInfo={hotelInfo}
          onBookNow={() => handleOpenBooking()}
          onExploreRooms={() => handleNavigate('rooms')}
        />

        {/* 2. Interactive Booking Availability Bar */}
        <BookingBar
          rooms={rooms}
          onSearch={handleBookingBarSearch}
        />

        {/* 3. About Us Section */}
        <AboutSection
          hotelInfo={hotelInfo}
          onExploreRooms={() => handleNavigate('rooms')}
          onContactClick={() => handleNavigate('contact')}
        />

        {/* 4. Rooms & Accommodation Section */}
        <RoomsSection
          rooms={rooms}
          onSelectRoomDetails={(room) => setSelectedRoomForDetail(room)}
          onBookRoom={(room) => handleOpenBooking(room.id)}
        />

        {/* 5. Interactive 3D Virtual Tour & Suite Visualizer */}
        <VirtualTour3D
          onBookNow={() => handleOpenBooking()}
        />

        {/* 6. Hotel Facilities & Services */}
        <FacilitiesSection />

        {/* 6. Restaurant & Food Menu */}
        <RestaurantMenuSection />

        {/* 7. Photo Gallery */}
        <GallerySection />

        {/* 8. Customer Reviews & Testimonials */}
        <TestimonialsSection />

        {/* 9. Contact Us & Email Notification System */}
        <ContactSection
          hotelInfo={hotelInfo}
        />
      </main>

      {/* Footer */}
      <Footer
        hotelInfo={hotelInfo}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenPrivacy={() => setIsPrivacyPolicyOpen(true)}
        onOpenAdmin={() => setIsAdminDashboardOpen(true)}
      />

      {/* Floating Direct Call & WhatsApp Contact */}
      <WhatsAppFloat
        phone={hotelInfo.phone}
        whatsapp={hotelInfo.whatsapp}
      />

      {/* Modals & Dialogs */}
      {selectedRoomForDetail && (
        <RoomDetailModal
          room={selectedRoomForDetail}
          onClose={() => setSelectedRoomForDetail(null)}
          onBookNow={(room) => {
            setSelectedRoomForDetail(null);
            handleOpenBooking(room.id);
          }}
        />
      )}

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        rooms={rooms}
        initialRoomId={bookingPreselect.roomId}
        initialCheckIn={bookingPreselect.checkIn}
        initialCheckOut={bookingPreselect.checkOut}
        initialGuests={bookingPreselect.guests}
      />

      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        hotelInfo={hotelInfo}
        onUpdateHotelInfo={(newInfo) => setHotelInfo(newInfo)}
        rooms={rooms}
        onUpdateRoom={(updatedRoom) => {
          setRooms(rooms.map(r => r.id === updatedRoom.id ? updatedRoom : r));
        }}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
      />
    </div>
  );
}
