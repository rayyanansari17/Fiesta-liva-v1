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
