import { HotelInfo, Room, MenuItem, GalleryItem, Testimonial } from '../types';

export const INITIAL_HOTEL_INFO: HotelInfo = {
  name: "Manju Hotel",
  tagline: "Experience Comfort, Hospitality & Luxury",
  address: "Main Road, Bangomunda",
  city: "Bangomunda",
  state: "Odisha",
  pincode: "767040",
  country: "India",
  phone: "+91 9668612323",
  email: "yogeshchhura@gmail.com",
  whatsapp: "+919668612323",
  checkInTime: "12:00 PM",
  checkOutTime: "11:00 AM",
  aboutText: "Welcome to Manju Hotel, the premier destination for comfortable, luxurious, and hospitable accommodation in Bangomunda, Odisha. Strategically located with seamless accessibility, Manju Hotel combines traditional Odia warmth with modern hospitality amenities. Whether you are traveling for business, family vacations, cultural visits, or social events, we offer meticulously appointed air-conditioned rooms, fine dining flavors, high-speed Wi-Fi, and 24/7 dedicated service to make your stay memorable.",
  googleMapsUrl: "https://maps.google.com/?q=Bangomunda+Odisha+767040",
  announcement: "Special 10% discount on direct online room bookings. Free high-speed Wi-Fi and complimentary morning breakfast with premium stays."
};

export const INITIAL_ROOMS: Room[] = [
  {
    id: "deluxe-ac",
    name: "Deluxe AC Room",
    category: "Deluxe",
    tagline: "Modern comfort designed for solo travelers & couples",
    pricePerNight: 1499,
    originalPrice: 1899,
    capacity: { adults: 2, children: 1 },
    bedType: "King Size Bed",
    roomSize: "280 sq ft",
    description: "Our Deluxe AC Room features a plush king-size bed, tranquil ambient lighting, premium bedding, and a sleek work desk. Ideal for business visitors and travelers seeking quiet comfort.",
    amenities: [
      "High Efficiency Air Conditioning",
      "High-Speed Free Wi-Fi",
      "43\" Smart HD LED TV",
      "24/7 Running Hot & Cold Water",
      "Daily Housekeeping",
      "Electric Kettle & Tea/Coffee Setup",
      "Intercom & Room Service",
      "Modern En-suite Bathroom"
    ],
    features: ["King Bed", "City View", "Free Breakfast", "Work Desk"],
    image: "/src/assets/images/room_deluxe_double_1793871084976.jpg",
    galleryImages: [
      "/src/assets/images/room_deluxe_double_1793871084976.jpg",
      "/src/assets/images/hotel_lobby_lounge_1793871087240.jpg"
    ],
    isAvailable: true,
    featured: true
  },
  {
    id: "super-deluxe-ac",
    name: "Super Deluxe AC Room",
    category: "Super Deluxe",
    tagline: "Elevated elegance with extra living space & premium furnishings",
    pricePerNight: 2199,
    originalPrice: 2699,
    capacity: { adults: 2, children: 2 },
    bedType: "California King Bed",
    roomSize: "360 sq ft",
    description: "Experience enhanced indulgence in our Super Deluxe room. Features custom mahogany furniture, relaxing seating armchairs, lavish bath fittings, and floor-to-ceiling drapery.",
    amenities: [
      "Inverter AC Climate Control",
      "Ultra High-Speed Wi-Fi",
      "50\" Smart 4K TV with OTT",
      "Mini Refrigerator",
      "Plush Bathrobes & Toiletries",
      "24/7 Hot Water Geyser",
      "Express Laundry Service",
      "Dedicated In-Room Dining"
    ],
    features: ["Super King Bed", "Balcony View", "Complimentary Breakfast", "Lounge Armchairs"],
    image: "/src/assets/images/room_executive_suite_1793871087344.jpg",
    galleryImages: [
      "/src/assets/images/room_executive_suite_1793871087344.jpg",
      "/src/assets/images/hotel_exterior_hero_1793871084312.jpg"
    ],
    isAvailable: true,
    featured: true
  },
  {
    id: "executive-suite",
    name: "Presidential Executive Suite",
    category: "Executive Suite",
    tagline: "The pinnacle of luxury with private lounge and VIP amenities",
    pricePerNight: 3299,
    originalPrice: 3999,
    capacity: { adults: 3, children: 2 },
    bedType: "Master Luxury King Bed",
    roomSize: "520 sq ft",
    description: "The crown jewel of Manju Hotel. A generous master bedroom seamlessly connected to an intimate drawing room lounge, designer sofa set, premium bathroom with glass shower cubicle, and dedicated concierge.",
    amenities: [
      "Dual Inverter AC Zones",
      "Ultra-Fast Dedicated Wi-Fi",
      "55\" Ultra HD Smart TV",
      "Separate Living Lounge & Sofa",
      "Executive Workstation",
      "Mini Bar & Refreshment Bar",
      "Luxury Herbal Toiletries",
      "Priority Room Service & Check-In"
    ],
    features: ["Separate Living Area", "Luxury King Bed", "Complimentary Breakfast & Hi-Tea", "VIP Concierge"],
    image: "/src/assets/images/room_executive_suite_1793871087344.jpg",
    galleryImages: [
      "/src/assets/images/room_executive_suite_1793871087344.jpg",
      "/src/assets/images/hotel_lobby_lounge_1793871087240.jpg",
      "/src/assets/images/restaurant_dining_1793871086578.jpg"
    ],
    isAvailable: true,
    featured: true
  },
  {
    id: "family-ac-suite",
    name: "Family AC Suite",
    category: "Family Suite",
    tagline: "Spacious multi-bed haven designed for families and group stays",
    pricePerNight: 2799,
    originalPrice: 3499,
    capacity: { adults: 4, children: 2 },
    bedType: "Two Double Beds",
    roomSize: "460 sq ft",
    description: "Tailored specifically for families visiting Western Odisha. Two comfortable beds, ample storage, luggage racks, dining table space, and round-the-clock room service to keep everyone smiling.",
    amenities: [
      "Twin High-Capacity ACs",
      "High-Speed Wi-Fi",
      "48\" Smart LED TV",
      "Multiple Bed Setup",
      "Large Wardrobes & Luggage Bench",
      "Round-the-Clock Hot Water",
      "Kid-Friendly Dining Options",
      "24/7 Front Desk Assistance"
    ],
    features: ["2 Large Beds", "Spacious Layout", "Family Dining Table", "Complimentary Breakfast"],
    image: "/src/assets/images/room_deluxe_double_1793871084976.jpg",
    galleryImages: [
      "/src/assets/images/room_deluxe_double_1793871084976.jpg",
      "/src/assets/images/restaurant_dining_1793871086578.jpg"
    ],
    isAvailable: true,
    featured: false
  }
];

export const INITIAL_MENU: MenuItem[] = [
  // Odia Delicacies
  { id: "m1", category: "Odia Delicacies", name: "Chhena Jhili & Rasagola Platter", price: 140, description: "Authentic Odisha fresh cottage cheese sweets soaked in fragrant cardamom syrup.", isVeg: true, isChefSpecial: true },
  { id: "m2", category: "Odia Delicacies", name: "Dalma with Steamed Rice & Ghee", price: 180, description: "Traditional Odia lentil preparation simmered with raw papaya, pumpkin, potatoes, and aromatic roasted cumin.", isVeg: true, isChefSpecial: true },
  { id: "m3", category: "Odia Delicacies", name: "Macha Besara (Odia Fish Curry)", price: 260, description: "Fresh river fish cooked in authentic mustard and panch phoran paste with sun-dried raw mangoes.", isVeg: false, isChefSpecial: true },
  { id: "m4", category: "Odia Delicacies", name: "Santula with Hot Phulkas", price: 160, description: "Gentle stir-boiled fresh local farm vegetables lightly tempered with garlic and mustard seeds.", isVeg: true },

  // Breakfast
  { id: "m5", category: "Breakfast", name: "South Indian Ghee Roast Masala Dosa", price: 120, description: "Crispy golden crepe filled with spiced potato masala, served with 2 chutneys and steaming sambar.", isVeg: true },
  { id: "m6", category: "Breakfast", name: "Steaming Idli & Medu Vada Combo", price: 100, description: "Soft fluffy steamed rice cakes and crunchy lentil donuts served with home-style coconut chutney.", isVeg: true },
  { id: "m7", category: "Breakfast", name: "Aloo Paratha with Curd & Pickle", price: 110, description: "Two stuffed whole wheat flatbreads with spiced mashed potato, fresh butter dollop, and chilled curd.", isVeg: true },
  { id: "m8", category: "Breakfast", name: "Eggs to Order with Butter Toast", price: 110, description: "Omelette / Scrambled / Sunny side up eggs with crisp golden buttered bread and grilled tomato.", isVeg: false },
  { id: "m9", category: "Breakfast", name: "Poori Bhaji (4 pcs)", price: 100, description: "Golden puffed wheat breads served with traditional spiced potato curry and green chilli pickle.", isVeg: true },

  // North Indian & Main Course
  { id: "m10", category: "North Indian", name: "Paneer Butter Masala", price: 230, description: "Tender cottage cheese cubes simmered in a velvety tomato, cashew, and rich butter gravy.", isVeg: true },
  { id: "m11", category: "North Indian", name: "Butter Chicken Delhi Style", price: 310, description: "Charcoal-grilled chicken pieces stewed in rich silky makhani gravy with fenugreek aroma.", isVeg: false, isChefSpecial: true },
  { id: "m12", category: "North Indian", name: "Kadhai Paneer", price: 220, description: "Cottage cheese, bell peppers, and onions tossed with freshly ground coriander and red chillies.", isVeg: true },
  { id: "m13", category: "North Indian", name: "Mutton Rogan Josh", price: 360, description: "Slow-braised tender goat meat cooked with Kashmiri spices, ratanjot, and fragrant yogurt broth.", isVeg: false, isChefSpecial: true },
  { id: "m14", category: "North Indian", name: "Dal Makhani", price: 190, description: "Slow overnight cooked black lentils and kidney beans enriched with dairy cream and white butter.", isVeg: true },

  // Biryani & Rice
  { id: "m15", category: "Biryani & Rice", name: "Hyderabadi Chicken Dum Biryani", price: 270, description: "Fragrant long-grain aged basmati rice layered with spiced marinated chicken and saffron milk.", isVeg: false, isChefSpecial: true },
  { id: "m16", category: "Biryani & Rice", name: "Royal Shahi Veg Biryani", price: 210, description: "Basmati rice cooked in dum with fresh garden vegetables, paneer cubes, mint, and dry fruits.", isVeg: true },
  { id: "m17", category: "Biryani & Rice", name: "Jeera Rice with Fried Onions", price: 130, description: "Steamed basmati rice tempered with roasted cumin seeds and desi ghee.", isVeg: true },

  // Tandoor & Breads
  { id: "m18", category: "Chinese & Tandoor", name: "Butter Garlic Naan / Tandoori Roti", price: 50, description: "Clay oven baked flatbread brushed with fresh garlic and melted butter.", isVeg: true },
  { id: "m19", category: "Chinese & Tandoor", name: "Paneer Tikka Angara", price: 220, description: "Marinated cottage cheese and capsicum grilled to smoky perfection in clay tandoor.", isVeg: true },
  { id: "m20", category: "Chinese & Tandoor", name: "Chilli Chicken Dry / Gravy", price: 250, description: "Crispy fried boneless chicken tossed with green bell peppers, dark soya, and scallions.", isVeg: false },

  // Beverages & Desserts
  { id: "m21", category: "Beverages & Desserts", name: "Fresh Masala Kulhad Chai", price: 35, description: "Brewed black tea infused with crushed ginger, cardamom, and fresh buffalo milk.", isVeg: true },
  { id: "m22", category: "Beverages & Desserts", name: "Filter Coffee South Style", price: 45, description: "Strong freshly decocted chicory blend served frothy in brass dabarah.", isVeg: true },
  { id: "m23", category: "Beverages & Desserts", name: "Sweet Lassi with Malai Topping", price: 70, description: "Chilled hand-churned yogurt beverage sprinkled with crushed pistachios and saffron.", isVeg: true },
  { id: "m24", category: "Beverages & Desserts", name: "Gulab Jamun with Rabdi (2 pcs)", price: 90, description: "Warm khoya dumplings served over chilled thickened cardamom rabdi.", isVeg: true }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "g1",
    title: "Manju Hotel Grand Facade",
    category: "hotel",
    image: "/src/assets/images/hotel_exterior_hero_1793871084312.jpg",
    caption: "Exterior facade illuminated warmly at twilight in Bangomunda"
  },
  {
    id: "g2",
    title: "Deluxe Bedroom Suite",
    category: "rooms",
    image: "/src/assets/images/room_deluxe_double_1793871084976.jpg",
    caption: "Spacious deluxe bedroom with king bed and ambient reading sconces"
  },
  {
    id: "g3",
    title: "Executive Suite Lounge",
    category: "rooms",
    image: "/src/assets/images/room_executive_suite_1793871087344.jpg",
    caption: "Executive suite with dedicated living room lounge and luxury hardwood flooring"
  },
  {
    id: "g4",
    title: "The Royal Dining Hall",
    category: "dining",
    image: "/src/assets/images/restaurant_dining_1793871086578.jpg",
    caption: "Multi-cuisine fine dining restaurant offering authentic Odia, Indian, and continental delights"
  },
  {
    id: "g5",
    title: "Welcoming Reception Lobby",
    category: "reception",
    image: "/src/assets/images/hotel_lobby_lounge_1793871087240.jpg",
    caption: "24/7 guest hospitality desk, marble reception, and guest lounge"
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Dr. Rajeshwar Mishra",
    location: "Bhubaneswar, Odisha",
    rating: 5,
    date: "February 2026",
    comment: "Outstanding hospitality in Bangomunda! Finding such clean, comfortable AC rooms with prompt room service and delicious food was a pleasant surprise. Staff is courteous and very accommodating.",
    roomStayed: "Super Deluxe AC Room",
    verified: true
  },
  {
    id: "t2",
    name: "Sunita Patra",
    location: "Raipur, Chhattisgarh",
    rating: 5,
    date: "January 2026",
    comment: "We stayed at Manju Hotel for a family wedding ceremony in the district. The suites were pristine, bathrooms spotless with hot water 24/7, and the Odia meals tasted just like home. Highly recommended!",
    roomStayed: "Executive Suite",
    verified: true
  },
  {
    id: "t3",
    name: "Anand Verma",
    location: "Rourkela, Odisha",
    rating: 5,
    date: "March 2026",
    comment: "Great experience during my business transit. The Wi-Fi connection was fast, parking was secure, and check-in was seamless. The manager Mr. Yogesh took personal care of all arrangements.",
    roomStayed: "Deluxe AC Room",
    verified: true
  }
];

export const INITIAL_FACILITIES = [
  {
    title: "24/7 Front Desk & Concierge",
    description: "Round-the-clock warm hospitality, express check-in/check-out, luggage storage, and local travel guidance.",
    icon: "Clock"
  },
  {
    title: "High-Speed Free Wi-Fi",
    description: "Seamless wireless broadband connectivity across all guest rooms, restaurant, and lobby areas.",
    icon: "Wifi"
  },
  {
    title: "Multi-Cuisine Restaurant",
    description: "Serving authentic Odia dishes, North Indian gravies, South Indian breakfasts, and fresh tandoor delicacies.",
    icon: "UtensilsCrossed"
  },
  {
    title: "Daily Housekeeping & Laundry",
    description: "Pristine hygiene standards with fresh daily linen, sanitized washrooms, and express laundry service.",
    icon: "Sparkles"
  },
  {
    title: "24-Hour Hot & Cold Water",
    description: "Uninterrupted pressurized running water with modern geysers in all private en-suite bathrooms.",
    icon: "Droplets"
  },
  {
    title: "Full Power Backup (Generator)",
    description: "Continuous 100% electrical backup guaranteeing AC, lights, and Wi-Fi without interruption.",
    icon: "Zap"
  },
  {
    title: "Free Secure Parking",
    description: "Ample on-premises car and two-wheeler parking with 24/7 CCTV surveillance and security.",
    icon: "ShieldCheck"
  },
  {
    title: "Room Service & Dining",
    description: "Enjoy hot, fresh meals delivered straight to your room with just a single call to the front desk.",
    icon: "Bell"
  }
];
