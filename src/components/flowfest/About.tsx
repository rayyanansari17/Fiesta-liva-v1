import e1 from "@/assets/event-1.jpg";
import e2 from "@/assets/event-2.jpg";
import e3 from "@/assets/event-3.jpg";
import e4 from "@/assets/event-4.jpg";
import e5 from "@/assets/event-5.jpg";
import { Button } from "@/components/ui/button";

const photos = [
  { src: e1, rotate: "-rotate-3", mt: "mt-12" },
  { src: e2, rotate: "rotate-2", mt: "" },
  { src: e3, rotate: "-rotate-2", mt: "mt-16" },
  { src: e4, rotate: "rotate-3", mt: "mt-4" },
  { src: e5, rotate: "-rotate-1", mt: "mt-20" },
];

export const About = () => {
  return (
    <section id="about" className="border-b-2 border-ink bg-background py-24 md:py-32">
      <div className="container">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="mb-4 inline-block font-hand text-3xl text-accent -rotate-2">
              What is Fiesta Liva?
            </span>
            <h2 className="font-display text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
              The No.1 Fest for{" "}
              <span className="bg-sunset bg-clip-text text-transparent">Web Designers & Devs</span>
            </h2>
            <p className="mt-8 max-w-lg text-lg text-muted-foreground md:text-xl">
              It's like a conference, but it's outside, with steel drums, pints and way cooler vibes.
              Listen to web design & dev talks whilst having a belting time.
            </p>
            <Button variant="ink" size="lg" className="mt-8" asChild>
              <a href="https://lu.ma/aq1a429h" target="_blank" rel="noreferrer">
                Watch the 2024 Recap
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {photos.map((p, i) => (
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
