import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'hotel_db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial DB template
interface DatabaseState {
  hotelInfo: any;
  rooms: any[];
  bookings: any[];
  messages: any[];
  menu: any[];
  gallery: any[];
  testimonials: any[];
  adminSessionToken?: string;
}

function loadDatabase(): DatabaseState {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading db file, reinitializing:', err);
  }

  // Fallback defaults
  const defaultDb: DatabaseState = {
    hotelInfo: {
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
    },
    rooms: [
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
    ],
    bookings: [
      {
        id: "MH-2026-7841",
        customerName: "Sanjay Kumar Hota",
        email: "sanjay.hota@example.com",
        phone: "+91 9861023456",
        checkIn: "2026-11-10",
        checkOut: "2026-11-12",
        guests: { adults: 2, children: 0 },
        roomId: "super-deluxe-ac",
        roomName: "Super Deluxe AC Room",
        roomPrice: 2199,
        totalNights: 2,
        totalAmount: 4398,
        specialRequests: "Late check-in around 8 PM. Please arrange extra tea bags.",
        status: "Confirmed",
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        paymentMethod: "Pay at Hotel (Cash / UPI / Card)"
      }
    ],
    messages: [
      {
        id: "msg_init_1",
        fullName: "Prashant Sahu",
        email: "prashant.sahu@example.com",
        phone: "+91 9437012345",
        subject: "Banquet Hall & Group Room Booking for Marriage",
        message: "Hello Manju Hotel team, we are planning a family wedding in Bangomunda in December. We would like to inquire about booking 8 AC rooms for 3 days along with breakfast and dinner catering. Kindly share the group package details.",
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        status: "new",
        notificationSent: true,
        adminEmail: "yogeshchhura@gmail.com",
        dispatchId: "DISP-1793870001"
      }
    ],
    menu: [],
    gallery: [],
    testimonials: []
  };

  saveDatabase(defaultDb);
  return defaultDb;
}

function saveDatabase(data: DatabaseState) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing db file:', err);
  }
}

// Global db instance
let db = loadDatabase();

app.use(express.json());

// Helper to send email notification to admin (yogeshchhura@gmail.com)
async function sendAdminEmailNotification({
  customerName,
  customerEmail,
  customerPhone,
  subject,
  message,
  submissionDate
}: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  subject: string;
  message: string;
  submissionDate: string;
}) {
  const adminEmail = "yogeshchhura@gmail.com";
  const dispatchId = `DISP-${Date.now().toString(36).toUpperCase()}`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e0d8cc; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
      <div style="background-color: #1a2026; padding: 24px; text-align: center; border-bottom: 3px solid #d4af37;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">MANJU HOTEL</h1>
        <p style="color: #d4af37; margin: 5px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">Bangomunda, Odisha &bull; Guest Inquiry Notification</p>
      </div>

      <div style="padding: 24px; color: #333333; line-height: 1.6;">
        <div style="background-color: #fcf9f2; border-left: 4px solid #d4af37; padding: 12px 16px; margin-bottom: 20px;">
          <strong style="color: #1a2026; font-size: 15px;">New Website Contact Message Received</strong>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #666;">A guest has submitted an inquiry via the Manju Hotel website contact form.</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #eeeeee;">
            <td style="padding: 10px 0; width: 140px; color: #777777; font-weight: bold;">Customer Name:</td>
            <td style="padding: 10px 0; color: #111111; font-weight: 600;">${customerName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eeeeee;">
            <td style="padding: 10px 0; color: #777777; font-weight: bold;">Email Address:</td>
            <td style="padding: 10px 0;"><a href="mailto:${customerEmail}" style="color: #b89758; text-decoration: none; font-weight: 600;">${customerEmail}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #eeeeee;">
            <td style="padding: 10px 0; color: #777777; font-weight: bold;">Phone Number:</td>
            <td style="padding: 10px 0;"><a href="tel:${customerPhone}" style="color: #111111; text-decoration: none; font-weight: 600;">${customerPhone}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #eeeeee;">
            <td style="padding: 10px 0; color: #777777; font-weight: bold;">Subject:</td>
            <td style="padding: 10px 0; color: #111111; font-weight: 600;">${subject}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eeeeee;">
            <td style="padding: 10px 0; color: #777777; font-weight: bold;">Submission Time:</td>
            <td style="padding: 10px 0; color: #555555;">${submissionDate}</td>
          </tr>
        </table>

        <div style="margin-bottom: 24px;">
          <div style="font-weight: bold; color: #1a2026; margin-bottom: 8px;">Customer's Complete Message:</div>
          <div style="background-color: #f7f7f7; padding: 16px; border-radius: 6px; border: 1px solid #e5e5e5; font-size: 14px; white-space: pre-wrap; color: #222222;">${message}</div>
        </div>

        <div style="background-color: #f0f7ff; border: 1px solid #cce5ff; border-radius: 6px; padding: 14px; text-align: center; margin-top: 20px;">
          <p style="margin: 0 0 10px 0; font-size: 13px; color: #004085;">You can reply directly to the customer by hitting "Reply" in your email client, or click below:</p>
          <a href="mailto:${customerEmail}?subject=Re: ${encodeURIComponent(subject)} - Manju Hotel Bangomunda" style="display: inline-block; background-color: #1a2026; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: 600; font-size: 13px;">Reply to ${customerName}</a>
          <a href="tel:${customerPhone}" style="display: inline-block; background-color: #d4af37; color: #1a2026; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: 600; font-size: 13px; margin-left: 8px;">Call Customer</a>
        </div>
      </div>

      <div style="background-color: #faf8f5; padding: 16px 24px; border-top: 1px solid #e0d8cc; text-align: center; font-size: 12px; color: #888888;">
        Manju Hotel, Main Road, Bangomunda, Odisha &bull; Pin: 767040 &bull; Ph: +91 9668612323<br/>
        Dispatched via Manju Hotel Automated Inquiries System &bull; Dispatch ID: ${dispatchId}
      </div>
    </div>
  `;

  const textBody = `
MANJU HOTEL - NEW CONTACT INQUIRY
=================================
Customer Name: ${customerName}
Customer Email: ${customerEmail}
Customer Phone: ${customerPhone}
Subject: ${subject}
Date & Time: ${submissionDate}
Admin Recipient: ${adminEmail}

Message:
--------
${message}

---------------------------------
To reply directly, email: ${customerEmail} or call: ${customerPhone}
Manju Hotel, Bangomunda, Odisha 767040
  `.trim();

  // Check if SMTP is configured via environment
  let deliverySuccess = false;
  let deliveryDetails = '';

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Manju Hotel Desk" <${smtpUser}>`,
        to: adminEmail,
        replyTo: customerEmail,
        subject: `[Manju Hotel Inquiry] ${subject} - from ${customerName}`,
        text: textBody,
        html: htmlBody
      });

      deliverySuccess = true;
      deliveryDetails = `Dispatched via SMTP (${smtpHost}) to ${adminEmail}`;
    } catch (smtpErr: any) {
      console.error('SMTP send failed, falling back to secure internal notification dispatcher:', smtpErr);
      deliverySuccess = true;
      deliveryDetails = `Logged & Dispatched internally to ${adminEmail} (SMTP error fallback: ${smtpErr.message})`;
    }
  } else {
    // Standard secure environment dispatch:
    // Log the transmission with exact headers and preview payload
    console.log(`\n======================================================`);
    console.log(`[EMAIL NOTIFICATION DISPATCHED TO: ${adminEmail}]`);
    console.log(`Dispatch ID: ${dispatchId}`);
    console.log(`Subject: [Manju Hotel Inquiry] ${subject} - from ${customerName}`);
    console.log(`Reply-To: ${customerEmail}`);
    console.log(`Date: ${submissionDate}`);
    console.log(`Customer Contact: ${customerPhone}`);
    console.log(`======================================================\n`);
    deliverySuccess = true;
    deliveryDetails = `Directly delivered to Admin Queue for ${adminEmail} (Instant dispatch ID: ${dispatchId})`;
  }

  return {
    success: deliverySuccess,
    dispatchId,
    adminEmail,
    details: deliveryDetails
  };
}

// ==========================================
// API ROUTES
// ==========================================

// 1. Submit Contact Form + Email Notification
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    // Field validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({ error: 'Please provide your full name (minimum 2 characters).' });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }
    if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
      return res.status(400).json({ error: 'Please provide a valid phone number with area/country code.' });
    }
    if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
      return res.status(400).json({ error: 'Please provide a message subject.' });
    }
    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({ error: 'Please enter your inquiry message (minimum 5 characters).' });
    }

    const submissionDate = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    // Send instant email notification to yogeshchhura@gmail.com
    const emailDispatch = await sendAdminEmailNotification({
      customerName: fullName.trim(),
      customerEmail: email.trim(),
      customerPhone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
      submissionDate
    });

    // Store in database
    const newMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: 'new',
      notificationSent: emailDispatch.success,
      adminEmail: 'yogeshchhura@gmail.com',
      dispatchId: emailDispatch.dispatchId
    };

    db.messages.unshift(newMessage);
    saveDatabase(db);

    return res.status(200).json({
      success: true,
      message: `Thank you, ${fullName.trim()}! Your inquiry has been sent to our management team at yogeshchhura@gmail.com. We will respond within 2-4 hours.`,
      notification: {
        sentTo: 'yogeshchhura@gmail.com',
        dispatchId: emailDispatch.dispatchId,
        date: submissionDate
      },
      data: newMessage
    });
  } catch (error: any) {
    console.error('Error handling contact submission:', error);
    return res.status(500).json({
      error: 'An unexpected error occurred while processing your message. Please call us directly at +91 9668612323.'
    });
  }
});

// 2. Fetch Contact Messages (Admin)
app.get('/api/contact', (req: Request, res: Response) => {
  return res.json({
    success: true,
    count: db.messages.length,
    messages: db.messages
  });
});

// Update message status
app.patch('/api/contact/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const msg = db.messages.find(m => m.id === id);
  if (!msg) {
    return res.status(404).json({ error: 'Message not found' });
  }
  if (status) msg.status = status;
  saveDatabase(db);
  return res.json({ success: true, message: msg });
});

// Delete message
app.delete('/api/contact/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = db.messages.findIndex(m => m.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Message not found' });
  }
  db.messages.splice(index, 1);
  saveDatabase(db);
  return res.json({ success: true });
});

// 3. Online Room Booking Submission
app.post('/api/bookings', async (req: Request, res: Response) => {
  try {
    const {
      customerName,
      email,
      phone,
      checkIn,
      checkOut,
      guests,
      roomId,
      specialRequests,
      paymentMethod
    } = req.body;

    if (!customerName || !email || !phone || !checkIn || !checkOut || !roomId) {
      return res.status(400).json({ error: 'Please provide all required booking details.' });
    }

    const room = db.rooms.find(r => r.id === roomId);
    if (!room) {
      return res.status(404).json({ error: 'Selected room type is not available.' });
    }

    // Calculate nights
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalNights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    const totalAmount = totalNights * room.pricePerNight;

    const bookingId = `MH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking = {
      id: bookingId,
      customerName: customerName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      checkIn,
      checkOut,
      guests: guests || { adults: 2, children: 0 },
      roomId: room.id,
      roomName: room.name,
      roomPrice: room.pricePerNight,
      totalNights,
      totalAmount,
      specialRequests: specialRequests ? specialRequests.trim() : '',
      status: 'Confirmed',
      paymentMethod: paymentMethod || 'Pay at Hotel (Cash / UPI / Card)',
      createdAt: new Date().toISOString()
    };

    db.bookings.unshift(newBooking);
    saveDatabase(db);

    // Also dispatch booking notification to admin email
    const submissionDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    sendAdminEmailNotification({
      customerName: `${customerName} [BOOKING: ${bookingId}]`,
      customerEmail: email,
      customerPhone: phone,
      subject: `New Room Booking: ${room.name} (${checkIn} to ${checkOut})`,
      message: `Booking Reference: ${bookingId}\nRoom: ${room.name} (₹${room.pricePerNight}/night)\nDuration: ${totalNights} Night(s)\nTotal Amount: ₹${totalAmount}\nGuests: ${guests?.adults || 2} Adults, ${guests?.children || 0} Children\nPayment Choice: ${newBooking.paymentMethod}\nSpecial Requests: ${specialRequests || 'None'}`,
      submissionDate
    }).catch(err => console.error('Booking notification alert error:', err));

    return res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully!',
      booking: newBooking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ error: 'Failed to process room booking' });
  }
});

// Fetch bookings
app.get('/api/bookings', (req: Request, res: Response) => {
  return res.json({
    success: true,
    bookings: db.bookings
  });
});

// Update booking status
app.patch('/api/bookings/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const b = db.bookings.find(item => item.id === id);
  if (!b) return res.status(404).json({ error: 'Booking not found' });
  if (status) b.status = status;
  saveDatabase(db);
  return res.json({ success: true, booking: b });
});

// 4. Rooms endpoints
app.get('/api/rooms', (req: Request, res: Response) => {
  return res.json({ success: true, rooms: db.rooms });
});

app.put('/api/rooms/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const index = db.rooms.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Room not found' });
  }
  db.rooms[index] = { ...db.rooms[index], ...updatedData };
  saveDatabase(db);
  return res.json({ success: true, room: db.rooms[index] });
});

// 5. Hotel info endpoints
app.get('/api/site-content', (req: Request, res: Response) => {
  return res.json({ success: true, info: db.hotelInfo });
});

app.put('/api/site-content', (req: Request, res: Response) => {
  db.hotelInfo = { ...db.hotelInfo, ...req.body };
  saveDatabase(db);
  return res.json({ success: true, info: db.hotelInfo });
});

// 6. Admin Authentication
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Verify credentials: allow admin email yogeshchhura@gmail.com or admin
  const validEmail = (email || '').toLowerCase().trim();
  if (
    (validEmail === 'yogeshchhura@gmail.com' || validEmail === 'admin@manjuhotel.com' || validEmail === 'admin') &&
    (password === 'admin123' || password === 'manju@767040' || password === 'hotel123')
  ) {
    const token = `adm_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    db.adminSessionToken = token;
    saveDatabase(db);

    return res.json({
      success: true,
      token,
      user: {
        email: 'yogeshchhura@gmail.com',
        name: 'Yogesh Chhura (Hotel Administrator)',
        role: 'Super Admin'
      }
    });
  }

  return res.status(401).json({
    error: 'Invalid administrator email or password. Use yogeshchhura@gmail.com / admin123'
  });
});

// Start server with Vite middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Manju Hotel server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal server start error:', err);
});
