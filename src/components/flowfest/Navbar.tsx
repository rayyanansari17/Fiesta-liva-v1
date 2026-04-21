import { useState, useEffect } from "react";
import { ENV, NAV_LINKS, SITE_CONTENT } from "@/config/constants";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Navbar = ({ forceSolid = false, onReset }: { forceSolid?: boolean, onReset?: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(forceSolid);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (forceSolid) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [forceSolid]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
      ? "border-b-2 border-ink bg-background/95 backdrop-blur shadow-sm text-foreground"
      : "bg-transparent border-transparent text-white"
      }`}>
      <nav className="container flex h-16 items-center justify-between">
        <a href="/" className="flex flex-col leading-none transition-colors duration-300 whitespace-nowrap flex-shrink-0 group">
          <span className="font-display text-2xl font-extrabold tracking-tight">
            Fiesta<span className={`transition-colors duration-300 ${isScrolled ? "text-primary" : "text-white"}`}>Liva</span>
          </span>
          <span className={`text-[10px] sm:text-xs font-light tracking-[0.2em] uppercase transition-colors duration-300 ${isScrolled ? "text-foreground/70" : "text-white/80"}`}>
            Summer fest '26
          </span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-sm font-semibold transition-colors duration-300 ${isScrolled
                  ? "text-foreground/80 hover:text-primary"
                  : "text-white/90 hover:text-white"
                  }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <Button variant={isScrolled ? "hero" : "secondary"} size="sm" className="hidden md:inline-flex transition-all duration-300" asChild>
            <Link to="/register" onClick={onReset}>
              Get Your Pass
            </Link>
          </Button>
          <button
            className={`md:hidden p-2 rounded-md ${isScrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b-2 border-ink shadow-lg flex flex-col py-4 px-6 gap-4 z-50">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-foreground text-lg font-bold hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
