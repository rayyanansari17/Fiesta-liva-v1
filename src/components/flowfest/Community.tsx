import { ENV, ORGANISERS } from "@/config/constants";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Community = () => {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-sunset py-24 text-white md:py-32">
      <div className="absolute -left-10 top-10 animate-spin-slow font-display text-9xl opacity-20">★</div>
      <div className="absolute -right-10 bottom-10 animate-spin-slow font-display text-9xl opacity-20">✿</div>

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-block font-hand text-3xl -rotate-2">For the People</span>
          <h2 className="font-display text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
            From Medicos, By Medicos, For Medicos
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl opacity-90">
            FiestaLiva brings together medical colleges across Telangana for a celebration of performing arts, music, technology, and academic excellence all under one roof. Built by students, for students.
          </p>
          <Button variant="ink" size="xl" className="mt-10" asChild>
            <Link to="/register">
              Buy Tickets →
            </Link>
          </Button>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {ORGANISERS.map((o) => (
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
