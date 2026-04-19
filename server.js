import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

const registrationSchema = new mongoose.Schema({
  registrationId: String,
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

app.post('/api/register', async (req, res) => {
  try {
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

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
