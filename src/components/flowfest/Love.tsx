const tweets = [
  {
    name: "Cassie Evans",
    handle: "@cassiecodes",
    body: "FlowFest was hands down the most fun I've had at a web event. Steel drums, pints, brilliant talks — what more could you want?",
    color: "bg-highlight",
  },
  {
    name: "Kieran Gill",
    handle: "@kierangill",
    body: "Manchester turned it on. The FlowFest crew put together something genuinely special. Already counting down to next year.",
    color: "bg-primary text-primary-foreground",
  },
  {
    name: "Eugene Salt",
    handle: "@eugenesalt",
    body: "I came for the Webflow talks. I stayed for the karaoke afterparty. 10/10 would FlowFest again.",
    color: "bg-accent text-accent-foreground",
  },
  {
    name: "Isabelle B.",
    handle: "@isadesigns",
    body: "The friendliest community in webdev. Genuinely felt like meeting old mates I'd never met before.",
    color: "bg-secondary",
  },
  {
    name: "Rahul P.",
    handle: "@rahuldev",
    body: "Outdoor venue, golden hour, banging burgers and a Vlad keynote? Take my money already.",
    color: "bg-ink text-ink-foreground",
  },
];

export const Love = () => {
  return (
    <section className="border-b-2 border-ink bg-secondary py-24 md:py-32">
      <div className="container">
        <h2 className="mb-12 font-display text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
          <span className="font-hand text-accent">#FlowFest</span>Love
        </h2>
        <div className="columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {tweets.map((t, i) => (
            <article
              key={i}
              className={`rounded-2xl border-2 border-ink p-6 shadow-brutal ${t.color}`}
              style={{ rotate: `${(i % 2 === 0 ? -1 : 1) * 1.2}deg` }}
            >
              <p className="text-lg font-medium leading-snug">"{t.body}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-background font-display font-extrabold text-foreground">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-display font-bold">{t.name}</div>
                  <div className="text-xs opacity-70">{t.handle}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
