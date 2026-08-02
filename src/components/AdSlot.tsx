import { useEffect, useRef } from "react";

// Reusable, fixed-size ad unit. Deliberately uses a FIXED pixel size (not
// AdSense's "auto" responsive format) and is wrapped in a height-capped,
// overflow-hidden container — so however tall the filled ad creative ends
// up, it can never push the page taller or extend the document's
// scrollbar. It just sits in its box.
//
// The AdSense loader script (adsbygoogle.js) is already included site-wide
// in src/routes/__root.tsx, using this same client ID. To go fully live:
//   1. Create a separate "Display ad" unit in the AdSense dashboard for
//      EACH distinct placement you use (don't reuse one slot ID for
//      several ad units visible on the same page at once — that's against
//      AdSense policy). Match each unit's size to the width/height below.
//   2. Pass that slot ID in via the `slot` prop.
const AD_CLIENT = "ca-pub-5691989206254780";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdUnit({
  slot,
  width,
  height,
  className = "",
}: {
  /** AdSense ad unit ID for this specific placement. Must be unique per placement. */
  slot: string;
  width: number;
  height: number;
  className?: string;
}) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense script blocked (ad blocker) or not yet loaded — fail silently,
      // the placeholder label stays visible in place of an ad.
    }
  }, []);

  return (
    <div
      className={`relative mx-auto flex items-center justify-center overflow-hidden ${className}`}
      style={{ width: "100%", maxWidth: width, height, maxHeight: height }}
    >
      {/* Fixed width/height — no data-full-width-responsive, so AdSense
          fills exactly this box instead of choosing its own (potentially
          taller) size. */}
      <ins
        className="adsbygoogle"
        style={{ display: "inline-block", width, height }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
      />
      {/* Placeholder label — visible only until a real ad fills the slot */}
      <span className="absolute text-[11px] uppercase tracking-widest text-muted-foreground/60 pointer-events-none">
        Advertisement
      </span>
    </div>
  );
}

/** Card-wrapped ad unit for the /play sidebar (matches the page's existing "glass" panel style). */
export function AdSlot({
  slot = "0000000000",
  width = 300,
  height = 600,
  sticky = true,
}: {
  slot?: string;
  width?: number;
  height?: number;
  sticky?: boolean;
}) {
  return (
    <div
      className={`glass rounded-2xl p-2 overflow-hidden ${sticky ? "lg:sticky lg:top-6" : ""}`}
      style={{ maxHeight: height + 16 }}
    >
      <AdUnit slot={slot} width={width} height={height} />
    </div>
  );
}
