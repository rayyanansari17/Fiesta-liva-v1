import { Button } from "@/components/ui/button";

const organisers = [
  { name: "Isabel Edwards", emoji: "🌻" },
  { name: "Josh Fry", emoji: "🍻" },
  { name: "Benn Raistrick", emoji: "🎨" },
  { name: "Scott Humphrey", emoji: "🎤" },
  { name: "Rachael Ward", emoji: "✨" },
  { name: "John Ostler", emoji: "🥁" },
];

export const Community = () => {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-sunset py-24 text-ink md:py-32">
      <div className="absolute -left-10 top-10 animate-spin-slow font-display text-9xl opacity-20">★</div>
      <div className="absolute -right-10 bottom-10 animate-spin-slow font-display text-9xl opacity-20">✿</div>

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block font-hand text-3xl -rotate-2">For the people</span>
          <h2 className="font-display text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
            An Event Run by the Community,{" "}
            <span className="italic">For the Community</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl">
            This is a <strong>non-profit</strong> event run by <strong>volunteer</strong> community members.
            At FlowFest our motivation is to lead with kindness, inclusivity, support and{" "}
            <strong>FUN</strong>, obvs.
          </p>
          <Button variant="ink" size="xl" className="mt-10" asChild>
            <a href="https://lu.ma/aq1a429h" target="_blank" rel="noreferrer">
              Buy Tickets →
            </a>
          </Button>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {organisers.map((o) => (
            <div
              key={o.name}
              className="rounded-2xl border-2 border-ink bg-background p-5 text-center text-foreground shadow-brutal"
            >
              <div className="mb-2 text-4xl">{o.emoji}</div>
              <div className="font-display font-bold">{o.name}</div>
              <div className="text-xs text-muted-foreground">Organiser</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
