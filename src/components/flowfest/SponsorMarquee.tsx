import { SPONSORS } from "@/config/constants";

export const SponsorMarquee = () => {
  const items = [...SPONSORS, ...SPONSORS];
  return (
    <section className="border-b-2 border-ink bg-ink py-6 text-ink-foreground">
      <div className="flex items-center overflow-hidden">
        <div className="flex animate-marquee items-center gap-12 whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              {SPONSORS.map((s, j) => (
                <span key={j} className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {s}
                  <span className="ml-12 text-highlight">★</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
