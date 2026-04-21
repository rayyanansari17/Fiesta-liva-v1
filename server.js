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
