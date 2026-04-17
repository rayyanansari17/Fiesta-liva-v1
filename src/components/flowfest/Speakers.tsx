import s1 from "@/assets/speaker-1.jpg";
import s2 from "@/assets/speaker-2.jpg";
import s3 from "@/assets/speaker-3.jpg";
import s4 from "@/assets/speaker-4.jpg";
import s5 from "@/assets/speaker-5.jpg";
import { Button } from "@/components/ui/button";

const speakers = [
  {
    img: s1,
    name: "Vlad Magdalin",
    tag: "Keynote",
    tagColor: "bg-primary text-primary-foreground",
    bio: "Our founding Webflow father. Our dad joke aficionado. He puts the mad into Magdalin and will be kicking off FlowFest '25 as our keynote speaker!",
    featured: true,
  },
  {
    img: s2,
    name: "Ilja van Eck",
    tag: "Development",
    tagColor: "bg-accent text-accent-foreground",
    bio: "Oh 'Eck, we've only gone and secured the web wizard himself. Co-founder of Osmo & Webflow superstar — we can't wait to learn from Ilja!",
  },
  {
    img: s3,
    name: "Cassie Evans",
    tag: "Animation",
    tagColor: "bg-highlight text-ink",
    bio: "Our GSAP fairy codemother is here to sprinkle some tween magic, animation goodness & Webflow's deepest darkest secrets.",
  },
  {
    img: s4,
    name: "Stephanie Bruce",
    tag: "Design",
    tagColor: "bg-ink text-ink-foreground",
    bio: "Devs want to work with her, designers want to be her. Steph will be sharing her expert freelancer growth tips.",
  },
  {
    img: s5,
    name: "Ross Plaskow",
    tag: "Animation",
    tagColor: "bg-primary text-primary-foreground",
    bio: "We've all wanted to animate something cool with Rive, and Ross is here to show us how with his ridiculously fun and slick style.",
  },
];

export const Speakers = () => {
  return (
    <section id="speakers" className="border-b-2 border-ink bg-secondary py-24 md:py-32">
      <div className="container">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="mb-3 inline-block font-hand text-3xl text-primary -rotate-2">2025 Lineup</span>
            <h2 className="max-w-3xl font-display text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
              Our 2025 Speaker
              <span className="ml-3 italic text-accent">Lineup</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Yep, we got <strong>Vladdy Daddy</strong> for the keynote. Plus some absolute legends sharing the
              stage. (More speaker announcements to come!)
            </p>
          </div>
          <Button variant="hero" size="lg" asChild>
            <a href="https://lu.ma/aq1a429h" target="_blank" rel="noreferrer">
              Buy Tickets
            </a>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {speakers.map((sp) => (
            <article
              key={sp.name}
              className={`group overflow-hidden rounded-3xl border-2 border-ink bg-card shadow-brutal transition-transform hover:-translate-y-1 ${
                sp.featured ? "lg:col-span-1 lg:row-span-1" : ""
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-ink">
                <img
                  src={sp.img}
                  alt={sp.name}
                  loading="lazy"
                  width={640}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute left-4 top-4 rounded-full border-2 border-ink px-3 py-1 text-xs font-bold uppercase ${sp.tagColor}`}
                >
                  {sp.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-extrabold">{sp.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{sp.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
