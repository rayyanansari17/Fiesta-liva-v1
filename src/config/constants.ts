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
  heroSubtitle: "Medical Youth Cultural Festival & Awards Festival for Medical Students.",
  aboutTitle: "The No.1 Youth Festival for",
  aboutHighlight: "Medical Students", // Though the subtitle earlier said Medical Students... inconsistent!
  aboutDescription: "A seamless blend of high-energy performing arts, music, future-ready technology, and prestigious academic recognition from all medical colleges across Telangana. Everything you need to succeed.",
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
    q: "Can I have a discount?",
    a: "This is a non-profit event, and our goal is to make Fiesta Liva as affordable as we possibly can whilst delivering a quality day you'll never forget. To keep ticket prices as low as possible for everyone, we're unable to offer discounts and appreciate your support for this community event.",
  },
  {
    q: "How do I get there?",
    a: "Fiesta Liva is hosted at Shilpakala Vedika, Hyderabad easily reachable by car or local transport, with parking available on site.",
  },
  {
    q: "Is there food included?",
    a: "Yes a banging lunch courtesy of Kargo on the Docks is included in your ticket, plus drinks tokens to keep you topped up.",
  },
  {
    q: "What should I bring?",
    a: "Good vibes and layers. This is an all-day outdoor event in Manchester, so check the weather closer to the time and dress accordingly. There are no hands-on workshops this year, so no need to bring a laptop.",
  },
  {
    q: "Will there be an afterparty?",
    a: "No official afterparty, but Fiesta Liva folks know the party never stops. Afterparty planners welcome!",
  },
];

export const EXPECT_ITEMS = [
  { label: "Hero Talks", img: imgHero, color: "bg-primary" },
  { label: "Inter-College Competitions", img: e5, color: "bg-accent" },
  { label: "Live Music Concert", img: e3, color: "bg-highlight" },
  { label: "Clinical Workshops", img: e4, color: "bg-ink" },
  { label: "MedTech Showcase", img: imgMedtech, color: "bg-primary-glow" },
  { label: "CME Lectures", img: imgCme, color: "bg-primary" },
  { label: "Celebrity Guests", img: imgCelebrity, color: "bg-accent" },
  { label: "Networking Sessions", img: imgNetworking, color: "bg-highlight" },
  { label: "Entrepreneurship Summit", img: imgEntrepreneurship, color: "bg-ink" },
  { label: "Community & Mentorship", img: imgSummit, color: "bg-primary-glow" },
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
    body: "FiestaLiva was everything I didn't know I needed in med school. The energy, the music, the talks — nothing comes close.",
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
    body: "From Entrepreneurship Summit to the dance championship — FiestaLiva packed everything into two insane days.",
    color: "#E8A020", // accent
    timestamp: "2:45 PM · MAY 8, 2026"
  },
];
