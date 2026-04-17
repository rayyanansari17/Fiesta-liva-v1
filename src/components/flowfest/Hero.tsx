import heroImg from "@/assets/hero-festival.jpg";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden border-b-2 border-ink">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="FlowFest crowd at sunset under string lights"
          className="h-full w-full object-cover"
          width={1536}
          height={1024}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/30 to-background" />
      </div>

      {/* Floating sticker */}
      <div className="absolute right-6 top-24 z-10 hidden md:block">
        <div className="animate-float rounded-full border-2 border-ink bg-highlight px-5 py-2 font-hand text-2xl text-ink shadow-brutal -rotate-6">
          Manchester · 2025
        </div>
      </div>

      <div className="container relative z-10 flex min-h-[88vh] flex-col items-start justify-end pb-20 pt-32 md:pb-28">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-background px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-ink shadow-brutal">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          Friday, August 22 · Media City Gardens
        </span>

        <h1 className="max-w-5xl font-display text-5xl font-extrabold leading-[0.95] text-background sm:text-7xl md:text-8xl lg:text-[8.5rem]">
          Webflow chat,
          <br />
          <span className="font-hand text-5xl text-highlight sm:text-6xl md:text-7xl">festival</span>{" "}
          <span className="italic">vibes</span>,
          <br />
          good times.
        </h1>

        <p className="mt-8 max-w-xl text-lg text-background/90 md:text-xl">
          FlowFest is back. The UK's most outrageous outdoor festival for web designers and developers.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button variant="hero" size="xl" asChild>
            <a href="https://lu.ma/aq1a429h" target="_blank" rel="noreferrer">
              Buy Tickets →
            </a>
          </Button>
          <Button variant="chunky" size="xl" asChild>
            <a href="#about">Watch the 2024 Recap</a>
          </Button>
        </div>
      </div>
    </section>
  );
};
