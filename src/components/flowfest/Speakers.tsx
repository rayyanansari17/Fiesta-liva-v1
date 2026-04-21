import { ENV, SPEAKERS } from "@/config/constants";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SPEAKERS_ANNOUNCED = false;

export const Speakers = () => {
  return (
    <section id="speakers" className="border-b-2 border-ink bg-secondary py-24 md:py-32">
      <div className="container">
        {SPEAKERS_ANNOUNCED ? (
          <>
            <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="mb-3 inline-block font-hand text-3xl text-primary -rotate-2">2026 Lineup</span>
                <h2 className="max-w-3xl font-display text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
                  Our 2026 Speaker
                  <span className="ml-3 italic text-accent">Lineup</span>
                </h2>
                <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                  Yep, we got <strong>Vladdy Daddy</strong> for the keynote. Plus some absolute legends sharing the
                  stage. (More speaker announcements to come!)
                </p>
              </div>
              <Button variant="hero" size="lg" asChild>
                <Link to="/register">
                  Get Your Pass
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SPEAKERS.map((sp) => (
                <article
                  key={sp.name}
                  className={`group overflow-hidden rounded-3xl border-2 border-ink bg-card shadow-brutal transition-transform hover:-translate-y-1 ${sp.featured ? "lg:col-span-1 lg:row-span-1" : ""
                    }`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-ink">
                    <img
                      src={sp.img}
                      alt={sp.name}
                      loading="lazy"
                      width={640}
                      height={800}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className={`absolute left-4 top-4 rounded-full border-2 border-ink px-3 py-1 text-xs font-bold uppercase ${sp.tagColor}`}
                    >
                      {sp.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-extrabold">{sp.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{sp.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block font-hand text-3xl text-primary -rotate-2">2026 Lineup</span>
            <h2 className="mb-6 font-display text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
              Our Speakers Are Getting Ready <span className="inline-block animate-bounce">🎤</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              Big names. Bigger ideas. We're putting together an incredible lineup of doctors, innovators, and changemakers. Stay tuned announcements dropping soon.
            </p>
            <Button variant="hero" size="lg" className="mt-10" asChild>
              <Link to="/register">
                Get Your Pass
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
