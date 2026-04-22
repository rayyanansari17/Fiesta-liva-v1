import e1 from "@/assets/event-1.webp";
import e2 from "@/assets/event-2.webp";
import e3 from "@/assets/event-3.webp";
import e4 from "@/assets/event-4.webp";
import e5 from "@/assets/event-5.webp";

import imgMedtech from "@/assets/ai in healthcare and med .jpeg";
import imgCme from "@/assets/cme lectures.jpeg";
import imgHero from "@/assets/heroes talk .jpeg";
import imgEntrepreneurship from "@/assets/entrepreneurship summit.jpeg";
import imgCelebrity from "@/assets/celebrity guest.jpeg";
import imgNetworking from "@/assets/image.png";
import imgSummit from "@/assets/summit.jpg";

import s1 from "@/assets/speaker-1.jpg";
import s2 from "@/assets/speaker-2.jpg";
import s3 from "@/assets/speaker-3.jpg";
import s4 from "@/assets/speaker-4.jpg";
import s5 from "@/assets/speaker-5.jpg";


export const ENV = {
  TICKET_URL: import.meta.env.VITE_TICKET_URL || "https://lu.ma/aq1a429h",
  SITE_NAME: import.meta.env.VITE_SITE_NAME || "FiestaLiva",
};

export const IMAGES = {
  events: [e1, e2, e3, e4, e5],
  speakers: [s1, s2, s3, s4, s5],
  hero: "/hero-festival.jpg",
};

export const SITE_CONTENT = {
  eventDates: "7th May – 8th May",
  eventLocation: "Shilpakala Vedika, Hyderabad",
  year: "2026",
  heroSubtitle: "Medical Youth Cultural & Awards Festival for Medical Students.",
  aboutTitle: "The No.1 Youth Festival for",
  aboutHighlight: "Medical Students", // Though the subtitle earlier said Medical Students... inconsistent!
  aboutDescription: "A seamless blend of high-energy performing arts, music, dance, future-ready technology, and prestigious academic recognition from all medical colleges across Telangana. Everything you need to succeed.",
  ticketButtonText: "Get Your Pass →",
};

export const SPONSORS = [
  "Fiesta Liva", "Heroes Of Humanity", "Medtech Preneur", "Network", "Academy", "Excellence"
];

export const NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#speakers", label: "Speakers" },
  { href: "/#expect", label: "What to Expect" },
  { href: "/#faq", label: "FAQ" },
];

export const SPEAKERS = [
  {
    img: s1,
    name: "Vlad Magdalin",
    tag: "Keynote",
    tagColor: "bg-primary text-primary-foreground",
    bio: "Our founding Webflow father. Our dad joke aficionado. He puts the mad into Magdalin and will be kicking off Fiesta Liva '26 as our keynote speaker!",
    featured: true,
  },
  {
    img: s2,
    name: "Ilja van Eck",
    tag: "Development",
    tagColor: "bg-accent text-accent-foreground",
    bio: "Oh 'Eck, we've only gone and secured the web wizard himself. Co-founder of Osmo & Webflow superstar we can't wait to learn from Ilja!",
  },
  {
    img: s3,
    name: "Cassie Evans",
    tag: "Animation",
    tagColor: "bg-highlight text-ink",
    bio: "Our GSAP fairy codemother is here to sprinkle some tween magic, animation goodness & Webflow's deepest darkest secrets.",
  },
  {
    img: s4,
    name: "Stephanie Bruce",
    tag: "Design",
    tagColor: "bg-ink text-ink-foreground",
    bio: "Devs want to work with her, designers want to be her. Steph will be sharing her expert freelancer growth tips.",
  },
  {
    img: s5,
    name: "Ross Plaskow",
    tag: "Animation",
    tagColor: "bg-primary text-primary-foreground",
    bio: "We've all wanted to animate something cool with Rive, and Ross is here to show us how with his ridiculously fun and slick style.",
  },
];

export const FAQS = [
  {
    q: "What is FiestaLiva?",
    a: "FiestaLiva is Telangana's first Medical Youth Cultural Festival, a two-day celebration bringing together medical students from across the state for live music, inter-college competitions, clinical workshops, CME lectures, Hero Talks, celebrity guests, networking sessions, and much more. It's where medicine meets the stage.",
  },
  {
    q: "When is it happening?",
    a: "FiestaLiva 2026 is happening on 7th & 8th May 2026. Two days of non-stop energy, learning, and celebration.",
  },
  {
    q: "Where is it happening?",
    a: "The fest is being held at Shilpakala Vedika, Hyderabad, one of Telangana's most iconic event venues.",
  },
  {
    q: "Is there food included?",
    a: "Yes! Food and refreshments will be available at the venue throughout both days. More details on the food experience will be announced soon.",
  },
  {
    q: "What should I bring?",
    a: "Bring your college ID, your registered HOH pass, and most importantly, your energy! Comfortable clothing is recommended. If you've registered for clinical workshops, any specific requirements will be shared via email before the event.",
  },
  {
    q: "What's in it for me?",
    a: "Everything. Live performances, inter-college contests, CME certified lectures, mentorship meets, study abroad guidance, entrepreneurship sessions, celebrity guests, and a night to remember. Whether you're here for the learning or the vibe, FiestaLiva delivers both.",
  },
];

export const EXPECT_ITEMS = [
  { label: "Inter-College Competitions", img: e5, color: "bg-accent", imagePosition: "top" },
  { label: "Live Music Concert", img: e3, color: "bg-highlight", imagePosition: "top" },
  { label: "Clinical Workshops", img: e4, color: "bg-ink", imagePosition: "top" },
  { label: "MedTech Showcase", img: imgMedtech, color: "bg-primary-glow", imagePosition: "top" },
  { label: "CME Lectures", img: imgCme, color: "bg-primary", imagePosition: "top" },
  { label: "Celebrity Guests", img: imgCelebrity, color: "bg-accent", imagePosition: "top" },
  { label: "Networking Sessions", img: imgNetworking, color: "bg-highlight", imagePosition: "top" },
  { label: "Entrepreneurship Summit", img: imgEntrepreneurship, color: "bg-ink", imagePosition: "top" },
  { label: "Community & Mentorship", img: imgSummit, color: "bg-primary-glow", imagePosition: "top" },
  { label: "Hero Talks", img: imgHero, color: "bg-primary", imagePosition: "top" },
];

export const ABOUT_PHOTOS = [
  { src: e1, rotate: "-rotate-3", mt: "mt-12" },
  { src: e2, rotate: "rotate-2", mt: "" },
  { src: e3, rotate: "-rotate-2", mt: "mt-16" },
  { src: e4, rotate: "rotate-3", mt: "mt-4" },
  { src: e5, rotate: "-rotate-1", mt: "mt-20" },
];

export const TWEETS = [
  {
    initial: "A",
    name: "Aisha Fatima",
    handle: "@aishamd26",
    body: "FiestaLiva was everything I didn't know I needed in med school. The energy, the music, the talks, nothing comes close.",
    color: "#F04141", // primary
    timestamp: "10:42 AM · MAY 8, 2026"
  },
  {
    initial: "K",
    name: "Karthik Reddy",
    handle: "@karthikmbbs",
    body: "Came for the CME lecture, stayed for the concert. FiestaLiva just gets what medical students actually need.",
    color: "#6366F1", // indigo
    timestamp: "11:15 AM · MAY 8, 2026"
  },
  {
    initial: "P",
    name: "Priya Sharma",
    handle: "@drpriya_ts",
    body: "The Hero Talks alone were worth the ticket. Absolute goosebumps moment. Can't wait for next year.",
    color: "#EC4899", // pink
    timestamp: "12:03 PM · MAY 8, 2026"
  },
  {
    initial: "M",
    name: "Mohammed Zaid",
    handle: "@zaid_medico",
    body: "Never thought a med fest could feel this electric. FiestaLiva 2026 was historic. See you all next year!",
    color: "#22C55E", // green
    timestamp: "1:30 PM · MAY 8, 2026"
  },
  {
    initial: "S",
    name: "Sneha Kulkarni",
    handle: "@sneha_kims",
    body: "From Entrepreneurship Summit to the dance championship,FiestaLiva packed everything into two insane days.",
    color: "#E8A020", // accent
    timestamp: "2:45 PM · MAY 8, 2026"
  },
];
