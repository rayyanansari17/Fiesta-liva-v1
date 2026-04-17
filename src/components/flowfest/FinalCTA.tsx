import { Button } from "@/components/ui/button";

export const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-ink py-24 text-ink-foreground md:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-10 top-10 font-display text-[14rem] font-extrabold">FIESTA</div>
        <div className="absolute bottom-10 right-10 font-display text-[14rem] font-extrabold">LIVA</div>
      </div>

      <div className="container relative max-w-4xl text-center">
        <span className="mb-4 inline-block font-hand text-3xl text-highlight -rotate-2">
          Don't miss out
        </span>
        <h2 className="font-display text-5xl font-extrabold leading-[1.05] md:text-6xl lg:text-7xl">
          Get your ticket for the{" "}
          <span className="bg-sunset bg-clip-text text-transparent">community-led event</span> of the year.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg opacity-80 md:text-xl">
          As web designers and developers, this is the kind of event we desperately wanted — so we created
          it. No stuffy conference rooms, no dull corporate halls. Just a lovely community sharing
          knowledge with a pint and a burger in hand.
        </p>
        <Button variant="hero" size="xl" className="mt-10" asChild>
          <a href="https://lu.ma/aq1a429h" target="_blank" rel="noreferrer">
            Grab Your Ticket →
          </a>
        </Button>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-background py-12">
      <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
        <a href="#top" className="font-display text-2xl font-extrabold">
          Fiesta<span className="text-primary">Liva</span>
          <span className="ml-1 font-hand text-base text-accent">'26</span>
        </a>
        <p className="text-sm text-muted-foreground">
          Made with <span className="text-primary">♥</span> by Heroes of Humanity · Hyderabad, India
        </p>
        <div className="flex gap-4 text-sm font-semibold">
          <a href="#" className="hover:text-primary">Twitter</a>
          <a href="#" className="hover:text-primary">Instagram</a>
          <a href="#" className="hover:text-primary">YouTube</a>
        </div>
      </div>
    </footer>
  );
};
