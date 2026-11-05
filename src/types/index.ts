export interface Room {
  id: string;
  name: string;
  category: 'Deluxe' | 'Super Deluxe' | 'Executive Suite' | 'Family Suite';
  tagline: string;
  pricePerNight: number;
  originalPrice?: number;
  capacity: {
    adults: number;
    children: number;
  };
  bedType: string;
  roomSize: string;
  description: string;
  amenities: string[];
  features: string[];
  image: string;
  galleryImages: string[];
  isAvailable: boolean;
  featured?: boolean;
}

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
  };
  roomId: string;
  roomName: string;
  roomPrice: number;
  totalNights: number;
  totalAmount: number;
  specialRequests?: string;
  status: 'Confirmed' | 'Pending' | 'Checked-In' | 'Completed' | 'Cancelled';
  createdAt: string;
  paymentMethod: 'Pay at Hotel (Cash / UPI / Card)' | 'UPI Advance';
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
  notificationSent: boolean;
  adminEmail: string;
  dispatchId?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  roomStayed: string;
  verified: boolean;
}

export interface MenuItem {
  id: string;
  category: 'Breakfast' | 'Odia Delicacies' | 'North Indian' | 'South Indian' | 'Biryani & Rice' | 'Chinese & Tandoor' | 'Beverages & Desserts';
  name: string;
  price: number;
  description: string;
  isVeg: boolean;
  isChefSpecial?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'rooms' | 'dining' | 'hotel' | 'reception';
  image: string;
  caption: string;
}

export interface HotelInfo {
  name: string;
  tagline: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phone: string;
  email: string;
  whatsapp: string;
  checkInTime: string;
  checkOutTime: string;
  aboutText: string;
  googleMapsUrl: string;
  announcement: string;
}
