import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '@/components/flowfest/Navbar';

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: 'UG (MBBS)',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    college: 'College list coming soon',
    hallTicket: '',
    rollNumber: '',
    year: 'MBBS 1st Year',
    clinicalWorkshops: [] as string[],
    contests: [] as string[],
    networking: [] as string[],
    future: [] as string[]
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [registrationId, setRegistrationId] = useState('');

  const nextStep = () => setStep(s => Math.min(4, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: ''}));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    const nameRegex = /^[a-zA-Z]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6789]\d{9}$/;
    const idRegex = /^[a-zA-Z0-9]{5,}$/;

    if (!nameRegex.test(formData.firstName)) newErrors.firstName = "Minimum 2 characters, letters only";
    if (!nameRegex.test(formData.lastName)) newErrors.lastName = "Minimum 2 characters, letters only";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Must be exactly 10 digits starting with 6-9";
    if (formData.college === 'College list coming soon') newErrors.college = "Please select a valid college";
    if (!idRegex.test(formData.hallTicket)) newErrors.hallTicket = "Minimum 5 alphanumeric characters";
    if (!idRegex.test(formData.rollNumber)) newErrors.rollNumber = "Minimum 5 alphanumeric characters";
    if (!formData.year) newErrors.year = "Please select a year";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep1 = () => {
    if (!validateStep1()) {
      toast.error("Please fix the validation errors");
      return;
    }
    nextStep();
  };

  const handleNextStep3 = async () => {
    try {
      toast.loading("Registering...");
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      setRegistrationId(data.registrationId);
      toast.dismiss();
      toast.success("Registration Successful!");
      nextStep();
    } catch (e: any) {
      toast.dismiss();
      toast.error(e.message);
    }
  };

  const clinicalOptions = ["Basic Life Support (BLS)", "Advanced Life Support (ALS)", "Trauma Care in Emergency", "Obstetrics Emergency", "Pediatric Emergency"];
  const contestOptions = ["\"Rhythm of Youth\" Group Dance Championship", "\"Voice of Medicos\" Group Songs Championship", "\"Unity in Diversity\" Cultural Music & Dance Performance", "\"An Ode to Peace\" Musical Theatrical Performance"];
  
  const networkingOptions = ["USMLE Preparation", "PLAB (UK)", "MRCP / MRCS / MRCOG", "AMC (Australia)", "NZREX (New Zealand)", "MCC (Canada)", "SMLE (Saudi Arabia)", "PRES", "FMGs", "Speed Advice Event Q&A Sessions", "Heroes of Humanity Network Meet", "Entrepreneurship & MedTech Startups", "Clinical Research"];
  const futureOptions = ["AI & MedTech Entrepreneurship", "Doing PG in India", "Doing PG Abroad", "Working Abroad", "Working in India", "Looking for Mentors", "Financial Planning for Doctors", "Alternate Career Pathways", "Clinical Research & Publishing"];

  const toggleArray = (field: keyof typeof formData, value: string) => {
    setFormData(prev => {
      const arr = prev[field] as string[];
      if (arr.includes(value)) {
        return { ...prev, [field]: arr.filter(i => i !== value) };
      } else {
        return { ...prev, [field]: [...arr, value] };
      }
    });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col items-center pt-24 pb-10 px-4">
      <Navbar forceSolid />
      {/* Progress Bar */}
      <div className="w-full max-w-3xl mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-[10%] right-[10%] top-5 -translate-y-1/2 h-[2px] bg-secondary -z-10"></div>
          <div className="absolute left-[10%] right-[10%] top-5 -translate-y-1/2 h-[2px] bg-primary -z-10 transition-all duration-500 origin-left" style={{ transform: `scaleX(${Math.max(0, (step - 1) / 3)})` }}></div>
          
          {["Info", "Add-ons", "Interests", "Confirm"].map((label, i) => {
            const stepNum = i + 1;
            const isCompleted = step > stepNum;
            const isCurrent = step === stepNum;
            return (
              <div key={label} className="flex flex-col items-center gap-1 md:gap-2 bg-background px-1 sm:px-2 md:px-4">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs md:text-sm transition-colors duration-300 ${
                  isCompleted ? "bg-primary text-white ring-2 ring-primary ring-offset-2 ring-offset-background" : isCurrent ? "bg-accent text-white shadow-brutal" : "border-2 border-secondary text-muted-foreground bg-background"
                }`}>
                  {isCompleted ? <Check size={16} className="w-4 h-4 md:w-5 md:h-5" /> : stepNum}
                </div>
                <span className="font-hand text-base md:text-lg leading-none mt-1">{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full max-w-3xl flex-1">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-display text-3xl md:text-4xl mb-1 tracking-tight">Personal & Academic Information</h2>
            <span className="font-hand text-accent text-2xl inline-block mb-8">tell us about yourself</span>
            
            <div className="flex gap-4 mb-6">
              <button 
                onClick={() => setFormData({...formData, type: 'UG (MBBS)'})}
                className={`flex-1 py-3 px-6 rounded-full font-bold transition-all ${formData.type === 'UG (MBBS)' ? 'bg-primary text-white shadow-brutal' : 'border-2 border-primary text-primary hover:bg-primary/10'}`}
              >UG (MBBS)</button>
              <button 
                onClick={() => setFormData({...formData, type: 'PG (MBBS)'})}
                className={`flex-1 py-3 px-6 rounded-full font-bold transition-all ${formData.type === 'PG (MBBS)' ? 'bg-primary text-white shadow-brutal' : 'border-2 border-primary text-primary hover:bg-primary/10'}`}
              >PG (MBBS)</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Input placeholder="First Name" value={formData.firstName} onChange={e => handleInputChange('firstName', e.target.value)} className={errors.firstName ? 'border-[#F04141] focus-visible:ring-[#F04141]' : formData.firstName ? 'border-primary' : ''} />
                {errors.firstName && <span className="text-[#F04141] text-xs mt-1 block">{errors.firstName}</span>}
              </div>
              <div>
                <Input placeholder="Last Name" value={formData.lastName} onChange={e => handleInputChange('lastName', e.target.value)} className={errors.lastName ? 'border-[#F04141] focus-visible:ring-[#F04141]' : formData.lastName ? 'border-primary' : ''} />
                {errors.lastName && <span className="text-[#F04141] text-xs mt-1 block">{errors.lastName}</span>}
              </div>
            </div>
            <div className="space-y-4 mb-8">
              <div>
                <Input placeholder="Email" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className={errors.email ? 'border-[#F04141] focus-visible:ring-[#F04141]' : formData.email ? 'border-primary' : ''} />
                {errors.email && <span className="text-[#F04141] text-xs mt-1 block">{errors.email}</span>}
              </div>
              <div>
                <Input placeholder="Phone Number" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className={errors.phone ? 'border-[#F04141] focus-visible:ring-[#F04141]' : formData.phone ? 'border-primary' : ''} />
                {errors.phone && <span className="text-[#F04141] text-xs mt-1 block">{errors.phone}</span>}
              </div>
              
              <div>
                <select 
                  className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 ${errors.college ? 'border-[#F04141] focus-visible:ring-[#F04141] text-[#F04141]' : 'border-input focus-visible:ring-primary text-muted-foreground'}`}
                  value={formData.college} 
                  onChange={e => handleInputChange('college', e.target.value)}
                >
                  <option value="College list coming soon" disabled>College list coming soon</option>
                  <option value="Fake Medical College">Fake Medical College</option> 
                </select>
                {errors.college && <span className="text-[#F04141] text-xs mt-1 block">{errors.college}</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input placeholder="Hall Ticket Number" value={formData.hallTicket} onChange={e => handleInputChange('hallTicket', e.target.value)} className={errors.hallTicket ? 'border-[#F04141] focus-visible:ring-[#F04141]' : formData.hallTicket ? 'border-primary' : ''} />
                  {errors.hallTicket && <span className="text-[#F04141] text-xs mt-1 block">{errors.hallTicket}</span>}
                </div>
                <div>
                  <Input placeholder="University Roll Number" value={formData.rollNumber} onChange={e => handleInputChange('rollNumber', e.target.value)} className={errors.rollNumber ? 'border-[#F04141] focus-visible:ring-[#F04141]' : formData.rollNumber ? 'border-primary' : ''} />
                  {errors.rollNumber && <span className="text-[#F04141] text-xs mt-1 block">{errors.rollNumber}</span>}
                </div>
              </div>
              <div>
                <select 
                  className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 ${errors.year ? 'border-[#F04141] focus-visible:ring-[#F04141]' : 'border-input focus-visible:ring-primary'}`}
                  value={formData.year}
                  onChange={e => handleInputChange('year', e.target.value)}
                >
                  <option disabled value="">Select Year</option>
                  <option>MBBS 1st Year</option>
                  <option>MBBS 2nd Year</option>
                  <option>MBBS 3rd Year</option>
                  <option>Final Year Part 1</option>
                  <option>Final Year Part 2</option>
                </select>
                {errors.year && <span className="text-[#F04141] text-xs mt-1 block">{errors.year}</span>}
              </div>
            </div>

            <Button variant="hero" className="w-full" size="xl" onClick={handleNextStep1}>NEXT →</Button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-display text-3xl md:text-4xl mb-1 tracking-tight">Add-on Events</h2>
            <span className="font-hand text-accent text-2xl inline-block mb-8">optional but unmissable</span>

            <div className="mb-8">
              <h3 className="font-semibold text-primary text-xl mb-4">Clinical Workshops</h3>
              <div className="space-y-3">
                {clinicalOptions.map(opt => (
                  <div key={opt} onClick={() => toggleArray("clinicalWorkshops", opt)} className={`rounded-lg border bg-card shadow-sm p-4 cursor-pointer transition-colors ${formData.clinicalWorkshops.includes(opt) ? 'border-primary bg-primary/10' : 'border-input hover:border-primary/50'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.clinicalWorkshops.includes(opt) ? 'bg-primary border-primary text-white' : 'border-input'}`}>
                        {formData.clinicalWorkshops.includes(opt) && <Check size={14} />}
                      </div>
                      <span className="font-medium">{opt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold text-primary text-xl mb-4">Inter-College Contests</h3>
              <div className="space-y-3">
                {contestOptions.map(opt => (
                  <div key={opt} onClick={() => toggleArray("contests", opt)} className={`rounded-lg border bg-card shadow-sm p-4 cursor-pointer transition-colors ${formData.contests.includes(opt) ? 'border-primary bg-primary/10' : 'border-input hover:border-primary/50'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.contests.includes(opt) ? 'bg-primary border-primary text-white' : 'border-input'}`}>
                        {formData.contests.includes(opt) && <Check size={14} />}
                      </div>
                      <span className="font-medium">{opt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" size="xl" onClick={prevStep}>← PREVIOUS</Button>
              <Button variant="hero" className="flex-1" size="xl" onClick={nextStep}>NEXT →</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-display text-3xl md:text-4xl mb-1 tracking-tight">Networking & Future Interests</h2>
            <span className="font-hand text-accent text-2xl inline-block mb-8">find your people</span>

            <div className="mb-8">
              <h3 className="font-semibold text-primary text-xl mb-4">Networking Interests</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {networkingOptions.map(opt => (
                  <div key={opt} onClick={() => toggleArray("networking", opt)} className={`rounded-lg border bg-card shadow-sm p-4 cursor-pointer transition-colors ${formData.networking.includes(opt) ? 'border-primary bg-primary/10' : 'border-input hover:border-primary/50'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${formData.networking.includes(opt) ? 'bg-primary border-primary text-white' : 'border-input'}`}>
                        {formData.networking.includes(opt) && <Check size={14} />}
                      </div>
                      <span className="font-medium text-sm">{opt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold text-primary text-xl mb-4">Your Future Interests</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {futureOptions.map(opt => (
                  <div key={opt} onClick={() => toggleArray("future", opt)} className={`rounded-lg border bg-card shadow-sm p-4 cursor-pointer transition-colors ${formData.future.includes(opt) ? 'border-primary bg-primary/10' : 'border-input hover:border-primary/50'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${formData.future.includes(opt) ? 'bg-primary border-primary text-white' : 'border-input'}`}>
                        {formData.future.includes(opt) && <Check size={14} />}
                      </div>
                      <span className="font-medium text-sm">{opt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" size="xl" onClick={prevStep}>← PREVIOUS</Button>
              <Button variant="hero" className="flex-1" size="xl" onClick={handleNextStep3}>REGISTER</Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in fade-in zoom-in duration-500 pt-8 pb-16">
            <Card className="text-center bg-sunset text-white border-none shadow-brutal-lg max-w-lg mx-auto">
              <CardContent className="pt-12 pb-10 flex flex-col items-center">
                <div className="text-6xl mb-6">🎉</div>
                <h2 className="font-display text-5xl font-extrabold mb-2 text-white">REGISTERED!</h2>
                <span className="font-hand text-highlight text-3xl mb-8">your registration id</span>
                
                <div className="rounded-lg border-2 border-primary bg-white shadow-brutal px-8 py-4 mb-8 text-primary font-mono text-2xl font-bold tracking-widest mx-auto max-w-max">
                  {registrationId || "HOH-XXXXXX"}
                </div>
                
                <p className="text-white/90 text-lg">
                  Registration confirmed! Check your email for confirmation.<br/>Welcome to FiestaLiva 2026!
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <footer className="mt-8 pt-8 pb-4 text-center text-sm text-muted-foreground w-full border-t border-secondary border-dashed">
        Need help? Email: connect@heroesofhumanity.net | Call: +91 7288 000 747
      </footer>
    </div>
  );
}
