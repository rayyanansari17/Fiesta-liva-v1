import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import nodemailer from 'nodemailer';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const app = express();
app.set('trust proxy', 1); // Trust first proxy for Render IP rate-limiting
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:8080',
    'https://fiesta-liva-v1.vercel.app',
    'https://admin.heroesofhumanity.net',
    'https://fiestaliva2026.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('/{*path}', cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging for debugging production 404s
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});
// Fix for Express 5 compatibility with express-mongo-sanitize
app.use((req, res, next) => {
  Object.defineProperty(req, 'query', {
    value: { ...req.query },
    writable: true,
    configurable: true,
    enumerable: true,
  });
  next();
});
app.use(mongoSanitize());

app.get('/', (req, res) => {
  res.status(200).send('Flowfest Backend Server — Up and Running');
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

const registrationSchema = new mongoose.Schema({
  registrationId: { type: String, unique: true, index: true },
  type: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  college: String,
  rollNumber: String,
  idCardImage: String,
  year: String,
  clinicalWorkshops: [String],
  contests: [String],
  networking: [String],
  future: [String],
  amountPaid: { type: Number, default: 0 },
  paymentId: String,
  orderId: String,
  paymentStatus: { type: String, default: 'pending' },
  registrationType: { type: String, enum: ['UG', 'PG'], default: 'UG' },
  createdAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model('Registration', registrationSchema);

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['superadmin', 'admin', 'viewer'], default: 'admin' }
});

const Admin = mongoose.model('Admin', adminSchema);

// Counter Schema for ID generation
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});
const Counter = mongoose.model('Counter', counterSchema);

async function getNextSequenceValue(sequenceName) {
  // 1. Self-healing check: Seed counter from DB if document is missing
  let counter = await Counter.findById(sequenceName);

  if (!counter) {
    // Check highest existing registration code to resume sequence
    const lastReg = await Registration.findOne().sort({ registrationId: -1 });
    let seedValue = 0;
    
    if (lastReg && lastReg.registrationId) {
      const match = lastReg.registrationId.match(/\d+/);
      if (match) seedValue = parseInt(match[0]);
    }

    // Atomic upsert of the seed value if not already present
    await Counter.findOneAndUpdate(
      { _id: sequenceName },
      { $setOnInsert: { seq: seedValue } },
      { upsert: true }
    );
  }

  // 2. Atomic increment
  const sequenceDoc = await Counter.findByIdAndUpdate(
    sequenceName,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDoc.seq;
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { success: false, message: 'Too many registration attempts from this IP, please try again after an hour' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.get('/api/admin/sync-counter', async (req, res) => {
  try {
    // 1. Find the highest existing registration ID
    const lastReg = await Registration.findOne().sort({ registrationId: -1 });
    let seedValue = 0;
    
    if (lastReg && lastReg.registrationId) {
      const match = lastReg.registrationId.match(/\d+/);
      if (match) seedValue = parseInt(match[0]);
    }

    // 2. Update the counter document to match
    const updatedCounter = await Counter.findOneAndUpdate(
      { _id: 'registrationId' },
      { seq: seedValue },
      { upsert: true, new: true }
    );

    res.status(200).json({ 
      success: true, 
      message: 'Counter synchronized with database records', 
      newSequence: updatedCounter.seq 
    });
  } catch (error) {
    console.error('Sync Error:', error);
    res.status(500).json({ success: false, message: 'Failed to synchronize counter' });
  }
});

// Admin Middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Admin Routes
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ success: true, token, admin: { username: admin.username, role: admin.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/admin/stats', authenticateAdmin, async (req, res) => {
  try {
    const totalRegistrations = await Registration.countDocuments();
    const stats = await Registration.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amountPaid" },
          ugCount: { $sum: { $cond: [{ $eq: ["$registrationType", "UG"] }, 1, 0] } },
          pgCount: { $sum: { $cond: [{ $eq: ["$registrationType", "PG"] }, 1, 0] } }
        }
      }
    ]);

    const result = stats[0] || { totalAmount: 0, ugCount: 0, pgCount: 0 };
    res.json({
      totalRegistrations,
      totalAmount: result.totalAmount,
      ugCount: result.ugCount,
      pgCount: result.pgCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/admin/registrations', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '', type = 'All', sortBy = 'createdAt', order = 'desc' } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { registrationId: { $regex: search, $options: 'i' } },
        { college: { $regex: search, $options: 'i' } }
      ];
    }

    if (type !== 'All') {
      query.registrationType = type;
    }

    if (req.query.college && req.query.college !== 'All') {
      query.college = req.query.college;
    }

    const registrations = await Registration.find(query)
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Registration.countDocuments(query);

    res.json({
      registrations,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/admin/send-email', authenticateAdmin, async (req, res) => {
  if (req.admin.role === 'viewer') return res.status(403).json({ message: 'Insufficient permissions' });
  
  try {
    const { to, subject, body } = req.body;
    
    const mailOptions = {
      from: 'connect@heroesofhumanity.net',
      to,
      subject,
      html: body
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

// Razorpay Payment Routes
app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount < 100) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const options = {
      amount: amount, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error('Razorpay Order Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/payment/verify', async (req, res) => {
  try {
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature,
      formData 
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    // Check for existing registration before saving
    const existingRegistration = await Registration.findOne({
      $or: [{ email: formData.email }, { phone: formData.phone }]
    });
    
    if (existingRegistration && existingRegistration.paymentStatus === 'paid') {
      return res.status(409).json({ success: false, message: "You have already registered and paid." });
    }

    const seq = await getNextSequenceValue('registrationId');
    const registrationId = `HOH-${String(seq).padStart(6, '0')}`;

    const newReg = new Registration({
      ...formData,
      registrationId,
      amountPaid: 999,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      paymentStatus: "paid"
    });

    await newReg.save();

    // Send confirmation email
    try {
      const mailOptions = {
        from: '"FiestaLiva 2026" <connect@heroesofhumanity.net>',
        to: formData.email,
        subject: "You're Registered for FiestaLiva 2026! 🎉",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #8C0365; text-align: center;">Registration Confirmed!</h2>
            <p>Hello <strong>${formData.firstName}</strong>,</p>
            <p>You have successfully registered for <strong>FiestaLiva 2026 - Summerfest '26</strong>.</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Registration ID:</strong> <span style="font-family: monospace; font-size: 1.1em; color: #8C0365;">${registrationId}</span></p>
              <p style="margin: 5px 0;"><strong>College:</strong> ${formData.college}</p>
              <p style="margin: 5px 0;"><strong>Amount Paid:</strong> ₹999</p>
            </div>
            <p><strong>Event Details:</strong></p>
            <ul>
              <li><strong>Dates:</strong> 7th – 8th May, 2026</li>
              <li><strong>Venue:</strong> Shilpakala Vedika, Hyderabad</li>
            </ul>
            <p style="text-align: center; margin-top: 30px;">
              <a href="https://fiestaliva2026.com" style="background-color: #8C0365; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit Website</a>
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="font-size: 0.8em; color: #666; text-align: center;">
              Heroes of Humanity © 2026. If you have any questions, contact us at connect@heroesofhumanity.net
            </p>
          </div>
        `
      };
      await transporter.sendMail(mailOptions);
    } catch (e) {
      console.error("Email sending failed during payment verification:", e);
    }

    res.json({ success: true, registrationId });
  } catch (error) {
    console.error('Payment Verification Error:', error);
    res.status(500).json({ success: false, message: "Internal server error during verification" });
  }
});

app.post('/api/register', registerLimiter, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, college, rollNumber, year } = req.body;
    const newErrors = {};
    const nameRegex = /^[a-zA-Z]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6789]\d{9}$/;
    const idRegex = /^[a-zA-Z0-9]{5,}$/;

    if (!firstName || !nameRegex.test(firstName)) newErrors.firstName = "Minimum 2 characters, letters only";
    if (!lastName || !nameRegex.test(lastName)) newErrors.lastName = "Minimum 2 characters, letters only";
    if (!email || !emailRegex.test(email)) newErrors.email = "Invalid email format";
    if (!phone || !phoneRegex.test(phone)) newErrors.phone = "Must be exactly 10 digits starting with 6-9";
    if (!college) newErrors.college = "Please select a valid college";
    if (!rollNumber || !idRegex.test(rollNumber)) newErrors.rollNumber = "Minimum 5 alphanumeric characters";
    if (!year) newErrors.year = "Please select a year";

    if (Object.keys(newErrors).length > 0) {
      return res.status(400).json({ success: false, errors: newErrors, message: 'Validation failed' });
    }

    const existingRegistration = await Registration.findOne({
      $or: [{ email }, { phone }]
    });
    
    if (existingRegistration) {
      return res.status(409).json({ success: false, message: "You have already registered with this email or phone number" });
    }

    const seq = await getNextSequenceValue('registrationId');
    const registrationId = `HOH-${String(seq).padStart(6, '0')}`;
    
    const newReg = new Registration({
      ...req.body,
      registrationId
    });
    await newReg.save();
    
    try {
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: newReg.email,
        subject: "You're Registered for FiestaLiva 2026! 🎉",
        text: `Hello ${newReg.firstName},\n\nYou're registered for FiestaLiva 2026!\nRegistration ID: ${registrationId}\n\nSelected Add-ons:\n${newReg.clinicalWorkshops.join(', ')}\n${newReg.contests.join(', ')}\n\nVenue: 7th–8th May, Shilpakala Vedika, Hyderabad\n\nThanks,\nHeroes of Humanity`
      };
      transporter.sendMail(mailOptions).catch(console.error);
    } catch (e) {
        console.error("Email error: ", e);
    }

    res.status(200).json({ success: true, registrationId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
