import { TWEETS } from "@/config/constants";
import { useScrollStack } from "@/hooks/useScrollStack";
import { Twitter } from "lucide-react";

export const Love = () => {
  const itemCount = TWEETS.length;
  const { smoothIndex, containerRef } = useScrollStack(itemCount);

  return (
    <section 
      ref={containerRef as any}
      className="relative h-[500vh] border-b-2 border-ink"
      style={{ backgroundColor: "#EDE8DC" }}
      id="love"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* Heading */}
        <div className="mb-20 text-center px-4">
          <h2 className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold">
            <span>#FiestaLiva</span>
            <span 
              className="rounded-full px-4 py-1 sm:px-8 sm:py-2 text-white shadow-brutal"
              style={{ backgroundColor: "#E8A020" }}
            >
              Love
            </span>
          </h2>
        </div>

        {/* Card Stack Container */}
        <div className="relative h-[280px] w-full max-w-[480px] px-4">
          {TWEETS.map((t, i) => {
            // progress = 0 (active), < 0 (future), > 0 (past)
            // But here we want to stack them, so let's use:
            const distance = i - smoothIndex;
            
            let scale = 1;
            let yOffset = 0;
            let opacity = 1;
            let zIndex = itemCount - i;

            if (distance > 0) {
              // Future cards in the stack
              // They scale down and move down slightly
              scale = 1 - Math.min(0.18, distance * 0.05);
              yOffset = Math.min(100, distance * 40);
              // Ensure we don't scale too small
              scale = Math.max(0.82, scale);
            } else {
              // Past cards or active card
              // Active card (distance close to 0) has scale 1, yOffset 0
              // Past cards move up and fade
              scale = 1 + distance * 0.05; // Slightly scale up as it leaves? 
              // User said: "current card scales down slightly and moves up"
              // Let's adjust:
              scale = 1 + distance * 0.05; 
              yOffset = distance * 400; // Move up fast
              opacity = 1 + distance * 2; // Fade out fast
            }

            return (
              <article
                key={i}
                className="absolute inset-0 flex flex-col justify-between rounded-[20px] border-[1.5px] border-[#222] bg-white p-8 shadow-[4px_4px_0_#222] transition-colors"
                style={{
                  transform: `translate3d(0, ${yOffset}px, 0) scale(${scale})`,
                  opacity: Math.max(0, opacity),
                  zIndex: zIndex,
                  width: "calc(100% - 2rem)",
                  left: "1rem",
                }}
              >
                {/* Twitter Icon */}
                <div className="absolute right-6 top-6">
                  <Twitter className="h-6 w-6 text-[#1DA1F2] fill-current" />
                </div>

                {/* Content */}
                <div>
                  <div className="mb-4 flex items-center gap-4">
                    <div 
                      className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-[#222] font-display text-xl font-bold text-white shadow-[2px_2px_0_#222]"
                      style={{ backgroundColor: t.color }}
                    >
                      {t.initial}
                    </div>
                    <div>
                      <div className="font-display font-bold text-[#222]">{t.name}</div>
                      <div className="text-sm text-[#666]">{t.handle}</div>
                    </div>
                  </div>
                  <p className="text-lg font-medium leading-normal text-[#222]">
                    "{t.body}"
                  </p>
                </div>

                {/* Timestamp */}
                <div className="mt-4 text-xs font-semibold text-[#999] uppercase tracking-wider">
                  {t.timestamp}
                </div>
              </article>
            );
          })}
        </div>

        {/* Progress Indicators */}
        <div className="mt-32 flex gap-3">
          {TWEETS.map((_, i) => {
            const isActive = Math.round(smoothIndex) === i;
            return (
              <div
                key={i}
                className="h-3 w-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: isActive ? "#E8A020" : "#D1D5DB",
                  transform: isActive ? "scale(1.2)" : "scale(1)",
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
