import e1 from "@/assets/event-1.jpg";
import e2 from "@/assets/event-2.jpg";
import e3 from "@/assets/event-3.jpg";
import e4 from "@/assets/event-4.jpg";
import e5 from "@/assets/event-5.jpg";

const items = [
  { label: "Expert Talks", img: e2, color: "bg-primary" },
  { label: "Fun + Games", img: e5, color: "bg-accent" },
  { label: "Food + Drink", img: e4, color: "bg-highlight" },
  { label: "Live Music", img: e3, color: "bg-ink" },
  { label: "Community", img: e1, color: "bg-primary-glow" },
];

export const Expect = () => {
  return (
    <section id="expect" className="border-b-2 border-ink bg-background py-24 md:py-32">
      <div className="container">
        <h2 className="mb-12 font-display text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
          What to <span className="font-hand text-accent">Expect</span>
        </h2>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {items.map((it, i) => (
            <div
              key={it.label}
              className={`group relative aspect-[3/4] overflow-hidden rounded-3xl border-2 border-ink shadow-brutal transition-transform hover:-translate-y-2 ${
                i === 0 ? "lg:row-span-1" : ""
              }`}
            >
              <img
                src={it.img}
                alt={it.label}
                loading="lazy"
                width={800}
                height={800}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 border-t-2 border-ink bg-background/95 px-4 py-3 backdrop-blur">
                <span className="font-display text-lg font-bold">{it.label}</span>
              </div>
              <span className={`absolute right-3 top-3 h-4 w-4 rounded-full border-2 border-ink ${it.color}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
