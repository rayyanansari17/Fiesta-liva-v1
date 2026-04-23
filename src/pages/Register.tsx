import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '@/components/flowfest/Navbar';
import { MEDICAL_COLLEGES } from '@/config/colleges';

const INITIAL_FORM_DATA = {
  type: 'UG (MBBS)',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  college: '',
  rollNumber: '',
  idCardImage: '',
  year: '',
  clinicalWorkshops: [] as string[],
  contests: [] as string[],
  networking: [] as string[],
  future: [] as string[]
};

const UG_YEAR_OPTIONS = ['MBBS 1st Year', 'MBBS 2nd Year', 'MBBS 3rd Year', 'Final Year Part 1', 'Final Year Part 2'];
const PG_YEAR_OPTIONS = ['PG 1st Year', 'PG 2nd Year', 'PG Clinical'];

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [registrationId, setRegistrationId] = useState('');
  const [fileName, setFileName] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState(false);

  const nextStep = () => setStep(s => Math.min(5, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const resetForm = () => {
    setStep(1);
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setRegistrationId('');
    setImagePreview(null);
    setFileName('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleIdCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image too large (max 2MB)");
      return;
    }

    const reader = new FileReader();
    setFileName(file.name);
    reader.onloadend = () => {
      // reader.result contains the full base64 string
      setFormData(prev => ({
        ...prev,
        idCardImage: reader.result as string
      }));
      setImagePreview(reader.result as string);
      console.log('Base64 set, length:', (reader.result as string).length);
    };
    reader.readAsDataURL(file);
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
    if (!formData.college) newErrors.college = "Please select a valid college";
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

  const handleNextStep3 = () => {
    nextStep(); // Goes to Order Summary (Step 4)
  };

  const handlePayment = async () => {
    try {
      const baseUrl = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

      toast.loading("Initiating payment...");

      // 1. Create order on backend
      const orderRes = await fetch(`${baseUrl}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 99900 }) // ₹999 in paise
      });

      const orderData = await orderRes.json();
      toast.dismiss();

      if (!orderRes.ok) {
        throw new Error(orderData.message || "Failed to create payment order");
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "FiestaLiva 2026",
        description: "Festival Pass - Summerfest '26",
        order_id: orderData.order_id,
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#8C0365"
        },
        handler: async function (response: any) {
          try {
            setIsVerifying(true);
            toast.loading("Verifying payment & registering...");

            const verifyRes = await fetch(`${baseUrl}/api/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                formData: formData
              })
            });

            const verifyData = await verifyRes.json();
            setIsVerifying(false);
            toast.dismiss();

            if (verifyRes.ok) {
              setRegistrationId(verifyData.registrationId);
              toast.success("Registration Successful!");
              setStep(5);
            } else {
              toast.error(verifyData.message || "Verification failed. Please contact support.");
            }
          } catch (err) {
            setIsVerifying(false);
            toast.dismiss();
            toast.error("Network error during verification. Support: connect@heroesofhumanity.net");
            console.error("Verification error:", err);
          }
        },
        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled. You can try again.");
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        toast.error("Payment failed: " + response.error.description);
      });
      rzp.open();

    } catch (e: any) {
      toast.dismiss();
      toast.error(e.message || "Something went wrong. Please try again.");
      console.error("Payment initiation error:", e);
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
      <Navbar forceSolid onReset={resetForm} />
      {/* Progress Bar */}
      <div className="w-full max-w-3xl mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-[10%] right-[10%] top-5 -translate-y-1/2 h-[2px] bg-secondary -z-10"></div>
          <div className="absolute left-[10%] right-[10%] top-5 -translate-y-1/2 h-[2px] bg-primary -z-10 transition-all duration-500 origin-left" style={{ transform: `scaleX(${Math.max(0, (step - 1) / 4)})` }}></div>

          {["Info", "Add-ons", "Interests", "Payment", "Confirm"].map((label, i) => {
            const stepNum = i + 1;
            const isCompleted = (step >= 5 && stepNum < 5) || step > stepNum;
            const isCurrent = step === stepNum;
            return (
              <div key={label} className="flex flex-col items-center gap-1 md:gap-2 bg-background px-1 sm:px-2 md:px-4">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs md:text-sm transition-colors duration-300 ${isCompleted ? "bg-primary text-white ring-2 ring-primary ring-offset-2 ring-offset-background" : isCurrent ? "bg-accent text-white shadow-brutal" : "border-2 border-secondary text-muted-foreground bg-background"
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
                onClick={() => setFormData({ ...formData, type: 'UG (MBBS)', year: '' })}
                className={`flex-1 py-3 px-6 rounded-full font-bold transition-all ${formData.type === 'UG (MBBS)' ? 'bg-primary text-white shadow-brutal' : 'border-2 border-primary text-primary hover:bg-primary/10'}`}
              >UG (MBBS)</button>
              <button
                onClick={() => setFormData({ ...formData, type: 'PG (MD/MS/DNB)', year: '' })}
                className={`flex-1 py-3 px-6 rounded-full font-bold transition-all ${formData.type === 'PG (MD/MS/DNB)' ? 'bg-primary text-white shadow-brutal' : 'border-2 border-primary text-primary hover:bg-primary/10'}`}
              >PG (MD/MS/DNB)</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Input placeholder="First Name" value={formData.firstName} onChange={e => handleInputChange('firstName', e.target.value)} className={`h-12 ${errors.firstName ? 'border-[#F04141] focus-visible:ring-[#F04141]' : formData.firstName ? 'border-primary' : ''}`} />
                {errors.firstName && <span className="text-[#F04141] text-xs mt-1 block">{errors.firstName}</span>}
              </div>
              <div>
                <Input placeholder="Last Name" value={formData.lastName} onChange={e => handleInputChange('lastName', e.target.value)} className={`h-12 ${errors.lastName ? 'border-[#F04141] focus-visible:ring-[#F04141]' : formData.lastName ? 'border-primary' : ''}`} />
                {errors.lastName && <span className="text-[#F04141] text-xs mt-1 block">{errors.lastName}</span>}
              </div>
            </div>
            <div className="space-y-4 mb-8">
              <div>
                <Input placeholder="Email" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className={`h-12 ${errors.email ? 'border-[#F04141] focus-visible:ring-[#F04141]' : formData.email ? 'border-primary' : ''}`} />
                {errors.email && <span className="text-[#F04141] text-xs mt-1 block">{errors.email}</span>}
              </div>
              <div>
                <Input placeholder="Phone Number" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className={`h-12 ${errors.phone ? 'border-[#F04141] focus-visible:ring-[#F04141]' : formData.phone ? 'border-primary' : ''}`} />
                {errors.phone && <span className="text-[#F04141] text-xs mt-1 block">{errors.phone}</span>}
              </div>

              <div>
                <select
                  className={`flex h-12 w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 ${errors.college ? 'border-[#F04141] focus-visible:ring-[#F04141] text-[#F04141]' : 'border-input focus-visible:ring-primary text-foreground font-medium'}`}
                  value={formData.college}
                  onChange={e => handleInputChange('college', e.target.value)}
                >
                  <option value="" disabled>Select College</option>
                  {MEDICAL_COLLEGES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.college && <span className="text-[#F04141] text-xs mt-1 block">{errors.college}</span>}
              </div>

              <div>
                <Input placeholder="University Roll Number" value={formData.rollNumber} onChange={e => handleInputChange('rollNumber', e.target.value)} className={`h-12 ${errors.rollNumber ? 'border-[#F04141] focus-visible:ring-[#F04141]' : formData.rollNumber ? 'border-primary' : ''}`} />
                {errors.rollNumber && <span className="text-[#F04141] text-xs mt-1 block">{errors.rollNumber}</span>}
              </div>

              <div>
                <div className="space-y-1 relative">
                  <label className="text-sm font-medium text-muted-foreground absolute right-0 -top-7">
                    <span className="text-[10px] uppercase tracking-widest bg-secondary px-2 py-1 rounded-full text-muted-foreground font-bold">Optional</span>
                  </label>
                  <div
                    onClick={() => document.getElementById('id-upload')?.click()}
                    className={`flex h-12 w-full items-center justify-center rounded-md border-2 border-dashed bg-background px-3 py-2 text-sm cursor-pointer transition-all hover:bg-secondary/20 ${imagePreview ? 'border-primary bg-primary/5' : 'border-input'}`}
                  >
                    <span className="flex items-center gap-2 font-medium text-muted-foreground">
                      {fileName ? (
                        <>
                          <Check size={16} className="text-primary" />
                          <span className="text-foreground truncate max-w-[250px]">{fileName}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-lg">📎</span>
                          Upload ID Card / College ID
                        </>
                      )}
                    </span>
                    <input
                      id="id-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleIdCardUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              {imagePreview && (
                <div className="mt-2 relative w-24 h-24 rounded-lg overflow-hidden border-2 border-primary/20 bg-muted group animate-in fade-in zoom-in duration-300">
                  <img src={imagePreview} alt="ID Preview" className="w-full h-full object-cover" />
                  <button
                    onClick={(e) => { e.stopPropagation(); setImagePreview(null); setFormData(p => ({ ...p, idCardImage: '' })); setFileName(''); }}
                    className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold"
                  >
                    Remove
                  </button>
                </div>
              )}

              <div>
                <select
                  className={`flex h-12 w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 ${errors.year ? 'border-[#F04141] focus-visible:ring-[#F04141]' : 'border-input focus-visible:ring-primary'}`}
                  value={formData.year}
                  onChange={e => handleInputChange('year', e.target.value)}
                >
                  <option value="" disabled>Select Year</option>
                  {(formData.type === 'UG (MBBS)' ? UG_YEAR_OPTIONS : PG_YEAR_OPTIONS).map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
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
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="font-display text-3xl md:text-4xl mb-1 tracking-tight text-center">Order Summary</h2>
            <p className="font-hand text-accent text-2xl text-center mb-8">one last look before the magic</p>

            <Card className="shadow-brutal border-2 border-ink mb-8 overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 bg-secondary/10 border-b-2 border-dashed border-ink/20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-xl">{formData.firstName} {formData.lastName}</h3>
                      <p className="text-muted-foreground text-sm">{formData.college}</p>
                      <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold mt-1">{formData.type}</p>
                    </div>
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
                      Early Bird
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Festival Pass</span>
                    <span className="font-bold">₹999</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t-2 border-ink border-black">
                    <span className="font-display text-2xl">Total</span>
                    <span className="font-display text-2xl text-primary">₹999</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" size="xl" onClick={() => setStep(1)} disabled={isVerifying}>← EDIT DETAILS</Button>
              <Button variant="hero" className="flex-1" size="xl" onClick={handlePayment} disabled={isVerifying}>
                {isVerifying ? "VERIFYING..." : "PROCEED TO PAY →"}
              </Button>
            </div>

            <p className="text-center text-[10px] uppercase tracking-widest text-muted-foreground mt-6 font-bold">
              🔒 Secure payment powered by Razorpay
            </p>
          </div>
        )}

        {step === 5 && (
          <div className="animate-in fade-in zoom-in duration-500 pt-8 pb-16">
            <Card className="text-center bg-[#8C0365] text-white border-none shadow-brutal-lg max-w-lg mx-auto">
              <CardContent className="pt-12 pb-10 flex flex-col items-center">
                <div className="text-6xl mb-6 animate-bounce">🎉</div>
                <h2 className="font-display text-5xl font-extrabold mb-2 text-white">REGISTERED!</h2>
                <span className="font-hand text-highlight text-3xl mb-8">your registration id</span>

                <div className="rounded-lg border-2 border-white bg-white/10 backdrop-blur-sm shadow-xl px-8 py-4 mb-8 text-white font-mono text-3xl font-bold tracking-widest mx-auto max-w-max border-dashed">
                  {registrationId || "HOH-XXXXXX"}
                </div>

                <p className="text-white/90 text-lg leading-relaxed">
                  Registration confirmed! Check your email for confirmation.<br /><span className="font-bold">Welcome to FiestaLiva 2026!</span>
                </p>

                <Button
                  variant="hero"
                  className="mt-8 bg-highlight text-ink hover:bg-highlight/90 border-ink shadow-brutal"
                  onClick={() => window.location.href = '/'}
                >
                  GO TO HOME
                </Button>
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
