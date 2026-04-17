import { Navbar } from "@/components/flowfest/Navbar";
import { Hero } from "@/components/flowfest/Hero";
import { SponsorMarquee } from "@/components/flowfest/SponsorMarquee";
import { About } from "@/components/flowfest/About";
import { Speakers } from "@/components/flowfest/Speakers";
import { Expect } from "@/components/flowfest/Expect";
import { Community } from "@/components/flowfest/Community";
import { Love } from "@/components/flowfest/Love";
import { FAQ } from "@/components/flowfest/FAQ";
import { FinalCTA, Footer } from "@/components/flowfest/FinalCTA";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <SponsorMarquee />
      <About />
      <Speakers />
      <Expect />
      <Community />
      <Love />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
