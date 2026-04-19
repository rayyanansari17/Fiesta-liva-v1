import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import nodemailer from 'nodemailer';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';

const app = express();
app.set('trust proxy', 1); // Trust first proxy for Render IP rate-limiting
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: ['https://fiesta-liva-v1.vercel.app', 'http://localhost:8080'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
app.use(express.json());

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
  hallTicket: String,
  rollNumber: String,
  year: String,
  clinicalWorkshops: [String],
  contests: [String],
  networking: [String],
  future: [String],
  createdAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model('Registration', registrationSchema);

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

app.post('/api/register', registerLimiter, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, college, hallTicket, rollNumber, year } = req.body;
    const newErrors = {};
    const nameRegex = /^[a-zA-Z]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6789]\d{9}$/;
    const idRegex = /^[a-zA-Z0-9]{5,}$/;

    if (!firstName || !nameRegex.test(firstName)) newErrors.firstName = "Minimum 2 characters, letters only";
    if (!lastName || !nameRegex.test(lastName)) newErrors.lastName = "Minimum 2 characters, letters only";
    if (!email || !emailRegex.test(email)) newErrors.email = "Invalid email format";
    if (!phone || !phoneRegex.test(phone)) newErrors.phone = "Must be exactly 10 digits starting with 6-9";
    if (!college || college === 'College list coming soon') newErrors.college = "Please select a valid college";
    if (!hallTicket || !idRegex.test(hallTicket)) newErrors.hallTicket = "Minimum 5 alphanumeric characters";
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
