import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Can I have a discount?",
    a: "This is a non-profit event, and our goal is to make FlowFest as affordable as we possibly can whilst delivering a quality day you'll never forget. To keep ticket prices as low as possible for everyone, we're unable to offer discounts and appreciate your support for this community event.",
  },
  {
    q: "How do I get there?",
    a: "FlowFest is hosted in Media City Gardens (search 'Blue Peter Garden' on Google Maps), an outdoor venue directly in front of Media City tram stop — a great way to get there from the city centre. There's also a multi-storey car park just round the corner.",
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
    a: "No official afterparty, but FlowFest folks know the party never stops. We have the venue until 6 or 7pm, and last year we headed to Kargo Food Market for dinner before hitting town for karaoke. Afterparty planners welcome!",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="border-b-2 border-ink bg-background py-24 md:py-32">
      <div className="container max-w-4xl">
        <span className="mb-3 inline-block font-hand text-3xl text-primary -rotate-2">Need to know</span>
        <h2 className="mb-10 font-display text-5xl font-extrabold leading-tight md:text-6xl">
          Frequently Asked <span className="italic text-accent">Questions</span>
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((f, i) => (
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
