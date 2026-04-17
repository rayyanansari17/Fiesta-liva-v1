import { Button } from "@/components/ui/button";

const links = [
  { href: "#about", label: "About" },
  { href: "#speakers", label: "Speakers" },
  { href: "#expect", label: "What to Expect" },
  { href: "#faq", label: "FAQ" },
];

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-background/85 backdrop-blur">
      <nav className="container flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-2xl font-extrabold tracking-tight">
          Flow<span className="text-primary">Fest</span>
          <span className="ml-1 font-hand text-base text-accent">'25</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <Button variant="hero" size="sm" asChild>
          <a href="https://lu.ma/aq1a429h" target="_blank" rel="noreferrer">
            Buy Tickets
          </a>
        </Button>
      </nav>
    </header>
  );
};
