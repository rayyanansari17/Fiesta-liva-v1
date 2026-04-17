import heroImg from "@/assets/hero-festival.jpg";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden border-b-2 border-ink">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="FIESTA LIVA medical youth cultural festival crowd at sunset"
          className="h-full w-full object-cover"
          width={1536}
          height={1024}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/30 to-background" />
      </div>

      {/* Floating sticker */}
      <div className="absolute right-6 top-24 z-10 hidden md:block">
        <div className="animate-float rounded-full border-2 border-ink bg-highlight px-5 py-2 font-hand text-2xl text-ink shadow-brutal -rotate-6">
          HEROES OF HUMANITY PRESENTS
        </div>
      </div>

      <div className="container relative z-10 flex min-h-[88vh] flex-col items-start justify-end pb-20 pt-32 md:pb-28">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-background px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-ink shadow-brutal">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          7th May – 8th May · Shilpakala Vedika, Hyderabad
        </span>

        <h1 className="max-w-5xl font-display text-6xl font-extrabold leading-[0.95] text-background sm:text-8xl md:text-9xl lg:text-[10rem]">
          FIESTA LIVA!{" "}
          <span className="text-highlight">2026</span>
        </h1>

        <p className="mt-8 max-w-xl text-lg text-background/90 md:text-xl">
          Medical Youth Cultural Festival & Awards Night for Medical Students.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button variant="hero" size="xl" asChild>
            <a href="https://lu.ma/aq1a429h" target="_blank" rel="noreferrer">
              Buy Tickets →
            </a>
          </Button>
          <Button variant="chunky" size="xl" asChild>
            <a href="#about">Learn More</a>
          </Button>
        </div>
      </div>
    </section>
  );
};
