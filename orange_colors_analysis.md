# Orange Color Usage Analysis

## 1. Summary of Orange Color Definitions

### Plain Orange Colors
- `hsl(16 95% 56%)` - Main sunset orange used for `--primary` and `--ring`
- `hsl(28 100% 65%)` - Used for `--primary-glow`
- `hsl(16 95% 60%)` - Lighter main orange used for `--primary` in `.dark` mode
- `hsl(16 95% 56% / 0.35)` - Used for `--shadow-soft`

### Orange Gradients
- `linear-gradient(135deg, hsl(340 85% 62%), hsl(16 95% 56%) 50%, hsl(45 100% 60%))` - Defines the `--gradient-sunset` variable

### CSS Variables Storing Orange Values
- `--primary`
- `--primary-glow`
- `--ring` (inherits the primary sunset orange)
- `--gradient-sunset`
- `--shadow-soft`

### Tailwind Classes That Are Orange
- `bg-primary`
- `text-primary`
- `text-primary-foreground` (used in contrast with bg-primary)
- `border-primary`
- `ring-ring` 
- `bg-primary-glow`
- `bg-sunset` 

---

## 2. Occurrences by File

### src/components/ui/checkbox.tsx
**Path**: `/home/rayyan/flowfest-replica/src/components/ui/checkbox.tsx`

- **Line 14** (Found: primary):
  ```tsx
14: "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  ```

### src/index.css
**Path**: `/home/rayyan/flowfest-replica/src/index.css`

- **Line 18** (Found: orange):
  ```css
18: /* Sunset orange */
  ```
- **Line 19** (Found: primary):
  ```css
19: --primary: 16 95% 56%;
  ```
- **Line 20** (Found: primary):
  ```css
20: --primary-foreground: 35 60% 98%;
  ```
- **Line 21** (Found: primary):
  ```css
21: --primary-glow: 28 100% 65%;
  ```
- **Line 47** (Found: ):
  ```css
47: --ring: 16 95% 56%;
  ```
- **Line 51** (Found: hsl orange value):
  ```css
51: --gradient-sunset: linear-gradient(135deg, hsl(340 85% 62%), hsl(16 95% 56%) 50%, hsl(45 100% 60%));
  ```
- **Line 55** (Found: hsl orange value):
  ```css
55: --shadow-soft: 0 20px 60px -20px hsl(16 95% 56% / 0.35);
  ```
- **Line 74** (Found: primary):
  ```css
74: --primary: 16 95% 60%;
  ```
- **Line 75** (Found: primary):
  ```css
75: --primary-foreground: 280 35% 10%;
  ```
- **Line 84** (Found: ):
  ```css
84: --ring: 16 95% 60%;
  ```
- **Line 107** (Found: ):
  ```css
107: background: var(--gradient-sunset);
  ```

### src/components/ui/slider.tsx
**Path**: `/home/rayyan/flowfest-replica/src/components/ui/slider.tsx`

- **Line 16** (Found: primary):
  ```tsx
16: <SliderPrimitive.Range className="absolute h-full bg-primary" />
  ```
- **Line 18** (Found: primary):
  ```tsx
18: <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  ```

### src/components/ui/sonner.tsx
**Path**: `/home/rayyan/flowfest-replica/src/components/ui/sonner.tsx`

- **Line 18** (Found: primary):
  ```tsx
18: actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
  ```

### src/components/ui/calendar.tsx
**Path**: `/home/rayyan/flowfest-replica/src/components/ui/calendar.tsx`

- **Line 35** (Found: primary):
  ```tsx
35: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
  ```

### src/config/constants.ts
**Path**: `/home/rayyan/flowfest-replica/src/config/constants.ts`

- **Line 53** (Found: primary):
  ```tsx
53: tagColor: "bg-primary text-primary-foreground",
  ```
- **Line 82** (Found: primary):
  ```tsx
82: tagColor: "bg-primary text-primary-foreground",
  ```
- **Line 111** (Found: primary):
  ```tsx
111: { label: "Expert Talks", img: e2, color: "bg-primary" },
  ```
- **Line 115** (Found: primary):
  ```tsx
115: { label: "Community", img: e1, color: "bg-primary-glow" },
  ```
- **Line 146** (Found: primary):
  ```tsx
146: color: "bg-primary text-primary-foreground",
  ```

### src/components/ui/badge.tsx
**Path**: `/home/rayyan/flowfest-replica/src/components/ui/badge.tsx`

- **Line 11** (Found: primary):
  ```tsx
11: default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
  ```

### src/components/ui/radio-group.tsx
**Path**: `/home/rayyan/flowfest-replica/src/components/ui/radio-group.tsx`

- **Line 23** (Found: primary):
  ```tsx
23: "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  ```

### src/components/ui/progress.tsx
**Path**: `/home/rayyan/flowfest-replica/src/components/ui/progress.tsx`

- **Line 16** (Found: primary):
  ```tsx
16: className="h-full w-full flex-1 bg-primary transition-all"
  ```

### src/components/ui/button.tsx
**Path**: `/home/rayyan/flowfest-replica/src/components/ui/button.tsx`

- **Line 12** (Found: primary):
  ```tsx
12: default: "bg-primary text-primary-foreground hover:bg-primary/90",
  ```
- **Line 17** (Found: primary):
  ```tsx
17: link: "text-primary underline-offset-4 hover:underline",
  ```
- **Line 18** (Found: primary):
  ```tsx
18: hero: "border-2 border-ink bg-primary text-primary-foreground font-bold rounded-full shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all",
  ```

### src/pages/NotFound.tsx
**Path**: `/home/rayyan/flowfest-replica/src/pages/NotFound.tsx`

- **Line 16** (Found: primary):
  ```tsx
16: <a href="/" className="text-primary underline hover:text-primary/90">
  ```

### src/components/ui/switch.tsx
**Path**: `/home/rayyan/flowfest-replica/src/components/ui/switch.tsx`

- **Line 12** (Found: primary):
  ```tsx
12: "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  ```

### src/components/flowfest/Hero.tsx
**Path**: `/home/rayyan/flowfest-replica/src/components/flowfest/Hero.tsx`

- **Line 28** (Found: primary):
  ```tsx
28: <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
  ```

### src/components/flowfest/Speakers.tsx
**Path**: `/home/rayyan/flowfest-replica/src/components/flowfest/Speakers.tsx`

- **Line 10** (Found: primary):
  ```tsx
10: <span className="mb-3 inline-block font-hand text-3xl text-primary -rotate-2">2025 Lineup</span>
  ```

### src/components/flowfest/FinalCTA.tsx
**Path**: `/home/rayyan/flowfest-replica/src/components/flowfest/FinalCTA.tsx`

- **Line 18** (Found: bg-sunset):
  ```tsx
18: <span className="bg-sunset bg-clip-text text-transparent">community-led event</span> of the year.
  ```
- **Line 40** (Found: primary):
  ```tsx
40: {ENV.SITE_NAME.substring(0, 6)}<span className="text-primary">{ENV.SITE_NAME.substring(6)}</span>
  ```
- **Line 44** (Found: primary):
  ```tsx
44: Made with <span className="text-primary">♥</span> by Heroes of Humanity · Hyderabad, India
  ```
- **Line 47** (Found: primary):
  ```tsx
47: <a href="#" className="hover:text-primary">Twitter</a>
  ```
- **Line 48** (Found: primary):
  ```tsx
48: <a href="#" className="hover:text-primary">Instagram</a>
  ```
- **Line 49** (Found: primary):
  ```tsx
49: <a href="#" className="hover:text-primary">YouTube</a>
  ```

### src/components/flowfest/FAQ.tsx
**Path**: `/home/rayyan/flowfest-replica/src/components/flowfest/FAQ.tsx`

- **Line 13** (Found: primary):
  ```tsx
13: <span className="mb-3 inline-block font-hand text-3xl text-primary -rotate-2">Need to know</span>
  ```

### src/components/flowfest/SponsorMarquee.tsx
**Path**: `/home/rayyan/flowfest-replica/src/components/flowfest/SponsorMarquee.tsx`

- **Line 13** (Found: primary):
  ```tsx
13: <span className="ml-12 text-primary">★</span>
  ```

### src/components/flowfest/Navbar.tsx
**Path**: `/home/rayyan/flowfest-replica/src/components/flowfest/Navbar.tsx`

- **Line 9** (Found: primary):
  ```tsx
9: {ENV.SITE_NAME.substring(0, 6)}<span className="text-primary">{ENV.SITE_NAME.substring(6)}</span>
  ```
- **Line 17** (Found: primary):
  ```tsx
17: className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
  ```

### tailwind.config.ts
**Path**: `/home/rayyan/flowfest-replica/tailwind.config.ts`

- **Line 35** (Found: primary):
  ```tsx
35: primary: {
  ```
- **Line 36** (Found: primary, hsl orange value):
  ```tsx
36: DEFAULT: "hsl(var(--primary))",
  ```
- **Line 37** (Found: primary, hsl orange value):
  ```tsx
37: foreground: "hsl(var(--primary-foreground))",
  ```
- **Line 38** (Found: primary, hsl orange value):
  ```tsx
38: glow: "hsl(var(--primary-glow))",
  ```

---

## 3. Complete Code of Every File Containing Orange

### src/components/ui/checkbox.tsx
```tsx
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

```

### src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Fiesta Liva design system — sunset festival vibes */

@layer base {
  :root {
    --background: 35 60% 96%;
    --foreground: 20 30% 12%;

    --card: 35 60% 98%;
    --card-foreground: 20 30% 12%;

    --popover: 35 60% 98%;
    --popover-foreground: 20 30% 12%;

    /* Sunset orange */
    --primary: 16 95% 56%;
    --primary-foreground: 35 60% 98%;
    --primary-glow: 28 100% 65%;

    /* Cream / sand */
    --secondary: 38 70% 90%;
    --secondary-foreground: 20 30% 12%;

    --muted: 35 40% 92%;
    --muted-foreground: 20 15% 38%;

    /* Hot pink accent */
    --accent: 340 85% 62%;
    --accent-foreground: 35 60% 98%;

    /* Festival yellow */
    --highlight: 45 100% 60%;
    --highlight-foreground: 20 30% 12%;

    /* Deep plum */
    --ink: 280 35% 18%;
    --ink-foreground: 35 60% 98%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 35 60% 98%;

    --border: 20 30% 12%;
    --input: 35 30% 85%;
    --ring: 16 95% 56%;

    --radius: 1rem;

    --gradient-sunset: linear-gradient(135deg, hsl(340 85% 62%), hsl(16 95% 56%) 50%, hsl(45 100% 60%));
    --gradient-warm: linear-gradient(180deg, hsl(35 60% 96%), hsl(38 70% 90%));
    --shadow-brutal: 6px 6px 0 0 hsl(var(--ink));
    --shadow-brutal-lg: 10px 10px 0 0 hsl(var(--ink));
    --shadow-soft: 0 20px 60px -20px hsl(16 95% 56% / 0.35);

    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  .dark {
    --background: 280 35% 10%;
    --foreground: 35 60% 96%;
    --card: 280 35% 14%;
    --card-foreground: 35 60% 96%;
    --popover: 280 35% 14%;
    --popover-foreground: 35 60% 96%;
    --primary: 16 95% 60%;
    --primary-foreground: 280 35% 10%;
    --secondary: 280 25% 20%;
    --secondary-foreground: 35 60% 96%;
    --muted: 280 25% 18%;
    --muted-foreground: 35 20% 70%;
    --accent: 340 85% 65%;
    --accent-foreground: 35 60% 96%;
    --border: 35 60% 96%;
    --input: 280 25% 22%;
    --ring: 16 95% 60%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-sans antialiased;
    font-feature-settings: "ss01", "ss02";
  }
  h1, h2, h3, h4 {
    @apply font-display tracking-tight;
  }
}

@layer utilities {
  .text-stroke {
    -webkit-text-stroke: 2px hsl(var(--ink));
    color: transparent;
  }
  .bg-sunset {
    background: var(--gradient-sunset);
  }
  .shadow-brutal {
    box-shadow: var(--shadow-brutal);
  }
  .shadow-brutal-lg {
    box-shadow: var(--shadow-brutal-lg);
  }
  .border-ink {
    border-color: hsl(var(--ink));
  }

  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 30s linear infinite;
  }

  @keyframes float-slow {
    0%, 100% { transform: translateY(0) rotate(-2deg); }
    50% { transform: translateY(-12px) rotate(2deg); }
  }
  .animate-float {
    animation: float-slow 6s ease-in-out infinite;
  }

  @keyframes spin-slow {
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 18s linear infinite;
  }
}

```

### src/components/ui/slider.tsx
```tsx
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

```

### src/components/ui/sonner.tsx
```tsx
import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };

```

### src/components/ui/calendar.tsx
```tsx
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

```

### src/config/constants.ts
```typescript
import e1 from "@/assets/event-1.jpg";
import e2 from "@/assets/event-2.jpg";
import e3 from "@/assets/event-3.jpg";
import e4 from "@/assets/event-4.jpg";
import e5 from "@/assets/event-5.jpg";

import s1 from "@/assets/speaker-1.jpg";
import s2 from "@/assets/speaker-2.jpg";
import s3 from "@/assets/speaker-3.jpg";
import s4 from "@/assets/speaker-4.jpg";
import s5 from "@/assets/speaker-5.jpg";

import heroImg from "@/assets/hero-festival.jpg";

export const ENV = {
  TICKET_URL: import.meta.env.VITE_TICKET_URL || "https://lu.ma/aq1a429h",
  SITE_NAME: import.meta.env.VITE_SITE_NAME || "FiestaLiva",
};

export const IMAGES = {
  events: [e1, e2, e3, e4, e5],
  speakers: [s1, s2, s3, s4, s5],
  hero: heroImg,
};

export const SITE_CONTENT = {
  eventDates: "7th May – 8th May",
  eventLocation: "Shilpakala Vedika, Hyderabad",
  year: "2026",
  heroSubtitle: "Medical Youth Cultural Festival & Awards Night for Medical Students.",
  aboutTitle: "The No.1 Fest for",
  aboutHighlight: "Web Designers & Devs", // Though the subtitle earlier said Medical Students... inconsistent!
  aboutDescription: "It's like a conference, but it's outside, with steel drums, pints and way cooler vibes. Listen to web design & dev talks whilst having a belting time.",
  ticketButtonText: "Buy Tickets →",
};

export const SPONSORS = [
  "Webflow", "Finsweet", "Relume", "Memberstack", "Wized", "Osmo", "Refokus", "Edgar Allan"
];

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#speakers", label: "Speakers" },
  { href: "#expect", label: "What to Expect" },
  { href: "#faq", label: "FAQ" },
];

export const SPEAKERS = [
  {
    img: s1,
    name: "Vlad Magdalin",
    tag: "Keynote",
    tagColor: "bg-primary text-primary-foreground",
    bio: "Our founding Webflow father. Our dad joke aficionado. He puts the mad into Magdalin and will be kicking off Fiesta Liva '26 as our keynote speaker!",
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

export const FAQS = [
  {
    q: "Can I have a discount?",
    a: "This is a non-profit event, and our goal is to make Fiesta Liva as affordable as we possibly can whilst delivering a quality day you'll never forget. To keep ticket prices as low as possible for everyone, we're unable to offer discounts and appreciate your support for this community event.",
  },
  {
    q: "How do I get there?",
    a: "Fiesta Liva is hosted at Shilpakala Vedika, Hyderabad — easily reachable by car or local transport, with parking available on site.",
  },
  {
    q: "Is there food included?",
    a: "Yes — a banging lunch courtesy of Kargo on the Docks is included in your ticket, plus drinks tokens to keep you topped up.",
  },
  {
    q: "What should I bring?",
    a: "Good vibes and layers. This is an all-day outdoor event in Manchester, so check the weather closer to the time and dress accordingly. There are no hands-on workshops this year, so no need to bring a laptop.",
  },
  {
    q: "Will there be an afterparty?",
    a: "No official afterparty, but Fiesta Liva folks know the party never stops. Afterparty planners welcome!",
  },
];

export const EXPECT_ITEMS = [
  { label: "Expert Talks", img: e2, color: "bg-primary" },
  { label: "Fun + Games", img: e5, color: "bg-accent" },
  { label: "Food + Drink", img: e4, color: "bg-highlight" },
  { label: "Live Music", img: e3, color: "bg-ink" },
  { label: "Community", img: e1, color: "bg-primary-glow" },
];

export const ABOUT_PHOTOS = [
  { src: e1, rotate: "-rotate-3", mt: "mt-12" },
  { src: e2, rotate: "rotate-2", mt: "" },
  { src: e3, rotate: "-rotate-2", mt: "mt-16" },
  { src: e4, rotate: "rotate-3", mt: "mt-4" },
  { src: e5, rotate: "-rotate-1", mt: "mt-20" },
];

export const ORGANISERS = [
  { name: "Isabel Edwards", emoji: "🌻" },
  { name: "Josh Fry", emoji: "🍻" },
  { name: "Benn Raistrick", emoji: "🎨" },
  { name: "Scott Humphrey", emoji: "🎤" },
  { name: "Rachael Ward", emoji: "✨" },
  { name: "John Ostler", emoji: "🥁" },
];

export const TWEETS = [
  {
    name: "Cassie Evans",
    handle: "@cassiecodes",
    body: "Fiesta Liva was hands down the most fun I've had at a web event. Steel drums, pints, brilliant talks — what more could you want?",
    color: "bg-highlight",
  },
  {
    name: "Kieran Gill",
    handle: "@kierangill",
    body: "Manchester turned it on. The Fiesta Liva crew put together something genuinely special. Already counting down to next year.",
    color: "bg-primary text-primary-foreground",
  },
  {
    name: "Eugene Salt",
    handle: "@eugenesalt",
    body: "I came for the talks. I stayed for the karaoke afterparty. 10/10 would Fiesta Liva again.",
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

```

### src/components/ui/badge.tsx
```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

```

### src/components/ui/radio-group.tsx
```tsx
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };

```

### src/components/ui/progress.tsx
```tsx
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

```

### src/components/ui/button.tsx
```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "border-2 border-ink bg-primary text-primary-foreground font-bold rounded-full shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all",
        chunky: "border-2 border-ink bg-highlight text-ink font-bold rounded-full shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all",
        ink: "border-2 border-ink bg-ink text-ink-foreground font-bold rounded-full shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-full px-4",
        lg: "h-12 rounded-full px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

```

### src/pages/NotFound.tsx
```tsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

```

### src/components/ui/switch.tsx
```tsx
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

```

### src/components/flowfest/Hero.tsx
```tsx
import { ENV, SITE_CONTENT, IMAGES } from "@/config/constants";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden border-b-2 border-ink">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt={`${ENV.SITE_NAME} festival crowd at sunset`}
          className="h-full w-full object-cover"
          width={1536}
          height={1024}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/30 to-background" />
      </div>

      {/* Floating sticker */}
      <div className="absolute right-6 top-24 z-10 hidden md:block">
        <div className="animate-float rounded-full border-2 border-ink bg-highlight px-5 py-2 font-hand text-2xl text-ink shadow-brutal -rotate-6">
          HEROES OF HUMANITY PRESENTS
        </div>
      </div>

      <div className="container relative z-10 flex min-h-[88vh] flex-col items-start justify-end pb-20 pt-32 md:pb-28">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-background px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-ink shadow-brutal">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          {SITE_CONTENT.eventDates} · {SITE_CONTENT.eventLocation}
        </span>

        <h1 className="max-w-5xl font-display text-6xl font-extrabold leading-[0.95] text-background sm:text-8xl md:text-9xl lg:text-[10rem]">
          {ENV.SITE_NAME.toUpperCase()}!{" "}
          <span className="text-highlight">{SITE_CONTENT.year}</span>
        </h1>

        <p className="mt-8 max-w-xl text-lg text-background/90 md:text-xl">
          {SITE_CONTENT.heroSubtitle}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button variant="hero" size="xl" asChild>
            <a href={ENV.TICKET_URL} target="_blank" rel="noreferrer">
              {SITE_CONTENT.ticketButtonText}
            </a>
          </Button>
          <Button variant="chunky" size="xl" asChild>
            <a href="#about">Learn More</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

```

### src/components/flowfest/Speakers.tsx
```tsx
import { ENV, SPEAKERS } from "@/config/constants";
import { Button } from "@/components/ui/button";

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
            <a href={ENV.TICKET_URL} target="_blank" rel="noreferrer">
              Buy Tickets
            </a>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SPEAKERS.map((sp) => (
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

```

### src/components/flowfest/FinalCTA.tsx
```tsx
import { ENV, SITE_CONTENT } from "@/config/constants";
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
          <a href={ENV.TICKET_URL} target="_blank" rel="noreferrer">
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
          {ENV.SITE_NAME.substring(0, 6)}<span className="text-primary">{ENV.SITE_NAME.substring(6)}</span>
          <span className="ml-1 font-hand text-base text-accent">'{SITE_CONTENT.year.substring(2)}</span>
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

```

### src/components/flowfest/FAQ.tsx
```tsx
import { FAQS } from "@/config/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  return (
    <section id="faq" className="border-b-2 border-ink bg-background py-24 md:py-32">
      <div className="container max-w-4xl">
        <span className="mb-3 inline-block font-hand text-3xl text-primary -rotate-2">Need to know</span>
        <h2 className="mb-10 font-display text-5xl font-extrabold leading-tight md:text-6xl">
          Frequently Asked <span className="italic text-accent">Questions</span>
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-2xl border-2 border-ink bg-card px-6 shadow-brutal"
            >
              <AccordionTrigger className="py-5 text-left font-display text-xl font-bold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

```

### src/components/flowfest/SponsorMarquee.tsx
```tsx
import { SPONSORS } from "@/config/constants";

export const SponsorMarquee = () => {
  const items = [...SPONSORS, ...SPONSORS];
  return (
    <section className="border-b-2 border-ink bg-ink py-6 text-ink-foreground">
      <div className="flex items-center gap-12 overflow-hidden">
        <span className="shrink-0 pl-6 font-hand text-2xl text-highlight">Sponsored by</span>
        <div className="flex animate-marquee items-center gap-12 whitespace-nowrap">
          {items.map((s, i) => (
            <span key={i} className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              {s}
              <span className="ml-12 text-primary">★</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

```

### src/components/flowfest/Navbar.tsx
```tsx
import { ENV, NAV_LINKS, SITE_CONTENT } from "@/config/constants";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-background/85 backdrop-blur">
      <nav className="container flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-2xl font-extrabold tracking-tight">
          {ENV.SITE_NAME.substring(0, 6)}<span className="text-primary">{ENV.SITE_NAME.substring(6)}</span>
          <span className="ml-1 font-hand text-base text-accent">'{SITE_CONTENT.year.substring(2)}</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
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
          <a href={ENV.TICKET_URL} target="_blank" rel="noreferrer">
            Buy Tickets
          </a>
        </Button>
      </nav>
    </header>
  );
};

```

### tailwind.config.ts
```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Inter', 'system-ui', 'sans-serif'],
        hand: ['"Caveat"', 'cursive'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        ink: {
          DEFAULT: "hsl(var(--ink))",
          foreground: "hsl(var(--ink-foreground))",
        },
        highlight: {
          DEFAULT: "hsl(var(--highlight))",
          foreground: "hsl(var(--highlight-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

```

