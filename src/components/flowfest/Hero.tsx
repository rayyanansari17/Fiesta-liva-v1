import { ENV, SITE_CONTENT, IMAGES } from "@/config/constants";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden border-b-2 border-ink h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-[#1a0a2e]">
        <img
          src={IMAGES.hero}
          alt={`${ENV.SITE_NAME} festival crowd at sunset`}
          className="h-full w-full object-cover"
          width={1536}
          height={1024}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/30 to-background" />
      </div>

      <div className="container relative z-10 flex h-full flex-col items-start justify-end pb-20 pt-32 md:pb-28">
        <div className="mb-6 flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-background px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-brutal sm:px-4 sm:py-1.5 sm:text-sm whitespace-nowrap">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              {SITE_CONTENT.eventDates}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-background px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-brutal sm:px-4 sm:py-1.5 sm:text-sm whitespace-nowrap">
              {SITE_CONTENT.eventLocation}
            </span>
          </div>
          <span className="w-fit inline-flex items-center gap-2 rounded-full border-2 border-ink bg-highlight px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-brutal sm:px-4 sm:py-1.5 sm:text-sm whitespace-nowrap">
            HEROES OF HUMANITY PRESENTS
          </span>
        </div>

        <h1 className="max-w-5xl font-display text-6xl font-extrabold leading-[0.8] text-background sm:text-8xl md:text-9xl lg:text-[10rem]">
          FIESTA LIVA!
          <span className="mt-2 block font-display text-2xl font-light tracking-[0.1em] text-highlight sm:text-3xl md:text-4xl lg:text-5xl">
            Summer fest '26
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-lg text-background/90 md:text-xl">
          {SITE_CONTENT.heroSubtitle}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button variant="hero" size="xl" asChild>
            <Link to="/register">
              {SITE_CONTENT.ticketButtonText}
            </Link>
          </Button>
          <Button variant="chunky" size="xl" asChild>
            <a href="#about">Learn More</a>
          </Button>
        </div>
      </div>
    </section>
  );
};
