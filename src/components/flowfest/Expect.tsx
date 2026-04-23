import { EXPECT_ITEMS } from "@/config/constants";

export const Expect = () => {
  return (
    <section id="expect" className="border-b-2 border-ink bg-background py-24 md:py-32">
      <div className="container">
        <h2 className="mb-12 font-display text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
          What to <span className="font-hand text-accent">Expect</span>
        </h2>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {EXPECT_ITEMS.map((it) => (
            <div
              key={it.label}
              className="group relative flex flex-col overflow-hidden rounded-3xl border-2 border-ink bg-background shadow-brutal transition-transform hover:-translate-y-2"
            >
              <div className="relative w-full overflow-hidden border-b-2 border-ink pt-[60%]">
                <img
                  src={it.img}
                  alt={it.label}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ objectPosition: it.imagePosition || "center" }}
                />
              </div>
              <div className="bg-background px-4 py-3 min-h-[60px] flex items-center">
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
