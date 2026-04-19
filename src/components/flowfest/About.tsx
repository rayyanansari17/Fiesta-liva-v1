import { ABOUT_PHOTOS, SITE_CONTENT, ENV } from "@/config/constants";
import { Button } from "@/components/ui/button";

export const About = () => {
  return (
    <section id="about" className="border-b-2 border-ink bg-background py-24 md:py-32">
      <div className="container">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="mb-4 inline-block font-hand text-3xl text-accent -rotate-2">
              What is {ENV.SITE_NAME}?
            </span>
            <h2 className="font-display text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
              {SITE_CONTENT.aboutTitle}{" "}
              <span className="inline-block bg-sunset px-4 py-1 text-white">
                {SITE_CONTENT.aboutHighlight}
              </span>
            </h2>
            <p className="mt-8 max-w-lg text-lg text-muted-foreground md:text-xl">
              {SITE_CONTENT.aboutDescription}
            </p>
            <Button variant="ink" size="lg" className="mt-8" asChild>
              <a href="#speakers">
                Explore the Lineup →
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {ABOUT_PHOTOS.map((p, i) => (
              <img
                key={i}
                src={p.src}
                alt=""
                loading="lazy"
                width={800}
                height={800}
                className={`aspect-square w-full rounded-2xl border-2 border-ink object-cover shadow-brutal transition-transform hover:rotate-0 hover:scale-105 ${p.rotate} ${p.mt}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
