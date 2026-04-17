const sponsors = ["Webflow", "Finsweet", "Relume", "Memberstack", "Wized", "Osmo", "Refokus", "Edgar Allan"];

export const SponsorMarquee = () => {
  const items = [...sponsors, ...sponsors];
  return (
    <section className="border-b-2 border-ink bg-ink py-6 text-ink-foreground">
      <div className="flex items-center gap-12 overflow-hidden">
        <span className="shrink-0 pl-6 font-hand text-2xl text-highlight">Sponsored by</span>
        <div className="flex animate-marquee items-center gap-12 whitespace-nowrap">
          {items.map((s, i) => (
            <span key={i} className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              {s}
              <span className="ml-12 text-primary">★</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
